#!/usr/bin/env -S uv run --quiet
# /// script
# dependencies = ["pyyaml>=6.0.0", "jsonschema>=4.0.0"]
# ///
"""
Unified validator for Claude Code plugins, skills, commands, and agents.

Usage:
    uv run scripts/validate.py [--verbose]
"""

import json
import re
import sys
from pathlib import Path
from typing import Any

import yaml
from jsonschema import Draft7Validator, ValidationError


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
            "description": "What the skill does and when to use it",
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


def is_kebab_case(s: str) -> bool:
    """Check if string is kebab-case per Agent Skills spec."""
    # Must be 1-64 characters
    if not s or len(s) > 64:
        return False
    # Must not start or end with hyphen
    if s.startswith("-") or s.endswith("-"):
        return False
    # Must not contain consecutive hyphens
    if "--" in s:
        return False
    # Must only contain lowercase alphanumeric and hyphens
    return bool(re.match(r"^[a-z][a-z0-9]*(-[a-z0-9]+)*$", s))


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
                result.fail(
                    f"Field '{field}' has invalid format: {frontmatter.get(field)!r} "
                    f"(must be kebab-case, no consecutive hyphens, no leading/trailing hyphens)"
                )
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


def extract_markdown_links(content: str) -> list[tuple[str, str]]:
    """Extract markdown links from content. Returns list of (text, url) tuples."""
    # Match [text](url) pattern, excluding images ![...](...)
    pattern = r'(?<!!)\[([^\]]*)\]\(([^)]+)\)'
    return re.findall(pattern, content)


def extract_backtick_references(content: str) -> list[str]:
    """Extract backtick references that look like file paths."""
    # Match `path/to/file.md` or `filename.ext` patterns
    pattern = r'`([a-zA-Z0-9_\-./]+\.(?:md|py|ts|js|json|yaml|yml))`'
    return re.findall(pattern, content)


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


def validate_skill(path: Path, result: ValidationResult, verbose: bool):
    """Validate a SKILL.md file against Agent Skills spec."""
    print(f"\n{color('Validating skill:', Colors.BLUE)} {path}")

    content = path.read_text()
    frontmatter, error = extract_frontmatter(content)

    if error:
        result.fail(error)
        return

    # Validate against JSON schema (catches extraneous fields, validates format)
    validate_skill_schema(frontmatter, path, result, verbose)

    # Additional checks not in schema
    if "name" in frontmatter:
        result.pass_(f"name: {frontmatter['name']}", verbose)

    if "description" in frontmatter:
        desc = frontmatter["description"]
        # Check for block scalar (multiline description in YAML)
        if isinstance(desc, str) and "\n" not in desc:
            result.pass_("description is single-line", verbose)
        else:
            result.warn("description should be a single-line string (no block scalar)")

    # Word count check (Agent Skills recommends < 500 lines, ~1500 words is reasonable)
    word_count = len(content.split())
    if word_count > 1500:
        result.warn(f"Word count ({word_count}) exceeds 1500 words")
    else:
        result.pass_(f"Word count: {word_count}", verbose)

    # Validate links
    validate_links(path, content, result, verbose)


def validate_command(path: Path, result: ValidationResult, verbose: bool):
    """Validate a command markdown file."""
    print(f"\n{color('Validating command:', Colors.BLUE)} {path}")

    content = path.read_text()
    frontmatter, error = extract_frontmatter(content)

    if error:
        result.fail(error)
        return

    # Required fields
    if "name" not in frontmatter:
        result.fail("Missing required field: name")
    else:
        result.pass_(f"name: {frontmatter['name']}", verbose)

    if "description" not in frontmatter:
        result.fail("Missing required field: description")
    else:
        desc = frontmatter["description"]
        if isinstance(desc, str) and "\n" not in desc:
            result.pass_("description is single-line", verbose)
        else:
            result.warn("description should be a single-line string")

    # Validate links
    validate_links(path, content, result, verbose)


def validate_agent(path: Path, result: ValidationResult, verbose: bool):
    """Validate an agent markdown file."""
    print(f"\n{color('Validating agent:', Colors.BLUE)} {path}")

    content = path.read_text()
    frontmatter, error = extract_frontmatter(content)

    if error:
        result.fail(error)
        return

    # Required fields
    if "name" not in frontmatter:
        result.fail("Missing required field: name")
    else:
        result.pass_(f"name: {frontmatter['name']}", verbose)

    if "description" not in frontmatter:
        result.fail("Missing required field: description")
    else:
        desc = frontmatter["description"]
        if isinstance(desc, str) and "\n" not in desc:
            result.pass_("description is single-line", verbose)
        else:
            result.warn("description should be a single-line string")

    # Validate model field if present
    valid_models = {"sonnet", "opus", "haiku", "inherit"}
    if "model" in frontmatter:
        model = frontmatter["model"]
        if model not in valid_models:
            result.fail(f"Invalid model '{model}'. Must be one of: {', '.join(valid_models)}")
        else:
            result.pass_(f"model: {model}", verbose)

    # Validate permissionMode if present
    valid_modes = {"default", "bypassPermissions", "plan"}
    if "permissionMode" in frontmatter:
        mode = frontmatter["permissionMode"]
        if mode not in valid_modes:
            result.fail(f"Invalid permissionMode '{mode}'. Must be one of: {', '.join(valid_modes)}")
        else:
            result.pass_(f"permissionMode: {mode}", verbose)

    # Validate links
    validate_links(path, content, result, verbose)


def validate_plugin_json(path: Path, result: ValidationResult, verbose: bool):
    """Validate a plugin.json file."""
    print(f"\n{color('Validating plugin:', Colors.BLUE)} {path}")

    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError as e:
        result.fail(f"Invalid JSON: {e}")
        return

    # Required fields
    if "name" not in data:
        result.fail("Missing required field: name")
    else:
        result.pass_(f"name: {data['name']}", verbose)

    if "version" not in data:
        result.fail("Missing required field: version")
    else:
        result.pass_(f"version: {data['version']}", verbose)


def find_files(root: Path, pattern: str) -> list[Path]:
    """Find files matching a glob pattern."""
    return list(root.glob(pattern))


def main():
    verbose = "--verbose" in sys.argv or "-v" in sys.argv
    root = Path.cwd()

    print(color("=" * 60, Colors.BOLD))
    print(color("Plugin/Skill Validation", Colors.BOLD))
    print(color("=" * 60, Colors.BOLD))

    result = ValidationResult()

    # Find and validate skills (both root and plugins)
    skill_files = find_files(root, "skills/**/SKILL.md") + find_files(
        root, "plugins/**/skills/**/SKILL.md"
    )
    for skill_file in skill_files:
        validate_skill(skill_file, result, verbose)

    # Find and validate commands (both root and plugins)
    command_files = find_files(root, "commands/*.md") + find_files(
        root, "plugins/**/commands/*.md"
    )
    for cmd_file in command_files:
        validate_command(cmd_file, result, verbose)

    # Find and validate agents (both root and plugins)
    agent_files = find_files(root, "agents/*.md") + find_files(root, "plugins/**/agents/*.md")
    for agent_file in agent_files:
        validate_agent(agent_file, result, verbose)

    # Find and validate plugin.json files
    plugin_files = find_files(root, "plugins/**/.claude-plugin/plugin.json")
    for plugin_file in plugin_files:
        validate_plugin_json(plugin_file, result, verbose)

    # Summary
    print(color("\n" + "=" * 60, Colors.BOLD))
    print(color("Summary", Colors.BOLD))
    print(color("=" * 60, Colors.BOLD))

    total_files = len(skill_files) + len(command_files) + len(agent_files) + len(plugin_files)
    print(f"\nFiles checked: {total_files}")
    print(f"  Skills:   {len(skill_files)}")
    print(f"  Commands: {len(command_files)}")
    print(f"  Agents:   {len(agent_files)}")
    print(f"  Plugins:  {len(plugin_files)}")

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
