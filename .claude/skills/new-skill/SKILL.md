---
name: new-skill
description: Scaffold a new Kungfu marketplace or internal maintenance skill with validated trigger metadata, only the necessary resources, correct plugin exposure, documentation, and complete repository checks.
license: MIT
---

# New Skill Scaffolder

Create a usable skill, not an empty directory template. Infer requirements from
the request and repository first; ask only for missing choices that materially
change the skill's scope or exposure.

## Operating Rules

- Inspect [CLAUDE.md](../../../CLAUDE.md), the closest comparable skills,
  repository validators, and plugin structure before writing.
- Never overwrite or rename an existing skill silently. If the requested name
  collides, report the conflict and propose a distinct name or an in-place
  improvement.
- Use lowercase kebab-case and make the frontmatter `name` exactly match the
  directory.
- Write a single-line description that states both what the skill does and when
  it should trigger. Keep it factual and under the schema limit.
- Create only resources that the workflow actually uses. Do not add empty
  directories or `.gitkeep` files by default.
- Every supporting file must be linked from the skill or another linked resource
  and must agree with the main instructions.
- Do not create a plugin symlink for an internal maintenance skill. Do not commit,
  push, publish, or install hooks unless requested.

## Workflow

### 1. Define the Skill Contract

Determine:

- public marketplace skill under `skills/` or internal maintenance skill under
  `.claude/skills/`;
- trigger phrases and adjacent requests that should not trigger it;
- inputs that can be inferred versus genuinely required;
- ordered decisions/workflow;
- concrete output contract;
- current facts that require live verification;
- safety, privacy, legal, security, financial, platform, or irreversible-action
  boundaries;
- references, templates, examples, scripts, or assets that materially improve
  execution.

Write down at least three should-trigger prompts, two should-not-trigger prompts,
and one missing-data or adversarial case before drafting.

### 2. Check for Conflicts

For a marketplace skill:

```bash
test ! -e "skills/<skill-name>"
test ! -e "plugins/business/skills/<skill-name>"
```

For an internal skill:

```bash
test ! -e ".claude/skills/<skill-name>"
```

Also search existing names and descriptions for overlapping responsibilities.
Prefer improving or composing existing skills over creating confusing duplicates.

### 3. Create the Main Skill

Marketplace path:

```bash
mkdir -p "skills/<skill-name>"
```

Internal path:

```bash
mkdir -p ".claude/skills/<skill-name>"
```

Use valid frontmatter:

```yaml
---
name: <skill-name>
description: <single-line trigger-oriented description>
license: MIT
---
```

The body should normally include:

1. purpose and boundaries;
2. operating rules;
3. inputs/defaults;
4. ordered workflow with decision points;
5. failure, uncertainty, and escalation behavior;
6. output contract;
7. linked resources and authoritative sources where relevant.

Keep the main file concise enough to load efficiently. Move optional depth into
linked resources rather than removing critical operational detail.

### 4. Add Only Necessary Resources

Allowed resource directories include `references/`, `scripts/`, `templates/`,
`examples/`, and `assets/`. Create a directory when adding its first real file:

```bash
mkdir -p "skills/<skill-name>/references"
```

For each resource:

- give it one clear purpose;
- link it with a relative Markdown link from a discoverable document;
- ensure scripts validate inputs and preserve explicit error/unknown states;
- make templates retain unresolved facts rather than inventing defaults;
- avoid stale duplicated implementations when a canonical repository tool
  already exists.

### 5. Expose Marketplace Skills

For a business marketplace skill, create the repository's relative symlink only
after confirming the plugin directory exists:

```bash
ln -s "../../../skills/<skill-name>" \
  "plugins/business/skills/<skill-name>"
test -e "plugins/business/skills/<skill-name>/SKILL.md"
```

Verify the exact relative target with `readlink`. Do not replace an existing
file or symlink without explicit review.

### 6. Validate Trigger and Artifact Behavior

Use the internal reviewer checklist in
[`skill-reviewer.md`](../../agents/skill-reviewer.md). Exercise the should-trigger,
should-not-trigger, rich-context, missing-data, and adversarial cases. Run helper
scripts with safe valid and invalid inputs when present.

### 7. Regenerate Documentation and Check Everything

```bash
just readme-table --write
just fmt
just check
```

Internal skills should not appear in the marketplace table, but they must pass
the same schema, links, sources, and orphan-resource checks.

Inspect the final diff for unintended generated changes, broken symlinks,
secrets, placeholder data, or duplicated code.

## Output Contract

Report:

1. created skill path and exposure type;
2. trigger description and evaluation prompts;
3. resources added and why;
4. plugin symlink status when applicable;
5. commands/tests run and results;
6. unresolved assumptions or follow-up research;
7. complete file list changed.
