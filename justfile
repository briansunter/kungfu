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
