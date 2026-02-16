#!/usr/bin/env -S uv run --quiet
# /// script
# dependencies = ["pyyaml>=6.0.0", "jsonschema>=4.0.0"]
# ///
"""
Unified validator for Claude Code skills and commands.

Usage:
    uv run scripts/validate.py [--verbose]
"""

import re
import sys
from pathlib import Path
from typing import Any

import yaml
from jsonschema import Draft7Validator

from markdown_checks import (
	extract_backtick_references,
	extract_markdown_links,
	find_orphan_resource_files,
	find_sources_section_issues,
)


# JSON Schema for SKILL.md frontmatter (based on Agent Skills spec)
SKILL_FRONTMATTER_SCHEMA = {
    "type": "object",
    "required": ["name", "description"],
    "additionalProperties": False,
    "properties": {
        "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 64,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            "description": "Kebab-case name matching parent directory",
        },
        "description": {
            "type": "string",
            "minLength": 1,
            "maxLength": 1024,
            "pattern": "^[^\\n\\r]+$",
            "description": "What the skill does and when to use it (single line, no newlines)",
        },
        "license": {
            "type": "string",
            "description": "License name or reference to bundled license file",
        },
        "compatibility": {
            "type": "string",
            "maxLength": 500,
            "description": "Environment requirements (product, packages, network)",
        },
        "metadata": {
            "type": "object",
            "additionalProperties": {"type": "string"},
            "description": "Arbitrary key-value metadata",
        },
        "allowed-tools": {
            "type": "string",
            "description": "Space-delimited list of pre-approved tools",
        },
        "category": {
            "type": "string",
            "minLength": 1,
            "maxLength": 64,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            "description": "Category for grouping skills (kebab-case)",
        },
    },
}


# ANSI colors
class Colors:
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    BOLD = "\033[1m"
    RESET = "\033[0m"


def color(text: str, c: str) -> str:
    return f"{c}{text}{Colors.RESET}"


# Validation result tracking
class ValidationResult:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.warned = 0
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def pass_(self, msg: str, verbose: bool = False):
        self.passed += 1
        if verbose:
            print(f"  {color('PASS', Colors.GREEN)} {msg}")

    def fail(self, msg: str):
        self.failed += 1
        self.errors.append(msg)
        print(f"  {color('FAIL', Colors.RED)} {msg}")

    def warn(self, msg: str):
        self.warned += 1
        self.warnings.append(msg)
        print(f"  {color('WARN', Colors.YELLOW)} {msg}")


def extract_frontmatter(content: str) -> tuple[dict[str, Any] | None, str | None]:
    """Extract YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return None, "File does not start with YAML frontmatter (---)"

    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, "Invalid frontmatter: missing closing ---"

    try:
        data = yaml.safe_load(parts[1])
        if not isinstance(data, dict):
            return None, "Frontmatter is not a valid YAML mapping"
        return data, None
    except yaml.YAMLError as e:
        return None, f"YAML parse error: {e}"


def check_description_block_scalar(yaml_text: str) -> bool:
    """Check if description uses YAML block scalar syntax (multi-line in source).

    Returns True if block scalar is detected (which is an error).
    """
    lines = yaml_text.split('\n')
    for line in lines:
        stripped = line.strip()
        # Check if 'description:' is on its own line (nothing after colon except whitespace)
        if stripped == 'description:':
            return True  # Block scalar detected
        if re.match(r'^description:\s*$', stripped):
            return True  # Block scalar detected
        if stripped.startswith('description:'):
            # Has something after colon
            after_colon = stripped[len('description:'):].strip()
            # Check for block scalar indicators
            if after_colon in ('|', '>', '|+', '>+', '|-', '>-'):
                return True  # Block scalar indicator

    return False


def validate_skill_schema(frontmatter: dict, path: Path, result: ValidationResult, verbose: bool):
    """Validate skill frontmatter against JSON schema."""
    validator = Draft7Validator(SKILL_FRONTMATTER_SCHEMA)
    errors = list(validator.iter_errors(frontmatter))

    if errors:
        for error in errors:
            # Make error messages more readable
            if error.validator == "additionalProperties":
                extra_keys = set(frontmatter.keys()) - set(
                    SKILL_FRONTMATTER_SCHEMA["properties"].keys()
                )
                for key in extra_keys:
                    result.fail(f"Extraneous field not in spec: '{key}'")
            elif error.validator == "pattern" and error.path:
                field = list(error.path)[0]
                if field == "name":
                    result.fail(
                        f"Field 'name' has invalid format: {frontmatter.get(field)!r} "
                        f"(must be kebab-case, no consecutive hyphens, no leading/trailing hyphens)"
                    )
                elif field == "description":
                    result.fail(
                        f"Field 'description' contains newlines (must be single line)"
                    )
                else:
                    result.fail(f"Field '{field}' has invalid format")
            elif error.validator == "required":
                result.fail(f"Missing required field: {error.message}")
            elif error.validator == "maxLength":
                field = list(error.path)[0] if error.path else "field"
                result.fail(f"Field '{field}' exceeds max length: {error.message}")
            else:
                result.fail(f"Schema error: {error.message}")
    else:
        result.pass_("Frontmatter validates against schema", verbose)

    # Additional check: name must match parent directory
    if "name" in frontmatter:
        expected_name = path.parent.name
        actual_name = frontmatter["name"]
        if actual_name != expected_name:
            result.fail(f"Name '{actual_name}' does not match directory name '{expected_name}'")


def validate_links(path: Path, content: str, result: ValidationResult, verbose: bool):
    """Validate markdown links and file references in content."""
    base_dir = path.parent

    # Check markdown links
    links = extract_markdown_links(content)
    for text, url in links:
        # Skip external URLs
        if url.startswith(('http://', 'https://', 'mailto:', '#')):
            continue

        # Skip anchor-only links
        if url.startswith('#'):
            continue

        # Handle links with anchors (e.g., file.md#section)
        url_path = url.split('#')[0]
        if not url_path:
            continue

        # Resolve relative path
        target = (base_dir / url_path).resolve()

        if not target.exists():
            result.fail(f"Broken link: [{text}]({url}) -> {url_path} not found")
        else:
            result.pass_(f"Link OK: {url_path}", verbose)

    # Check backtick references (like `references/something.md`)
    refs = extract_backtick_references(content)
    for ref in refs:
        # Skip if it looks like code (contains common code patterns)
        if any(x in ref for x in ['node_modules', 'dist/', '.git', '...']):
            continue

        target = (base_dir / ref).resolve()

        if not target.exists():
            result.fail(f"Broken reference: `{ref}` not found")
        else:
            result.pass_(f"Reference OK: {ref}", verbose)


def validate_sources_section(content: str, result: ValidationResult, verbose: bool):
    """Validate that ## Sources sections use markdown link format [Title](url)."""
    errors, warnings = find_sources_section_issues(content)

    for error in errors:
        result.fail(error)
    for warning in warnings:
        result.warn(warning)

    if errors or warnings:
        return

    if "## Sources" in content:
        result.pass_("Sources section uses markdown link format", verbose)


def validate_orphan_files(skill_dir: Path, result: ValidationResult, verbose: bool):
    """Check for files in references/, scripts/, templates/, examples/, assets/ that aren't linked."""
    orphaned = set(find_orphan_resource_files(skill_dir))

    for resource_dir_name in ("references", "scripts", "templates", "examples", "assets"):
        resource_dir = skill_dir / resource_dir_name
        if not resource_dir.exists():
            continue
        for file_path in resource_dir.iterdir():
            if not file_path.is_file():
                continue
            if file_path.name in {"package.json", "bun.lock", ".gitkeep"}:
                continue

            relative_path = f"{resource_dir_name}/{file_path.name}"
            if relative_path in orphaned:
                result.fail(f"Orphan file not referenced anywhere: {relative_path}")
            else:
                result.pass_(f"File is referenced: {relative_path}", verbose)


def validate_skill(path: Path, result: ValidationResult, verbose: bool):
    """Validate a SKILL.md file against Agent Skills spec."""
    print(f"\n{color('Validating skill:', Colors.BLUE)} {path}")

    content = path.read_text()
    frontmatter, error = extract_frontmatter(content)

    if error:
        result.fail(error)
        return

    # Get raw YAML text for block scalar check
    parts = content.split("---", 2)
    yaml_text = parts[1] if len(parts) >= 2 else ""

    # Check for block scalar syntax in description (must be single line in source)
    if check_description_block_scalar(yaml_text):
        result.fail("description uses YAML block scalar syntax (must be single line in source)")

    # Validate against JSON schema (catches extraneous fields, validates format)
    validate_skill_schema(frontmatter, path, result, verbose)

    # Additional checks not in schema
    if "name" in frontmatter:
        result.pass_(f"name: {frontmatter['name']}", verbose)

    if "description" in frontmatter:
        result.pass_("description: valid", verbose)

    # Word count check (Agent Skills recommends < 500 lines, ~1500 words is reasonable)
    word_count = len(content.split())
    if word_count > 1500:
        result.fail(f"Word count ({word_count}) exceeds 1500 words")
    else:
        result.pass_(f"Word count: {word_count}", verbose)

    # Validate links
    validate_links(path, content, result, verbose)

    # Validate sources sections use markdown link format
    validate_sources_section(content, result, verbose)

    # Check for orphan files (files in references/, scripts/, etc. not linked anywhere)
    validate_orphan_files(path.parent, result, verbose)


def validate_command(path: Path, result: ValidationResult, verbose: bool):
    """Validate a command markdown file."""
    print(f"\n{color('Validating command:', Colors.BLUE)} {path}")

    content = path.read_text()
    frontmatter, error = extract_frontmatter(content)

    if error:
        result.fail(error)
        return

    # Get raw YAML text for block scalar check
    parts = content.split("---", 2)
    yaml_text = parts[1] if len(parts) >= 2 else ""

    # Check for block scalar syntax in description
    if check_description_block_scalar(yaml_text):
        result.fail("description uses YAML block scalar syntax (must be single line in source)")

    # Required fields
    if "name" not in frontmatter:
        result.fail("Missing required field: name")
    else:
        result.pass_(f"name: {frontmatter['name']}", verbose)

    if "description" not in frontmatter:
        result.fail("Missing required field: description")
    else:
        result.pass_("description: valid", verbose)

    # Validate links
    validate_links(path, content, result, verbose)


def find_files(root: Path, pattern: str) -> list[Path]:
    """Find files matching a glob pattern."""
    return list(root.glob(pattern))


def main():
    verbose = "--verbose" in sys.argv or "-v" in sys.argv
    root = Path.cwd()

    print(color("=" * 60, Colors.BOLD))
    print(color("Skill Validation", Colors.BOLD))
    print(color("=" * 60, Colors.BOLD))

    result = ValidationResult()

    # Find and validate skills
    skill_files = find_files(root, "skills/**/SKILL.md")
    for skill_file in skill_files:
        validate_skill(skill_file, result, verbose)

    # Find and validate commands
    command_files = find_files(root, "commands/*.md")
    for cmd_file in command_files:
        validate_command(cmd_file, result, verbose)

    # Summary
    print(color("\n" + "=" * 60, Colors.BOLD))
    print(color("Summary", Colors.BOLD))
    print(color("=" * 60, Colors.BOLD))

    total_files = len(skill_files) + len(command_files)
    print(f"\nFiles checked: {total_files}")
    print(f"  Skills:   {len(skill_files)}")
    print(f"  Commands: {len(command_files)}")

    print(f"\nResults:")
    print(f"  {color(f'Passed: {result.passed}', Colors.GREEN)}")
    print(f"  {color(f'Warnings: {result.warned}', Colors.YELLOW)}")
    print(f"  {color(f'Failed: {result.failed}', Colors.RED)}")

    if result.failed > 0:
        print(color("\nValidation FAILED", Colors.RED))
        sys.exit(1)
    elif result.warned > 0:
        print(color("\nValidation passed with warnings", Colors.YELLOW))
    else:
        print(color("\nValidation PASSED", Colors.GREEN))


if __name__ == "__main__":
    main()
