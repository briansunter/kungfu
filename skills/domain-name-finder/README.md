# Domain Name Finder

Find, validate, and register domain names through a structured 7-phase workflow.

## Quick Start

**Run utility scripts:**

```bash
# Quick comprehensive check (recommended)
npx -y bun run scripts/check-all.ts velora.io zenify.app taskflow.com

# Check domain availability (DNS)
npx -y bun run scripts/check-dns.ts example.com example.io

# Query WHOIS for registration details
npx -y bun run scripts/check-whois.ts example.com example.io

# Search for trademark conflicts
npx -y bun run scripts/check-trademarks.ts velora zenify taskflow

# Check social media handle availability
npx -y bun run scripts/check-social.ts velora zenify taskflow
```

3. **Follow the 7-phase workflow** in `SKILL.md` for comprehensive domain
   discovery.

## Scripts

| Script                | Purpose                                           | When to Use                                       |
| --------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `check-all.ts`        | **Comprehensive check** - All checks with scoring | **Default recommendation** - Most users want this |
| `check-dns.ts`        | DNS availability only                             | Quick availability check                          |
| `check-whois.ts`      | WHOIS registration details                        | Get registrar/dates info                          |
| `check-trademarks.ts` | Trademark conflicts                               | Legal risk assessment                             |
| `check-social.ts`     | Social handle availability                        | Brand consistency check                           |

## 7-Phase Workflow

1. **Requirements Gathering** - Understand project context and constraints
2. **Brainstorm Domain Ideas** - Generate 20-30 domain names
3. **Trademark Screening** - Check for potential conflicts
4. **Domain Availability** - Identify which domains are available
5. **Analysis and Scoring** - Rank domains by overall fit
6. **Deep Dive on Finalists** - Comprehensive analysis of top 3-5 domains
7. **Registration and Next Steps** - Guide through registration and setup

See `SKILL.md` for complete workflow details.

## References

- `trademark-search-guide.md` - USPTO/EUIPO/UKIPO database links
- `registrars-comparison-2025.md` - Pricing, features, pros/cons
- `registration-guide.md` - Step-by-step registration walkthrough
- `dns-setup-guide.md` - A/CNAME/MX records

## Examples

See `examples/EXAMPLES.md` for real-world walkthroughs:

- SaaS project management tool
- E-commerce store (niche coffee)
- Personal brand (freelance developer)

## License

MIT
