---
name: business-idea-finder
description: Discover and validate business opportunities from real customer evidence. Use whenever the user wants startup, SaaS, micro-SaaS, product, niche, or market ideas; wants to assess demand or competitors; or needs a ranked opportunity brief and validation plan.
category: business
license: MIT
---

# Business Idea Finder

Find problems worth solving, not merely ideas that sound interesting. Produce an
evidence-backed shortlist and a cheap next test for each finalist.

## Operating Rules

1. **Use available context first.** Inspect the conversation, repository,
   product, audience, and constraints before asking questions. Ask only for
   missing information that would materially change the search.
2. **Research live evidence.** Market conditions, competitors, pricing,
   communities, and regulations change. Verify current claims and record source
   URLs plus access dates.
3. **Separate fact from inference.** Label each important claim as `Observed`,
   `Reported`, `Estimated`, or `Assumption`.
4. **Look for counter-evidence.** A good brief explains why the idea may fail,
   not only why it may work.
5. **Do not invent demand.** Engagement, search volume, market-size estimates,
   and quoted customer language must be traceable.
6. **Prefer commitment over compliments.** Payment, a pilot, data access, an
   introduction, or time invested is stronger evidence than survey enthusiasm.

## Inputs and Defaults

Infer what you can, then establish:

- founder advantages: expertise, distribution, reputation, data, integrations;
- customer: role, company type, geography, and buying authority;
- constraints: time, capital, team, regulated data, and desired business model;
- objective: cash-flow business, venture-scale company, service, marketplace,
  API, or internal tool.

When the request is broad, default to opportunities that a small technical team
can test within two weeks and build an initial paid solution for within roughly
one to three months. Treat that as a constraint, not a success guarantee.

## Workflow

### 1. Define the Search Thesis

Write one sentence:

> Find `[problem type]` for `[reachable customer]` where `[founder advantage]`
> creates a credible wedge.

Choose two to four evidence channels where the customer naturally reveals pain:
support forums, reviews, job posts, procurement documents, niche communities,
interviews, public workflows, or competitor changelogs. Use [platform
strategies](references/platform-strategies.md) and [problem-signal
patterns](references/problem-signals.md) as query aids, not as proof by
themselves.

### 2. Build an Evidence Ledger

Capture each signal with:

| Field | Requirement |
| --- | --- |
| Problem | Specific job, friction, or risk |
| Customer | Who experiences and who pays |
| Evidence | Quote or faithful paraphrase |
| Source | URL, date, channel |
| Current workaround | Tool, spreadsheet, labor, or avoidance |
| Cost | Time, money, risk, delay, or lost revenue |
| Frequency | One-off, recurring, or event-driven |
| Confidence | High, medium, or low with reason |

Cluster signals by underlying job-to-be-done. Do not count reposts or copied
complaints as independent evidence.

### 3. Map Alternatives and Market Structure

Research direct competitors, adjacent tools, manual services, internal builds,
and “do nothing.” For each alternative, record target segment, pricing model,
core promise, strengths, recurring complaints, switching costs, and distribution
channel.

Competition is neither automatic validation nor automatic disqualification. A
market with competitors may prove budget exists; an empty market may indicate a
difficult problem, weak demand, or poor reachability. Use [the validation
framework](references/validation-framework.md) and [opportunity
patterns](references/opportunity-patterns.md) for deeper analysis.

### 4. Score Opportunities

Score every criterion from 0 to 5 and show the evidence behind the score:

| Criterion | Weight |
| --- | ---: |
| Pain severity and economic impact | 3 |
| Frequency and persistence | 2 |
| Evidence of budget or costly workaround | 3 |
| Customer reachability | 3 |
| Founder advantage | 2 |
| Speed to a credible test | 2 |
| Differentiated wedge | 2 |
| Expansion potential | 1 |
| Regulatory, platform, and dependency risk | -2 |
| Adoption and switching friction | -2 |

Do not hide uncertainty inside a precise total. Include confidence and the most
score-sensitive assumptions. A lower-scoring idea with a cheap decisive test may
deserve priority over a higher-scoring idea based on weak estimates.

### 5. Design the Smallest Decisive Test

Test the riskiest assumption before building the whole product. Examples:

- five problem interviews using past behavior rather than hypothetical intent;
- a paid concierge service that manually delivers the promised outcome;
- a prototype tested with real customer data;
- a clearly disclosed waitlist or fake-door test;
- a letter of intent, deposit, paid pilot, or design partnership;
- outreach to a tightly defined account list with a concrete offer.

Define in advance:

- hypothesis;
- target segment and sample;
- observable pass, revise, and stop conditions;
- test cost and deadline;
- what decision follows each result.

### 6. Produce the Opportunity Brief

Return:

1. **Executive summary** with the top recommendation and why now.
2. **Search thesis and constraints.**
3. **Ranked opportunity table** with score, confidence, and decisive test.
4. **Evidence ledger** with citations.
5. **Competitor and workaround map.**
6. **One-page brief per finalist:** customer, problem, current behavior, wedge,
   business model, acquisition path, risks, and test.
7. **Recommendation:** pursue, test first, park, or reject.

Use [analysis templates](references/analysis-templates.md) when a SWOT or
Business Model Canvas is explicitly useful. Do not generate them mechanically
when a decision memo would be clearer.

## Quality Gate

Before finishing, verify that:

- each finalist is supported by multiple independent signals or clearly marked
  as speculative;
- customer, user, and buyer are distinguished;
- alternatives include manual and “do nothing” behavior;
- market-size numbers state method and uncertainty;
- the recommendation includes disconfirming evidence;
- the next test can change the decision;
- no legal, financial, health, or platform claim is presented without current
  verification.

## Sources

- [Market Research and Competitive Analysis | U.S. Small Business
  Administration](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis)
- [How to Get Startup Ideas | Paul
  Graham](https://paulgraham.com/startupideas.html)
- [The Mom Test](https://www.momtestbook.com/)
- [Strategyzer Testing Business
  Ideas](https://www.strategyzer.com/library/testing-business-ideas-book)
