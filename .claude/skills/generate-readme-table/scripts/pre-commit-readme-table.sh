#!/usr/bin/env bash
# Pre-commit hook to regenerate README skills table
# Install: Add to .git/hooks/pre-commit or use with husky/lefthook

set -e

# Check if README.md exists and has markers
if [[ -f "README.md" ]] && grep -q "SKILLS-TABLE-START" README.md; then
    # Generate updated table
    bun .claude/skills/generate-readme-table/scripts/generate-readme-table.ts --write

    # Check if README.md changed
    if ! git diff --quiet README.md 2>/dev/null; then
        echo "README.md skills table updated, staging changes..."
        git add README.md
    fi
fi
