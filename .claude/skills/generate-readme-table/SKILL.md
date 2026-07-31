---
name: generate-readme-table
description: Regenerate or verify the README marketplace-skill catalog from canonical SKILL.md frontmatter after skills are added, removed, renamed, or re-described.
license: MIT
---

# Generate README Skills Table

Keep the generated skill catalog in `README.md` synchronized with the canonical
frontmatter under `skills/*/SKILL.md`. Use the repository-level generator rather
than maintaining a second implementation inside this skill.

## Operating Rules

- Treat each marketplace `SKILL.md` as the source of truth for `name`,
  `description`, and `category`.
- Do not edit generated table rows manually; regenerate the marked block.
- Preserve all README content outside the marker pair.
- Fail rather than guessing when frontmatter is invalid, a marker is missing, or
  duplicate skill names exist.
- Internal maintenance skills under `.claude/skills/` are validated but are not
  included in the public marketplace table.
- Do not commit or push generated changes unless the user requested repository
  writes.

## Workflow

### 1. Validate Source Skills

Run:

```bash
just validate
```

Resolve frontmatter, naming, link, source, or orphan-resource errors before
regenerating the catalog.

### 2. Preview or Check

Preview the generated catalog:

```bash
just readme-table
```

Verify that the checked-in table is current without changing files:

```bash
just readme-table --check
```

The canonical implementation is
[`scripts/generate-readme-table.ts`](../../../scripts/generate-readme-table.ts).

### 3. Update the README

```bash
just readme-table --write
```

The README must contain exactly one ordered marker pair:

```markdown
<!-- SKILLS-TABLE-START -->
<!-- SKILLS-TABLE-END -->
```

Inspect the diff and confirm that only the generated region changed.

### 4. Format and Verify

```bash
just fmt
just check
```

The final check must confirm formatting, TypeScript, skill validation, and README
freshness.

### 5. Keep Hooks Canonical

Use the repository hook
[`scripts/pre-commit-readme-table.sh`](../../../scripts/pre-commit-readme-table.sh)
through:

```bash
just install-hooks
```

Do not install or maintain a second generator or hook implementation inside this
skill.

## Output Contract

Report:

1. number of public marketplace skills discovered;
2. whether the README was already current or updated;
3. files changed;
4. validation/check results;
5. any malformed or duplicate skill metadata that blocked generation.
