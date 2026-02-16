#!/usr/bin/env -S uv run --quiet
"""Reference/link diagnostics for markdown files.

This script is a non-blocking diagnostics companion to `scripts/validate.py`.
It reports:
1. Markdown link inventory (internal vs external)
2. Broken internal markdown links
3. Broken backtick path references
4. Sources section formatting issues
5. Orphan files in skill resource directories

Usage:
    uv run scripts/extract.py [--verbose] [--strict]
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from markdown_checks import (
	extract_markdown_links,
	find_broken_backtick_references,
	find_broken_internal_links,
	find_orphan_resource_files,
	find_sources_section_issues,
)


class Colors:
	RED = "\033[91m"
	GREEN = "\033[92m"
	YELLOW = "\033[93m"
	BLUE = "\033[94m"
	BOLD = "\033[1m"
	RESET = "\033[0m"


def color(text: str, c: str) -> str:
	return f"{c}{text}{Colors.RESET}"


def _glob_files(root: Path, patterns: tuple[str, ...]) -> list[Path]:
	paths: set[Path] = set()
	for pattern in patterns:
		paths.update(path for path in root.glob(pattern) if path.is_file())
	return sorted(paths)


def find_markdown_files(root: Path, include_all: bool) -> list[Path]:
	if include_all:
		return sorted(
			path
			for path in root.rglob("*.md")
			if "node_modules" not in path.parts and ".git" not in path.parts
		)

	# Default scope: marketplace content only (exclude scaffolding/templates/outputs).
	return _glob_files(
		root,
		(
			"skills/*/SKILL.md",
			"skills/*/README.md",
			"skills/*/references/*.md",
			"skills/*/examples/*.md",
			"commands/*.md",
			"agents/*.md",
			"plugins/**/skills/**/SKILL.md",
			"plugins/**/commands/*.md",
			"plugins/**/agents/*.md",
		),
	)


def should_check_backticks(path: Path, root: Path) -> bool:
	rel = path.relative_to(root).as_posix()
	return bool(
		rel.startswith("skills/") and rel.endswith("/SKILL.md")
		or rel.startswith("commands/")
		or rel.startswith("agents/")
		or rel.startswith("plugins/") and ("/commands/" in rel or "/agents/" in rel or rel.endswith("/SKILL.md"))
	)


def find_skill_dirs(root: Path) -> list[Path]:
	return sorted(
		path.parent
		for path in root.glob("skills/*/SKILL.md")
		if path.is_file()
	)


def main() -> int:
	parser = argparse.ArgumentParser(description="Extract markdown diagnostics.")
	parser.add_argument("--verbose", "-v", action="store_true", help="Show detailed findings.")
	parser.add_argument(
		"--all",
		action="store_true",
		help="Scan all markdown files (includes local scaffolding/templates).",
	)
	parser.add_argument(
		"--strict",
		action="store_true",
		help="Exit with code 1 when any finding is detected.",
	)
	args = parser.parse_args()

	root = Path.cwd()
	md_files = find_markdown_files(root, include_all=args.all)
	skill_dirs = find_skill_dirs(root)

	print(color("=" * 60, Colors.BOLD))
	print(color("Reference Extraction", Colors.BOLD))
	print(color("=" * 60, Colors.BOLD))
	print(f"\nFound {len(md_files)} markdown files")
	print(f"Found {len(skill_dirs)} skill directories")

	total_links = 0
	external_links = 0
	internal_links = 0

	broken_markdown_links: list[str] = []
	broken_backtick_refs: list[str] = []
	sources_errors: list[str] = []
	sources_warnings: list[str] = []

	for md_file in md_files:
		rel = md_file.relative_to(root)
		content = md_file.read_text()
		links = extract_markdown_links(content)

		total_links += len(links)
		for _, url in links:
			if url.startswith(("http://", "https://", "mailto:")):
				external_links += 1
			else:
				internal_links += 1

		for error in find_broken_internal_links(md_file, content):
			broken_markdown_links.append(f"{rel}: {error}")
		if should_check_backticks(md_file, root):
			for error in find_broken_backtick_references(md_file, content):
				broken_backtick_refs.append(f"{rel}: {error}")

		src_errors, src_warnings = find_sources_section_issues(content)
		for error in src_errors:
			sources_errors.append(f"{rel}: {error}")
		for warning in src_warnings:
			sources_warnings.append(f"{rel}: {warning}")

	orphan_files: list[str] = []
	for skill_dir in skill_dirs:
		for orphan in find_orphan_resource_files(skill_dir):
			orphan_files.append(f"{skill_dir.relative_to(root)}/{orphan}")

	print(color("\nMarkdown Links:", Colors.BLUE))
	print(f"  Total links: {total_links}")
	print(f"  External links: {external_links}")
	print(f"  Internal links: {internal_links}")

	print(color("\nFindings:", Colors.BLUE))
	print(f"  Broken markdown links: {len(broken_markdown_links)}")
	print(f"  Broken backtick refs: {len(broken_backtick_refs)}")
	print(f"  Sources errors: {len(sources_errors)}")
	print(f"  Sources warnings: {len(sources_warnings)}")
	print(f"  Orphan resource files: {len(orphan_files)}")

	if args.verbose:
		if broken_markdown_links:
			print(color("\nBroken markdown links:", Colors.RED))
			for item in broken_markdown_links:
				print(f"  - {item}")
		if broken_backtick_refs:
			print(color("\nBroken backtick references:", Colors.RED))
			for item in broken_backtick_refs:
				print(f"  - {item}")
		if sources_errors:
			print(color("\nSources errors:", Colors.RED))
			for item in sources_errors:
				print(f"  - {item}")
		if sources_warnings:
			print(color("\nSources warnings:", Colors.YELLOW))
			for item in sources_warnings:
				print(f"  - {item}")
		if orphan_files:
			print(color("\nOrphan files:", Colors.YELLOW))
			for item in orphan_files:
				print(f"  - {item}")

	total_findings = (
		len(broken_markdown_links)
		+ len(broken_backtick_refs)
		+ len(sources_errors)
		+ len(sources_warnings)
		+ len(orphan_files)
	)

	print(color("\n" + "=" * 60, Colors.BOLD))
	if total_findings == 0:
		print(color("No findings detected", Colors.GREEN))
	else:
		print(color(f"Total findings: {total_findings}", Colors.YELLOW))
	print(color("=" * 60, Colors.BOLD))

	if args.strict and total_findings > 0:
		return 1
	return 0


if __name__ == "__main__":
	sys.exit(main())
