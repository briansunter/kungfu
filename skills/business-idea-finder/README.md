# Business Idea Finder

Discover profitable business ideas by mining problem signals from social
platforms.

## Quick Start

This skill uses Claude's built-in web search to find unsolved problems across
Reddit, HackerNews, Twitter/X, IndieHackers, Product Hunt, and Threads.

**Example usage**:

```
I want to find business ideas for project management tools for marketing agencies.
```

Claude will:

1. Search multiple platforms for problem signals
2. Analyze engagement and recency
3. Rank opportunities by potential
4. Validate market size and competition
5. Provide actionable business briefs

## How It Works

The skill guides you through a 5-phase discovery process:

1. **Niche Selection** - Define your target market/industry
2. **Signal Mining** - Search platforms for problem signals
3. **Problem Ranking** - Prioritize by engagement and feasibility
4. **Validation** - Competitor analysis, market sizing, willingness to pay
5. **Documentation** - Create business opportunity briefs

## What You'll Get

- **30-50 raw problem signals** with source links
- **10-15 ranked opportunities** with scoring rationale
- **3-5 validated business ideas** with full analysis including:
  - Problem statement and target customer
  - Evidence from multiple platforms
  - Competitor landscape
  - Market size indicators
  - Technical feasibility assessment
  - Pricing hypothesis
  - Next steps for MVP development

## Example Workflows

### B2B SaaS Ideas

```
Find business ideas for CRM software for real estate agents
```

Claude searches: Reddit (r/realestate, r/CRM), Twitter (complaints about
existing CRMs), IndieHackers (revenue data), and identifies specific pain points
like "lead tracking across multiple platforms" or "automated follow-up
scheduling."

### Developer Tools

```
Find micro-SaaS opportunities for API testing tools
```

Claude searches: HackerNews "Ask HN", Reddit (r/devops, r/programming),
identifies problems like "missing API documentation generation" or "integration
testing for webhooks."

### E-commerce Operations

```
Find business ideas for inventory management for Shopify stores
```

Claude searches: Reddit (r/shopify, r/ecommerce), Twitter ("I hate Shopify
inventory"), identifies opportunities like "multi-warehouse stock sync" or
"predictive restocking."

### Consumer Apps

```
Find ideas for habit tracking apps with gamification
```

Claude searches: Product Hunt launches (gap analysis), Reddit (r/productivity,
r/habits), identifies underserved segments like "family habit tracking" or
"corporate wellness challenges."

## Key Features

- **Platform-specific search strategies** - Tailored queries for each platform
- **Problem signal detection** - Identifies high-value phrases like "I wish
  there was..."
- **Engagement scoring** - Prioritizes recent, high-upvote, specific problems
- **Competitor analysis** - Validates market gaps and differentiation
  opportunities
- **Feasibility filtering** - Ensures ideas are solo-founder friendly

## Search Query Examples

The skill includes ready-to-use search queries:

**Reddit**:

- `site:reddit.com "I wish there was" [niche]`
- `site:reddit.com "frustrated with" [tool type]`
- `site:reddit.com/r/SomebodyMakeThis [industry]`

**HackerNews**:

- `site:news.ycombinator.com "Ask HN" looking for [tool]`
- `site:news.ycombinator.com [problem] tool`

**Twitter/X**:

- `"I hate" [tool type]`
- `"why is it so hard to" [task]`
- `"annoying that" [software]`

**IndieHackers**:

- `site:indiehackers.com "would pay for" [problem]`
- `site:indiehackers.com "unsolved problems" [niche]`

See [references/platform-strategies.md](references/platform-strategies.md) for
complete query patterns.

## Validation Framework

Each discovered idea is validated against:

- **Engagement**: Upvotes, comments, recency
- **Frequency**: Mentioned across multiple platforms
- **Willingness to Pay**: Explicit pricing mentions
- **Market Size**: Potential customer count
- **Competition**: Number and quality of alternatives
- **Technical Feasibility**: Solo-founder buildability

See [references/validation-framework.md](references/validation-framework.md) for
detailed validation methodology.

## Opportunity Patterns

The skill identifies high-potential business patterns:

- **API Products**: Developer tools, integrations, data services
- **Micro-SaaS**: Narrow focus, low overhead, high margin
- **Workflow Automation**: Replace manual processes
- **B2B Tools**: Higher willingness to pay, clearer ROI
- **"Boring" Businesses**: Unsexy but profitable (invoicing, compliance,
  reporting)

See [references/opportunity-patterns.md](references/opportunity-patterns.md) for
pattern details.

## Common Mistakes to Avoid

1. **Too broad**: "Find me any business idea" → Be specific to industry/niche
2. **Ignoring engagement**: Low-upvote posts are often venting, not
   opportunities
3. **Skipping validation**: Check competitors before falling in love with an
   idea
4. **Consumer-first**: B2B has higher success rates for solo founders
5. **Overbuilding**: Filter for ideas feasible as solo MVP (1-3 months)

## Next Steps

After finding validated ideas:

- Use `indie-saas-validation-master` for pre-launch planning
- Use `pricing-strategy-designer` for monetization design
- Use `customer-retention-optimizer` for retention planning

## References

- [SKILL.md](SKILL.md) - Main skill documentation with detailed process
- [references/problem-signals.md](references/problem-signals.md) - Problem
  signal indicators
- [references/platform-strategies.md](references/platform-strategies.md) -
  Search strategies per platform
- [references/validation-framework.md](references/validation-framework.md) -
  Validation methodology
- [references/opportunity-patterns.md](references/opportunity-patterns.md) -
  Common opportunity patterns

## License

MIT
