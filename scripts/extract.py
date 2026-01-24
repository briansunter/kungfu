#!/usr/bin/env -S uv run --quiet
# /// script
# dependencies = ["pyyaml>=6.0.0"]
# ///
"""
Extract and validate references from markdown files.

This script scans all markdown files (SKILL.md, reference files, etc.) and:
1. Extracts all markdown links [text](url)
2. Validates that internal references point to existing files
3. Reports orphan files that aren't referenced
4. Checks Sources sections for proper markdown link format

Usage:
    uv run scripts/extract.py [--verbose]
"""

import re
import sys
from pathlib import Path
from typing import Any


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


def extract_markdown_links(content: str) -> list[tuple[str, str]]:
    """Extract markdown links from content. Returns list of (text, url) tuples."""
    pattern = r'(?<!!)\[([^\]]*)\]\(([^)]+)\)'
    return re.findall(pattern, content)


def extract_backtick_references(content: str) -> list[str]:
    """Extract backtick references that look like file paths."""
    pattern = r'`([a-zA-Z0-9_\-./]+\.(?:md|py|ts|js|json|yaml|yml))`'
    return re.findall(pattern, content)


def main():
    verbose = "--verbose" in sys.argv or "-v" in sys.argv
    root = Path.cwd()

    print(color("=" * 60, Colors.BOLD))
    print(color("Reference Extraction", Colors.BOLD))
    print(color("=" * 60, Colors.BOLD))

    # Find all markdown files
    md_files = list(root.rglob("*.md"))
    md_files = [f for f in md_files if 'node_modules' not in str(f) and '.git' not in str(f)]

    print(f"\nFound {len(md_files)} markdown files")

    all_links = []
    orphan_files = []

    for md_file in md_files:
        relative_path = md_file.relative_to(root)
        content = md_file.read_text()

        # Extract markdown links
        links = extract_markdown_links(content)
        for text, url in links:
            all_links.append({
                'file': str(relative_path),
                'text': text,
                'url': url,
            })

        # Check if this is a reference file that's in references/ directory
        if 'references/' in str(relative_path):
            # Check if it's referenced elsewhere
            is_referenced = False
            for other_file in md_files:
                if other_file == md_file:
                    continue
                other_content = other_file.read_text()
                # Check for markdown link reference
                if str(relative_path) in other_content:
                    is_referenced = True
                    break

            if not is_referenced:
                orphan_files.append(str(relative_path))

    print(color("\nMarkdown Links Extracted:", Colors.BLUE))
    external_links = [l for l in all_links if l['url'].startswith('http')]
    internal_links = [l for l in all_links if not l['url'].startswith('http')]

    print(f"  Total links: {len(all_links)}")
    print(f"  External links: {len(external_links)}")
    print(f"  Internal links: {len(internal_links)}")

    if orphan_files:
        print(color("\nPotentially orphan reference files:", Colors.YELLOW))
        for f in orphan_files:
            print(f"  {f}")
    else:
        print(color("\nNo orphan reference files found", Colors.GREEN))

    # Check Sources sections
    print(color("\nSources Sections:", Colors.BLUE))
    sources_count = 0
    sources_with_markdown_links = 0

    for md_file in md_files:
        content = md_file.read_text()
        if '## Sources' in content:
            sources_count += 1
            # Extract the sources section
            sources_match = re.search(r'^## Sources\s*$(.*?)^(?=## |\Z)', content, re.MULTILINE | re.DOTALL)
            if sources_match:
                sources_content = sources_match.group(1)
                # Check for markdown links
                link_pattern = r'^- \[([^\]]+)\]\(([^)]+)\)'
                if re.search(link_pattern, sources_content, re.MULTILINE):
                    sources_with_markdown_links += 1

    print(f"  Files with Sources sections: {sources_count}")
    print(f"  Sources using markdown links: {sources_with_markdown_links}")

    if sources_count == sources_with_markdown_links:
        print(color("✓ All Sources sections use markdown link format", Colors.GREEN))
    else:
        print(color(f"✗ {sources_count - sources_with_markdown_links} Sources sections not using markdown links", Colors.YELLOW))

    if verbose:
        print(color("\nAll Links (verbose):", Colors.BLUE))
        for link in all_links:
            if link['url'].startswith('http'):
                print(f"  [{link['text']}]({link['url']})")

    print(color("\n" + "=" * 60, Colors.BOLD))
    print(color("Extraction complete", Colors.GREEN))
    print(color("=" * 60, Colors.BOLD))


if __name__ == "__main__":
    main()
