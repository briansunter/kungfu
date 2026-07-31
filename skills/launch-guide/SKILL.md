---
name: launch-guide
description: Plan and execute an evidence-based product launch across Product Hunt, Hacker News, Reddit, email, social media, blogs, app stores, and owned channels. Use whenever the user is preparing a launch, submission, gallery, demo, launch calendar, launch-day runbook, analytics plan, or post-launch retrospective.
category: business
license: MIT
compatibility: Live web access is required to verify current platform fields, limits, eligibility, and anti-manipulation rules before execution.
---

# Launch Guide

Coordinate a launch that the product can support and that produces learning
after the announcement. This skill owns launch strategy, readiness, operations,
assets, analytics, and follow-through. Use `product-launch-announcement-writer`
for the detailed copy deck.

## Operating Rules

- Inspect the product, repository, website, analytics, audience, and existing
  copy before asking questions.
- Verify platform rules and form fields on the execution date. Do not rely on
  cached character limits, categories, account requirements, or timing advice.
- Never recommend purchased votes, coordinated upvoting, review manipulation,
  fake accounts, undisclosed incentives, or spam.
- Do not fabricate users, logos, testimonials, rankings, scarcity, or
  performance claims.
- Prefer product readiness and audience fit over a supposedly ideal weekday or
  hour.
- Build an owned follow-up path; a platform launch is an event, not the whole
  go-to-market strategy.

## Phase 1: Launch/No-Launch Gate

Assess:

| Area | Ready when |
| --- | --- |
| Product | Core path works with realistic data and known limitations are disclosed |
| Reliability | Monitoring, backups/rollback, incident owner, and status communication exist |
| Onboarding | A new user can reach first value without founder rescue, or high-touch help is planned |
| Positioning | Audience, problem, outcome, alternative, and differentiator are specific |
| Proof | Demo, real examples, or permissioned customer evidence supports the claims |
| Conversion | Pricing/CTA, signup, email delivery, attribution, and support flow work |
| Compliance | Privacy, terms, consent, claims, licenses, and platform rules are reviewed |
| Capacity | Someone can respond to users and incidents throughout the launch window |

Return `launch`, `soft launch`, `delay`, or `cancel`, with blockers and owners.
Do not delay merely for cosmetic perfection when the core learning loop is safe
and functional.

## Phase 2: Define the Launch Thesis

Write:

- **Audience:** exact people the launch should reach;
- **Message:** one problem, one outcome, one differentiator;
- **Primary action:** try, install, join, buy, book, star, or discuss;
- **Primary learning goal:** the assumption this launch should test;
- **Success measures:** downstream behavior, not only reach;
- **Guardrails:** uptime, support queue, refunds, complaints, unsubscribes, and
  abuse.

Choose channels based on audience presence and native intent. Do not post
everywhere by default.

## Phase 3: Verify Platform Requirements

For each selected platform, record source URL, checked date, account
eligibility, fields, limits, media specifications, promotional rules, and
moderation risks.

### Product Hunt

Use current official Product Hunt guidance. As of the latest documented rules,
makers should use eligible personal accounts, may schedule/create a draft, can
select up to three categories, and should invite people to visit and join the
discussion rather than directly asking for upvotes. Current guidance describes a
short description field around 260 characters, but verify the live form because
Product Hunt changes its workflow.

The product must be usable or meaningfully available; a page that only collects
emails may not be homepage-eligible. Review [the form
guide](references/product-hunt-form-guide.md) immediately before submission.

### Other Communities

Read current rules for Hacker News, Reddit, Slack/Discord groups, app stores,
and newsletters. A native explanatory post usually performs better and is safer
than a bare link. Disclose affiliation and do not coordinate artificial
engagement.

## Phase 4: Build the Asset System

Create a shot list that tells one coherent story:

1. hero: product and core outcome;
2. problem/current workflow;
3. key workflow steps;
4. result or artifact produced;
5. differentiator or integration;
6. proof, limitations, or who it is for;
7. clear next action.

Use realistic, permissioned data. Remove secrets, notifications, personal
information, test accounts, and misleading dashboards. Verify current
dimensions; Product Hunt has historically recommended 1270×760 gallery assets
and multiple images, but the current interface is authoritative.

Prepare:

- a short demo that reaches value quickly;
- accessible captions/transcript and alt text;
- fallback static images if video/GIF fails;
- consistent product name, URL, pricing, and claims across channels;
- UTM/tagging convention and analytics event checklist.

Use [first-comment templates](references/first-comment-templates.md) for
structure, then make the comment specific and candid.

## Phase 5: Produce the Runbook

Build a time-sequenced runbook with owner, dependency, status, and fallback for:

- final smoke test and backup;
- submission/publishing order;
- analytics verification;
- email/social/community posts;
- comment and support coverage;
- incident severity and rollback;
- abuse/security escalation;
- refund or billing issue handling;
- end-of-day reconciliation.

Do not optimize solely for “12:01 AM Pacific.” Product Hunt’s day has
historically followed Pacific time, but choose a launch time that preserves
response coverage and verify current platform behavior.

## Phase 6: Operate the Launch

During the launch:

- respond substantively rather than posting ranking updates;
- capture objections, bugs, use cases, and source attribution;
- update known limitations transparently;
- pause promotion if reliability or customer harm crosses a guardrail;
- avoid arguing with criticism; investigate and correct factual issues;
- keep a decision log for changes made under pressure.

## Phase 7: Convert Attention Into Learning

Within one to three days, reconcile:

- impressions/visits → qualified visits → signup/install → activation → payment;
- retained behavior by source and segment;
- support volume, defects, refunds, and complaints;
- message/asset performance;
- qualitative themes and surprising use cases;
- what to repeat, revise, or stop.

Publish a useful follow-up where appropriate, then schedule the next product or
distribution experiment. Do not present correlation as causal uplift without a
valid comparison.

## Output Contract

Return:

1. readiness gate and blocker list;
2. launch thesis and channel rationale;
3. verified platform requirement table;
4. asset and screenshot shot list;
5. launch runbook with fallbacks;
6. measurement plan and dashboard specification;
7. post-launch retrospective template;
8. copy handoff requirements for `product-launch-announcement-writer`.

## Sources

- [Product Hunt Launch Guide](https://www.producthunt.com/launch)
- [How to Post a Product | Product Hunt Help
  Center](https://help.producthunt.com/en/articles/479557-how-to-post-a-product)
- [Prepare for Your Product Hunt
  Launch](https://www.producthunt.com/launch/preparing-for-launch)
- [Hacker News Guidelines](https://news.ycombinator.com/newsguidelines.html)
- [Reddit Content Policy](https://redditinc.com/policies/content-policy)
- [Managing Releases in a Repository | GitHub
  Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [FTC Endorsement
  Guides](https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews)
