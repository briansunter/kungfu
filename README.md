# 🥋 Kungfu

<img src="assets/i-know-kung-fu.jpg" alt="I know kung fu" width="300">

A modular skill marketplace for AI coding agents — extend your assistant with
reusable skills.

## What Is This?

Kungfu is a curated collection of **skills** (structured prompts with
references, templates, examples, and optional helper scripts) that AI coding
agents can use to tackle complex business and SaaS work.

Skills use the
[Agent Skills format](https://docs.anthropic.com/en/docs/claude-code) and are
intended for compatible agents such as Claude Code, Cursor, Windsurf, and other
tools that can load skill directories.

The collection emphasizes evidence, explicit assumptions, current source
verification, reproducible outputs, and safe execution rather than generic
advice or fabricated certainty.

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

Most skills are pure Markdown and work without local dependencies. Script-based
skills may require:

| Tool | Required by | Install |
|------|------------|---------|
| [Node.js](https://nodejs.org/) ≥ 18 | `npx skills` installer | `brew install node` |
| [Bun](https://bun.sh/) | TypeScript helper scripts | `brew install oven-sh/bun/bun` |
| Live web access | Current domain, legal, platform, market, pricing, and vendor research | Agent/browser dependent |
| `whois` (optional fallback) | Domain TLDs without a published RDAP service | Commonly pre-installed on macOS |

## Available Skills

<!-- SKILLS-TABLE-START -->
### Business

| Skill | Description |
|-------|-------------|
| [business-idea-finder](skills/business-idea-finder/SKILL.md) | Discover and validate business opportunities from real customer evidence. Use whenever the user wants startup, SaaS, micro-SaaS, product, niche, or market ideas; wants to assess demand or competitors; or needs a ranked opportunity brief and validation plan. |
| [community-growth-specialist](skills/community-growth-specialist/SKILL.md) | Design repeatable community-led growth systems. Use whenever the user wants to grow an audience, build in public, launch in Reddit, Hacker News, Product Hunt, Discord, Slack, or niche groups, improve community engagement, or turn participation into qualified demand. |
| [customer-retention-optimizer](skills/customer-retention-optimizer/SKILL.md) | Diagnose and improve SaaS retention across activation, onboarding, engagement, billing recovery, customer success, expansion, cancellation, and win-back. Use whenever the user mentions churn, cohorts, NRR, GRR, activation, onboarding drop-off, inactive users, failed payments, or customer health. |
| [domain-name-finder](skills/domain-name-finder/SKILL.md) | Generate, research, verify, and rank domain names with current registration checks, trademark-risk screening, language and security review, social-handle research, and registration guidance. Use whenever the user needs a product, company, app, project, or personal-brand name or wants to compare domains. |
| [indie-saas-validation-master](skills/indie-saas-validation-master/SKILL.md) | Validate and de-risk an indie SaaS from problem discovery through paid pilot, MVP, retention, repeatable acquisition, and scaling decisions. Use whenever the user is evaluating a SaaS idea, planning an MVP, interviewing customers, pre-selling, running a fake-door test, seeking product-market fit, or deciding whether to persist, pivot, pause, or scale. |
| [launch-guide](skills/launch-guide/SKILL.md) | Plan and execute an evidence-based product launch across Product Hunt, Hacker News, Reddit, email, social media, blogs, app stores, and owned channels. Use whenever the user is preparing a launch, submission, gallery, demo, launch calendar, launch-day runbook, analytics plan, or post-launch retrospective. |
| [lead-research-assistant](skills/lead-research-assistant/SKILL.md) | Build evidence-backed B2B account and prospect research for sales, partnerships, pilots, or customer discovery. Use whenever the user wants an ICP, target-account list, qualified leads, account scoring, buying signals, decision-maker roles, outreach angles, CRM-ready research, or deeper analysis of named companies. |
| [pricing-strategy-designer](skills/pricing-strategy-designer/SKILL.md) | Design and test SaaS pricing, packaging, value metrics, tiers, trials, freemium, usage-based models, discounts, and price migrations. Use whenever the user is choosing launch pricing, revising a pricing page, raising prices, improving ARPU or conversion, reducing plan confusion, or evaluating willingness to pay and unit economics. |
| [product-launch-announcement-writer](skills/product-launch-announcement-writer/SKILL.md) | Create fact-checked launch messaging and channel-native copy for Product Hunt, GitHub releases, Hacker News, Indie Hackers, Reddit, LinkedIn, X, Threads, blogs, and email. Use whenever the user needs a tagline, launch post, first comment, release notes, social thread, email, message map, headline variants, or launch copy adapted from a repository or website. |
| [saas-legal-generator](skills/saas-legal-generator/SKILL.md) | Create an attorney-review-ready SaaS legal drafting package from an evidence-based data and product inventory. Use whenever the user needs a privacy notice, terms of service, cookie notice, acceptable use policy, DPA, CCPA/CPRA notice, vendor disclosure, or a gap analysis of existing legal pages. This skill flags issues and drafts language for review. |
| [saas-metrics-analyzer](skills/saas-metrics-analyzer/SKILL.md) | Reconcile and analyze SaaS revenue, growth, retention, cohorts, unit economics, margins, and efficiency. Use whenever the user mentions MRR, ARR, churn, GRR, NRR, ARPU, CAC, LTV, payback, cohort retention, growth rate, burn, Rule of 40, fundraising metrics, or a monthly business review. |
| [solo-operations-manager](skills/solo-operations-manager/SKILL.md) | Design a sustainable operating system for a solo founder or tiny team using capacity planning, work-in-progress limits, service levels, weekly reviews, automation, and recovery boundaries. Use whenever the user is overwhelmed, context-switching, missing priorities, juggling product/marketing/support, working reactively, or planning a realistic weekly rhythm. |
| [systemization-documentation-expert](skills/systemization-documentation-expert/SKILL.md) | Capture, redesign, test, and govern repeatable business processes as SOPs, checklists, decision trees, runbooks, and training materials. Use whenever the user wants to delegate work, onboard a hire or contractor, reduce founder dependency, document a recurring workflow, prepare automation, create incident procedures, or improve an existing knowledge base. |
| [technical-automation-architect](skills/technical-automation-architect/SKILL.md) | Design pragmatic SaaS architecture, build-vs-buy decisions, reliability controls, and safe automation for a solo founder or small team. Use whenever the user is choosing a stack, reviewing an architecture, evaluating vendors or boilerplates, reducing manual operations, adding AI workflows, planning scale, improving deployment/observability/backups, or managing technical debt. |
<!-- SKILLS-TABLE-END -->

## Project Structure

```
kungfu/
├── skills/           # Standalone skill definitions (SKILL.md per directory)
├── scripts/          # Build, validation & code-gen scripts (Python + TypeScript)
├── justfile          # Task automation (just check, just validate, etc.)
└── README.md         # This file — skills table is auto-generated
```

### How Skills Work

Each skill lives in its own directory under `skills/` and contains:

- **`SKILL.md`** — the main instruction file with YAML frontmatter (`name`,
  `description`) and detailed Markdown guidance
- **`references/`** — supporting research, benchmarks, and frameworks
- **`templates/`**, **`examples/`**, **`scripts/`** — optional supporting files

A strong skill should:

- use available context before asking the user to repeat information;
- define a repeatable workflow and concrete output contract;
- distinguish evidence, estimates, assumptions, and unknowns;
- verify time-sensitive claims from current authoritative sources;
- include safeguards for legal, financial, privacy, security, platform, or
  irreversible actions;
- expose failure states and counter-evidence rather than forcing a positive
  recommendation.

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
just validate              # check frontmatter, links, sources, and resources
just fmt                   # format code and Markdown
just readme-table --write  # regenerate the skills table above
just check                 # run the complete repository check
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) — JavaScript runtime and package manager
- [Just](https://just.systems/) — task runner (`brew install just`)
- [uv](https://docs.astral.sh/uv/) — Python package runner (`brew install uv`)

### Install and Verify

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
| `just fmt` | Format everything (Biome for code, Prettier for Markdown) |
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
