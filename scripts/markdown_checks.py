#!/usr/bin/env python3
"""Shared markdown validation helpers used by repository scripts."""

from __future__ import annotations

import re
from pathlib import Path

RESOURCE_DIRS = ("references", "scripts", "templates", "examples", "assets")
ORPHAN_EXEMPT_FILENAMES = {"package.json", "bun.lock", ".gitkeep"}

MARKDOWN_LINK_PATTERN = re.compile(r"(?<!!)\[([^\]]*)\]\(([^)]+)\)")
BACKTICK_REF_PATTERN = re.compile(
	r"`([a-zA-Z0-9_\-./]+\.(?:md|py|ts|js|json|yaml|yml))`",
)
FILE_REF_PATTERN = re.compile(
	r'(?:^|[\s\'"`(])([a-zA-Z0-9_\-]+/[a-zA-Z0-9_\-./]+\.(?:md|py|ts|js|json|yaml|yml))(?:[\s\'"`)]|$)',
)

SOURCES_HEADER_PATTERN = re.compile(r"^## Sources\s*$", re.MULTILINE)
NEXT_H2_PATTERN = re.compile(r"^## ", re.MULTILINE)
SOURCES_ITEM_PATTERN = re.compile(r"^\[([^\]]+)\]\(([^)]+)\)")


def extract_markdown_links(content: str) -> list[tuple[str, str]]:
	"""Extract markdown links as (text, url) tuples, excluding image links."""
	return MARKDOWN_LINK_PATTERN.findall(content)


def extract_backtick_references(content: str) -> list[str]:
	"""Extract backtick references that look like file paths."""
	return BACKTICK_REF_PATTERN.findall(content)


def extract_all_file_references(content: str) -> set[str]:
	"""Extract file references from backticks, code blocks, and prose."""
	refs = set(extract_backtick_references(content))
	refs.update(FILE_REF_PATTERN.findall(content))
	return refs


def get_all_references_from_content(content: str) -> set[str]:
	"""Collect local file references from links and inline path references."""
	refs: set[str] = set()

	for _, url in extract_markdown_links(content):
		if url.startswith(("http://", "https://", "mailto:", "#")):
			continue
		url_path = url.split("#")[0]
		if url_path:
			refs.add(url_path)

	for ref in extract_all_file_references(content):
		if any(skip in ref for skip in ("node_modules", "dist/", ".git", "...")):
			continue
		refs.add(ref)

	return refs


def find_broken_internal_links(path: Path, content: str) -> list[str]:
	"""Return broken markdown link errors for local/relative links."""
	base_dir = path.parent
	errors: list[str] = []

	for text, url in extract_markdown_links(content):
		if url.startswith(("http://", "https://", "mailto:", "#")):
			continue
		url_path = url.split("#")[0]
		if not url_path:
			continue
		target = (base_dir / url_path).resolve()
		if not target.exists():
			errors.append(f"Broken link: [{text}]({url}) -> {url_path} not found")

	return errors


def find_broken_backtick_references(path: Path, content: str) -> list[str]:
	"""Return broken backtick reference errors for file-like references."""
	base_dir = path.parent
	errors: list[str] = []

	for ref in extract_backtick_references(content):
		if any(skip in ref for skip in ("node_modules", "dist/", ".git", "...")):
			continue
		target = (base_dir / ref).resolve()
		if not target.exists():
			errors.append(f"Broken reference: `{ref}` not found")

	return errors


def find_sources_section_issues(content: str) -> tuple[list[str], list[str]]:
	"""Return (errors, warnings) for all `## Sources` sections in markdown."""
	errors: list[str] = []
	warnings: list[str] = []
	matches = list(SOURCES_HEADER_PATTERN.finditer(content))

	for match in matches:
		start = match.end()
		next_heading = NEXT_H2_PATTERN.search(content[start:])
		end = start + next_heading.start() if next_heading else len(content)
		section = content[start:end]

		for line in section.split("\n"):
			stripped = line.strip()
			if not stripped:
				continue
			if not stripped.startswith("- "):
				continue

			item = stripped[2:].strip()
			link = SOURCES_ITEM_PATTERN.match(item)
			if not link:
				errors.append(
					"Sources section must use markdown link format [Title](url), "
					f"found: {stripped[:50]}...",
				)
				continue

			url = link.group(2)
			if not url.startswith(("http://", "https://")) and "." in url and not url.startswith("#"):
				warnings.append(f"Source URL should use http/https: {url}")

	return errors, warnings


def find_orphan_resource_files(skill_dir: Path) -> list[str]:
	"""Return unreferenced files under references/scripts/templates/examples/assets."""
	all_content = ""
	for md_file in skill_dir.rglob("*.md"):
		all_content += md_file.read_text()

	all_refs = get_all_references_from_content(all_content)
	ref_filenames = {Path(ref).name for ref in all_refs} | set(all_refs)

	orphaned: list[str] = []
	for resource_dir_name in RESOURCE_DIRS:
		resource_dir = skill_dir / resource_dir_name
		if not resource_dir.exists():
			continue
		for file_path in resource_dir.iterdir():
			if not file_path.is_file():
				continue
			if file_path.name in ORPHAN_EXEMPT_FILENAMES:
				continue
			relative_path = f"{resource_dir_name}/{file_path.name}"
			is_referenced = (
				file_path.name in ref_filenames
				or relative_path in ref_filenames
				or relative_path in all_refs
			)
			if not is_referenced:
				orphaned.append(relative_path)

	return orphaned

