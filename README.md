# 🥋 Kungfu

<img src="assets/i-know-kung-fu.jpg" alt="I know kung fu" width="300">

A modular skill marketplace for AI coding agents — extend your assistant with
reusable skills and agents.

## What Is This?

Kungfu is a curated collection of **skills** (structured prompts with
references, templates, and examples) that any AI coding agent can use to tackle
complex business and SaaS tasks.

Skills work with any agent that supports the
[Agent Skills format](https://docs.anthropic.com/en/docs/claude-code) — Claude
Code, Cursor, Windsurf, or any compatible tool.

Think of it as a toolkit that teaches your agent domain expertise — from
validating a SaaS idea to designing pricing, writing launch announcements, and
analyzing metrics.

## Install a Skill

```bash
npx skills add kungfu/<skill-name>
```

For example:

```bash
npx skills add kungfu/business-idea-finder
npx skills add kungfu/pricing-strategy-designer
```

### Runtime Requirements

Most skills are pure markdown and work out of the box. Some skills include
helper scripts that require additional tools:

| Tool | Required by | Install |
|------|------------|---------|
| [Node.js](https://nodejs.org/) ≥ 18 | All script-based skills | `brew install node` |
| [Bun](https://bun.sh/) | TypeScript helper scripts | `brew install oven-sh/bun/bun` |
| `whois` | domain-name-finder | pre-installed on macOS |
| `dig` | domain-name-finder | pre-installed on macOS |

## Available Skills

<!-- SKILLS-TABLE-START -->
| Skill | Description |
|-------|-------------|
| [business-idea-finder](skills/business-idea-finder/SKILL.md) | Find, validate, and document business ideas through problem signal mining, competitor analysis, SWOT analysis, and Business Model Canvas generation. Use when searching for business opportunities or creating complete business briefs. |
| [community-growth-specialist](skills/community-growth-specialist/SKILL.md) | Build and engage communities for sustainable customer acquisition. Use when growing audience without paid ads, launching on community platforms, or implementing build-in-public strategies. |
| [customer-retention-optimizer](skills/customer-retention-optimizer/SKILL.md) | Reduce customer churn through onboarding optimization, customer success strategies, and reactivation campaigns. Use when improving retention, extending LTV, or fixing leaky buckets. |
| [domain-name-finder](skills/domain-name-finder/SKILL.md) | Find, validate, and register domain names through requirements gathering, brainstorming, trademark screening, availability checking, and registration guidance. |
| [indie-saas-validation-master](skills/indie-saas-validation-master/SKILL.md) | Guide the complete 18-month solo SaaS journey from validation to scaling decision point with phase-specific tactics, success metrics, and risk mitigation. Use when starting a new SaaS venture or planning any phase of the indie SaaS journey. |
| [launch-guide](skills/launch-guide/SKILL.md) | Guide the complete product launch process across Product Hunt, social media, blogs, and other platforms. Use when preparing a launch, filling out Product Hunt submission forms, planning screenshots and visual assets, writing taglines, or coordinating multi-platform launch day execution. |
| [lead-research-assistant](skills/lead-research-assistant/SKILL.md) | Identifies high-quality leads for your product or service. Use when analyzing target companies, building prospect lists, or planning sales outreach strategies. |
| [pricing-strategy-designer](skills/pricing-strategy-designer/SKILL.md) | Design strategic pricing models for SaaS products with tiered structures, psychological pricing tactics, and A/B testing frameworks. Use when launching new pricing pages, optimizing ARPU, or reducing churn. |
| [product-launch-announcement-writer](skills/product-launch-announcement-writer/SKILL.md) | Write compelling product launch announcements by gathering product information through guided questions and analyzing repos/homepages. Use when launching products on GitHub, Product Hunt, Indie Hackers, or social platforms. |
| [saas-legal-generator](skills/saas-legal-generator/SKILL.md) | Generate legal boilerplate documents for SaaS applications including Privacy Policy, Terms of Service, Cookie Policy, and GDPR/CCPA compliance. Use when launching new SaaS products or updating legal documents. |
| [saas-metrics-analyzer](skills/saas-metrics-analyzer/SKILL.md) | Analyze SaaS business health across all critical metrics (MRR, ARR, churn, LTV:CAC, NRR, ARPU, growth rate) with benchmarks and actionable recommendations. Use for monthly business reviews, health checks, or diagnosing growth problems. |
| [solo-operations-manager](skills/solo-operations-manager/SKILL.md) | Optimize solo founder operations with structured weekly rhythms, time blocking, and burnout prevention strategies. Use when managing competing priorities or reducing context-switching fatigue. |
| [systemization-documentation-expert](skills/systemization-documentation-expert/SKILL.md) | Create Standard Operating Procedures (SOPs) and document business processes for delegation and scaling. Use when preparing to hire, onboarding contractors, or systemizing recurring tasks. |
| [technical-automation-architect](skills/technical-automation-architect/SKILL.md) | Design technical architecture and automation strategies for solo SaaS products. Use when selecting tech stacks, deciding build vs buy, or implementing AI automation to scale operations. |
<!-- SKILLS-TABLE-END -->

## Project Structure

```
kungfu/
├── skills/           # Standalone skill definitions (SKILL.md per directory)
├── agents/           # Agent definitions (.md files)
├── scripts/          # Build, validation & code-gen scripts (Python + TypeScript)
├── justfile          # Task automation (just check, just validate, etc.)
└── README.md         # This file — skills table is auto-generated
```

### How Skills Work

Each skill lives in its own directory under `skills/` and contains:

- **`SKILL.md`** — the main instruction file with YAML frontmatter (`name`,
  `description`) and detailed markdown guidance
- **`references/`** — supporting data, benchmarks, and frameworks
- **`templates/`**, **`examples/`**, **`scripts/`** — optional supporting files

## Adding a New Skill

```bash
mkdir skills/my-new-skill
touch skills/my-new-skill/SKILL.md
```

Add the required frontmatter:

```yaml
---
name: my-new-skill
description: Single-line description of what this skill does and when to use it.
license: MIT
---
```

Then validate, format, and update the README table:

```bash
just validate          # check frontmatter & links
just fmt               # auto-format code & markdown
just readme-table --write  # regenerate the skills table above
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) — JavaScript runtime & package manager
- [Just](https://just.systems/) — task runner (`brew install just`)
- [uv](https://docs.astral.sh/uv/) — Python package runner (`brew install uv`)

### Install & Verify

```bash
bun install
just check   # typecheck + lint + format + validate + docs freshness
```

| Command | What it does |
|---------|-------------|
| `just check` | Run **all** checks (typecheck + lint + format + validate + docs) |
| `just validate` | Validate skill structure and frontmatter |
| `just lint` | Run Biome lint checks |
| `just lint-fix` | Lint with auto-fixes |
| `just fmt` | Format everything (Biome for code, Prettier for markdown) |
| `just typecheck` | Type-check TypeScript |
| `just readme-table --write` | Regenerate the skills table in this README |
| `just install-hooks` | Install pre-commit hook for auto table updates |
| `just clean` | Remove `node_modules`, `.cache`, `dist` |

### CI

GitHub Actions runs on every push/PR to `main`/`master`:

1. TypeScript type check
2. Biome lint
3. Prettier format check
4. README table freshness check
5. Full skill validation

## License

MIT
