---
name: validate-and-fix
description: Diagnose and safely repair Kungfu skill, resource, formatting, typecheck, plugin-exposure, and generated-documentation failures without deleting content or changing behavior blindly.
license: MIT
---

# Validate and Fix

Restore a clean repository by identifying root causes, applying deterministic
repairs, and re-running the full check suite. Validation passing is necessary but
not sufficient: supporting scripts and templates must still implement the skill's
stated behavior.

## Operating Rules

- Inspect the working tree and current branch before changing files. Preserve
  unrelated user edits.
- Run diagnostics before formatting or auto-fixing so the original failures are
  visible.
- Apply mechanical fixes automatically only when intent is unambiguous.
- Never delete an orphan file, rename a skill, replace a symlink, or weaken a
  validator merely to make CI green without determining the intended behavior.
- Treat parser, network, timeout, and missing-data paths as first-class test
  cases; errors must not become favorable conclusions.
- When a validator conflicts with valid formatted Markdown or repository policy,
  fix the validator and add a regression case rather than distorting every skill.
- Do not commit, push, merge, or discard changes unless requested.

## Workflow

### 1. Capture Repository State

```bash
git status --short
git diff --stat
git diff
```

Identify user-owned changes, generated files, symlinks, and the last known good
check. Do not reset the tree.

### 2. Run Focused Diagnostics

```bash
just validate-verbose
just readme-table --check
just typecheck
just lint
just fmt-check
```

Run `just check` after individual failures have been understood. Record each
failure by file, rule, and likely root cause rather than fixing messages one by
one without a model.

### 3. Classify the Failure

#### Frontmatter or Name

- `name` must be lowercase kebab-case and match the parent directory.
- `description` must be one physical YAML line, nonempty, within the schema
  limit, and explain both capability and trigger conditions.
- Remove unsupported keys only after checking the current schema and whether the
  validator itself is stale.

#### Broken Links or File References

Resolve relative to the document containing the link. Preserve anchors and
code-formatted link labels. Confirm the target exists on the current branch and
is not a broken symlink.

#### Orphan Resources

Determine whether the file is:

1. necessary and should be linked;
2. duplicated and should be consolidated into a canonical implementation;
3. obsolete and safe to remove;
4. generated or package metadata that should be explicitly exempt.

Do not add meaningless references solely to silence the check.

#### Sources

A `## Sources` item must be a logical Markdown list item containing
`[Title](https://...)`. Formatters may wrap long links across physical lines; the
validator should parse the logical item. Verify time-sensitive claims against
current authoritative sources.

#### Word or Size Limit

Remove repetition and move optional depth into a linked reference. Do not move
critical operating rules, safety boundaries, failure states, or the output
contract out of the main skill merely to satisfy a count.

#### Formatting

Use repository formatters:

```bash
just fmt
```

Confirm idempotence by running `just fmt-check` afterward. If a construct toggles
on repeated formatting, simplify the Markdown syntax or pin/fix the formatter
configuration; do not add a CI job that silently commits forever.

#### TypeScript, Scripts, or Templates

Bring every bundled TypeScript helper under the root typecheck. Exercise safe
valid, invalid, empty, and failure-path inputs. Check that:

- input validation is explicit;
- timestamps and evidence sources are retained;
- network and parse failures remain `unknown`/`error`;
- destructive or external actions require authorization;
- templates preserve unresolved facts;
- package dependencies and lockfiles match imports;
- scripts, templates, examples, and the main skill agree.

#### README Freshness

Regenerate only through the canonical command:

```bash
just readme-table --write
```

Inspect that only the marker-delimited generated region changed.

#### Plugin Exposure

For marketplace skills, verify the expected relative symlink, target, and
`SKILL.md`. Do not replace a conflicting path automatically.

### 4. Apply the Smallest Coherent Repair

Fix the root cause and all directly inconsistent artifacts in one pass. Add or
adjust regression coverage when a validator or helper bug allowed the failure.
Keep a short decision log for non-obvious changes.

### 5. Re-run the Complete Suite

```bash
just fmt
just check
```

Run the same checks in CI when available. A final pass must include marketplace
and internal skills, TypeScript helpers, formatting, README freshness, and
resource validation.

### 6. Review the Diff

```bash
git status --short
git diff --check
git diff --stat
git diff
```

Look specifically for accidental content loss, changed legal/security claims,
stale generated files, secrets, absolute local paths, broken symlinks, and broad
formatter churn.

## Output Contract

Report:

1. original failures and root causes;
2. files changed and rationale;
3. automatic fixes versus judgment calls;
4. regression protection added;
5. final local/CI check results;
6. remaining warnings or untested external behavior;
7. any change deliberately left for human review.
