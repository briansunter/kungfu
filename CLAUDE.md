# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Repository Overview

Kungfu is a modular plugin/skill marketplace for Claude Code containing reusable
skills, commands, agents, and plugins. Each component is self-contained with
YAML frontmatter and validated through automated CI.

## Common Commands

### Development

```bash
# Install dependencies
bun install

# Run all checks (lint + typecheck + validate)
just check

# Run lint (Biome + validation)
just lint

# Format code (Biome + Prettier)
just fmt

# Type check TypeScript
just typecheck
```

### Validation

```bash
# Run plugin/skill validation
just validate

# Run validation with verbose output
just validate-verbose

# Lint code with Biome only
just biome
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
├── skills/           # Standalone skill definitions
├── commands/         # Standalone command definitions
├── agents/           # Agent definitions (.md files)
├── plugins/          # Plugin modules (self-contained)
├── scripts/          # Build/validation scripts
├── .claude-plugin/   # Root plugin marketplace config
└── justfile          # Task automation
```

### Component Types

#### Skills (`skills/*`)

- **File**: `SKILL.md` in a kebab-case directory
- **Required frontmatter**: `name`, `description` (single line, no newlines)
- **Optional**: `license`, `compatibility`, `metadata`, `allowed-tools`
- **Subdirectories**: `references/`, `scripts/`, `examples/`, `templates/`,
  `assets/`
- **Name validation**: Must match parent directory exactly (kebab-case)

#### Commands (`commands/*`)

- **File**: `<name>.md` (filename is the command name)
- **Same frontmatter structure as skills**
- **YAML source format**: Use `|` or `>-` for multi-line command content

#### Agents (`agents/*`)

- **File**: `<name>.md` (filename is the agent name)
- **Required frontmatter**: `name`, `description`, `permissionMode`, `skills`
- **Permission modes**: `bypassPermissions`, `normal`, `restricted`

#### Plugins (`plugins/*`)

- **Structure**: Self-contained with `.claude-plugin/plugin.json` manifest
- **Subdirectories**: `skills/`, `commands/`, `agents/`
- **Composition**: Can symlink to root-level components (as seen in
  `plugins/business`)

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

### Technology Stack

- **TypeScript**: Strict mode with `noUncheckedIndexedAccess`
- **Bun**: Runtime and package manager (default over Node.js)
- **Biome**: Linting and formatting (tabs, 100 char line width)
- **Prettier**: Markdown formatting with `prose-wrap: always`
- **Python + uv**: For validation scripts
- **Just**: Task runner (see `justfile`)

### CI/CD Pipeline

GitHub Actions (`.github/workflows/validate.yml`) runs on push/PR to
master/main:

1. Type check: `bun tsc --noEmit`
2. Lint: `bunx biome check`
3. Validate: `uv run scripts/validate.py`

## Key Conventions

### File Naming

- Skills: `skills/kebab-name/SKILL.md`
- Commands: `commands/kebab-name.md`
- Agents: `agents/kebab-name.md`
- Plugins: `plugins/plugin-name/.claude-plugin/plugin.json`

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
- Max 1024 characters
- Describes what the component does and when to use it

### Sources Section Format

```markdown
## Sources

- [Source Title](https://example.com)
- [Another Source](https://example.org/page)
```

### Symlinks in Plugins

The `plugins/business` directory uses symlinks to reference root-level
skills/commands/agents. This allows plugin composition without duplication.

## Adding New Components

1. **Create skill**: `mkdir skills/new-skill && touch skills/new-skill/SKILL.md`
2. **Add frontmatter** with required `name` and `description`
3. **Add subdirectories** as needed (`references/`, `scripts/`, etc.)
4. **Run validation**: `just validate`
5. **Format**: `just fmt`
6. **Test**: `just check`

## TypeScript Configuration

- **Strict mode enabled** with `noUncheckedIndexedAccess`
- **Target**: ESNext
- **Module resolution**: Bundler mode
- **JSX**: react-jsx
- **Imports**: `.ts` and `.tsx` extensions allowed
