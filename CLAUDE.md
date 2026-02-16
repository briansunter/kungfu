# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Repository Overview

Kungfu is a modular skill marketplace for Claude Code containing reusable skills
and commands. Each component is self-contained with YAML frontmatter and
validated through automated CI.

## Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Just](https://just.systems/) - Task runner (`brew install just`)
- [uv](https://docs.astral.sh/uv/) - Python package runner (`brew install uv`)

## Common Commands

### Development

```bash
# Install dependencies
bun install

# Run all checks (typecheck + lint + formatting + validate + docs freshness)
just check

# Run lint checks (Biome only)
just lint

# Run lint with autofixes
just lint-fix

# Type check TypeScript
just typecheck
```

### Validation

```bash
# Run skill validation
just validate

# Run validation with verbose output
just validate-verbose

# Lint code with Biome only
just biome

# Lint code with Biome autofixes only
just biome-fix
```

### Formatting

```bash
# Format all files (Biome for code, Prettier for markdown)
just fmt

# Format markdown files only
just fmt-md

# Check formatting without writing
just fmt-check
```

### Utilities

```bash
# Generate README skills table (use --write to update README.md)
just readme-table --write

# Check README skills table is up to date
just readme-table-check

# Run reference diagnostics (add --strict to fail on findings)
just extract --verbose

# Install git hooks (pre-commit for README table updates)
just install-hooks

# Clean generated files and caches
just clean
```

### Running TypeScript Scripts

Use Bun runtime for TypeScript files:

```bash
bun run scripts/your-script.ts
```

## Architecture

### Directory Structure

```
kungfu/
├── skills/           # Standalone skill definitions (SKILL.md per directory)
├── commands/         # Standalone command definitions (currently empty)
├── scripts/          # Build/validation scripts (Python + TypeScript)
├── AGENTS.md         # Symlink → CLAUDE.md
├── biome.json        # Biome linter/formatter config
├── tsconfig.json     # TypeScript configuration
├── justfile          # Task automation
└── README.md         # Repository documentation with auto-generated skills table
```

### Component Types

#### Skills (`skills/*`)

- **File**: `SKILL.md` in a kebab-case directory
- **Required frontmatter**: `name`, `description` (single line, no newlines)
- **Optional**: `category`, `license`, `compatibility`, `metadata`,
  `allowed-tools`
- **Subdirectories**: `references/`, `scripts/`, `examples/`, `templates/`,
  `assets/`
- **Name validation**: Must match parent directory exactly (kebab-case)

#### Commands (`commands/*`)

- **File**: `<name>.md` (filename is the command name)
- **Same frontmatter structure as skills**
- **YAML source format**: Use `|` or `>-` for multi-line command content

### Validation Rules

The `scripts/validate.py` enforces:

1. **YAML Schema**: Validates against Agent Skills spec JSON schema
2. **Name Consistency**: Directory/filename must match `name` in frontmatter
3. **Link Validation**: All markdown links must reference existing files
4. **Sources Format**: Must use `[Title](url)` markdown link format
5. **Orphan Detection**: Files in `references/`, `scripts/`, `templates/`,
   `examples/`, `assets/` must be referenced from parent SKILL.md/COMMAND.md
6. **Word Count**: Skills should be under 1500 words
7. **Description Format**: Must be single-line (no `\n` or `\r` characters)
8. **No Block Scalars**: Description must not use YAML `|` or `>` syntax

### Technology Stack

- **TypeScript**: Strict mode with `noUncheckedIndexedAccess`
- **Bun**: Runtime and package manager (default over Node.js)
- **Biome**: Linting and formatting (tabs, double quotes, 100 char line width)
- **Prettier**: Markdown formatting with `prose-wrap: always`
- **Python + uv**: For validation scripts (inline script deps, no
  requirements.txt)
- **Just**: Task runner (see `justfile`)

### CI/CD Pipeline

GitHub Actions (`.github/workflows/validate.yml`) runs on push/PR to
master/main:

1. Type check: `bun tsc --noEmit`
2. Lint: `bunx biome check --diagnostic-level=error .`
3. Formatting: `bunx biome format .` and
   `bunx prettier --check "**/*.md" --prose-wrap always`
4. README table check: `bun scripts/generate-readme-table.ts --check`
5. Validate: `uv run scripts/validate.py`

## Key Conventions

### File Naming

- Skills: `skills/kebab-name/SKILL.md`
- Commands: `commands/kebab-name.md`

### Frontmatter Pattern

```yaml
---
name: skill-name
description: Single line description (no newlines)
license: MIT
compatibility: Requires Bun runtime
---
```

### Description Field Rules

- **Must be single line** - No `\n` or `\r` characters allowed
- **No block scalars** - Cannot use `|`, `>`, `|-`, `>-` syntax in YAML source
- Max 1024 characters
- Describes what the component does and when to use it

### Sources Section Format

```markdown
## Sources

- [Source Title](https://example.com)
- [Another Source](https://example.org/page)
```

## Adding New Components

1. **Create skill**: `mkdir skills/new-skill && touch skills/new-skill/SKILL.md`
2. **Add frontmatter** with required `name` and `description`
3. **Add subdirectories** as needed (`references/`, `scripts/`, etc.)
4. **Run validation**: `just validate`
5. **Format**: `just fmt`
6. **Run all checks**: `just check`
7. **Update README table**: `just readme-table --write`

## Gotchas

- **Orphan detection is strict**: Every file in `references/`, `scripts/`,
  `templates/`, `examples/`, `assets/` must be referenced from SKILL.md via
  markdown link or backtick reference, or validation fails.
- **`package.json`, `bun.lock`, `.gitkeep` are exempt** from orphan checks.
- **Validation runs from repo root**: Paths in `validate.py` are relative to
  `cwd()`, so always run `just validate` from the repo root.
- **Biome uses `--diagnostic-level=error`** in lint: warnings don't fail CI but
  errors do. Use `just biome-fix` locally for auto-fixing.
- **README skills table auto-generation**: The pre-commit hook runs
  `just readme-table --write` to keep the README table in sync. Install with
  `just install-hooks`.
- **`AGENTS.md` is a symlink** to `CLAUDE.md` -- don't edit it directly.

## TypeScript Configuration

- **Strict mode enabled** with `noUncheckedIndexedAccess`
- **Target**: ESNext
- **Module resolution**: Bundler mode
- **JSX**: react-jsx
- **Imports**: `.ts` and `.tsx` extensions allowed
