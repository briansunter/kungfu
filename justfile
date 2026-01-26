# Kungfu - Claude Code plugins and skills

# Default recipe: show available commands
default:
    @just --list

# Run all checks (lint + typecheck + validate)
check: lint typecheck

# Run Biome linter/formatter and plugin validation
lint *args:
    ./scripts/lint.sh {{args}}

# Run Biome only (no validation)
biome *args:
    bunx -y biome check --write --diagnostic-level=error . {{args}}

# Run plugin/skill validation only
validate *args:
    uv run scripts/validate.py {{args}}

# Type check TypeScript files
typecheck:
    ./scripts/typecheck.sh

# Format all files (Biome for code, Prettier for markdown)
fmt:
    bunx -y biome format --write .
    bunx -y prettier --write "**/*.md" --prose-wrap always

# Format markdown files only
fmt-md:
    bunx -y prettier --write "**/*.md" --prose-wrap always

# Check formatting without writing
fmt-check:
    bunx -y biome format .
    bunx -y prettier --check "**/*.md" --prose-wrap always

# Install dependencies
install:
    bun install

# Clean generated files and caches
clean:
    rm -rf node_modules .cache dist

# Show validation in verbose mode
validate-verbose:
    uv run scripts/validate.py --verbose

# Generate README skills table (use --write to update README.md)
readme-table *args:
    bun scripts/generate-readme-table.ts {{args}}

# Install git hooks
install-hooks:
    @echo "Installing pre-commit hook..."
    @if [ -f .git/hooks/pre-commit ]; then \
        if ! grep -q "pre-commit-readme-table" .git/hooks/pre-commit; then \
            echo "" >> .git/hooks/pre-commit; \
            echo "# Update README skills table" >> .git/hooks/pre-commit; \
            echo "./scripts/pre-commit-readme-table.sh" >> .git/hooks/pre-commit; \
            echo "Hook added to existing pre-commit"; \
        else \
            echo "Hook already installed"; \
        fi \
    else \
        echo '#!/usr/bin/env bash' > .git/hooks/pre-commit; \
        echo 'set -e' >> .git/hooks/pre-commit; \
        echo './scripts/pre-commit-readme-table.sh' >> .git/hooks/pre-commit; \
        chmod +x .git/hooks/pre-commit; \
        echo "Created new pre-commit hook"; \
    fi
