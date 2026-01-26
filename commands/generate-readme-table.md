---
name: generate-readme-table
description: Generate a markdown table of all skills and descriptions for the README. Run with --write to update README.md directly.
---

# Generate README Skills Table

Generate a markdown table listing all skills in this repository with their
descriptions.

## Usage

Run the generator script:

```bash
bun scripts/generate-readme-table.ts
```

To update the README.md file directly:

```bash
bun scripts/generate-readme-table.ts --write
```

## README Format

The README.md file must contain marker comments for the table to be inserted:

```markdown
<!-- SKILLS-TABLE-START -->
<!-- SKILLS-TABLE-END -->
```

The script will replace everything between these markers with the generated
table.

## Output Format

The generated table has two columns:

| Skill        | Description         |
| ------------ | ------------------- |
| `skill-name` | What the skill does |

Skills are sorted alphabetically by name.
