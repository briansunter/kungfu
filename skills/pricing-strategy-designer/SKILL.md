---
name: pricing-strategy-designer
description: Design and test SaaS pricing, packaging, value metrics, tiers, trials, freemium, usage-based models, discounts, and price migrations. Use whenever the user is choosing launch pricing, revising a pricing page, raising prices, improving ARPU or conversion, reducing plan confusion, or evaluating willingness to pay and unit economics.
category: business
license: MIT
---

# Pricing Strategy Designer

Design a pricing system that aligns customer value, product usage, unit
economics, and go-to-market motion. Do not default to three tiers, charm
pricing, or competitor averages.

## Operating Rules

- Inspect the product, current pricing, usage, customer segments, sales process,
  costs, and retention before asking questions.
- Separate pricing (amount), packaging (what is included), and metric (what
  scales the bill).
- Use current competitor data with source and date, but do not copy a competitor
  whose segment or economics differ.
- Treat willingness-to-pay research and experiments as uncertain evidence, not
  mathematical truth.
- Do not invent conversion lifts, survey results, customer quotes, or
  statistical significance.
- Preserve transparent billing, easy cancellation, clear renewal terms, and fair
  migration. Avoid hidden fees, preselected paid options, fake scarcity, and
  confusing negative-option flows.
- Consider currency, tax, invoicing, refunds, procurement, accessibility, and
  regional constraints.

## Inputs

Establish or infer:

- target segments and use cases;
- measurable customer outcome and alternatives;
- current plans, prices, discounts, and contract terms;
- usage distribution and cost-to-serve;
- acquisition and sales motion;
- activation, retention, expansion, contraction, and support burden;
- strategic goal: adoption, cash flow, ARPU, expansion, enterprise readiness, or
  simplicity.

## Workflow

### 1. Segment by Value and Buying Motion

Group customers by meaningful differences in outcome, budget, procurement,
service requirement, and usage—not arbitrary company-size labels. Identify the
user, buyer, budget owner, and approval process for each segment.

### 2. Choose a Value Metric

Evaluate candidate metrics such as seats, usage, records, revenue processed,
locations, projects, or a hybrid base + usage model.

A strong metric should:

- track value reasonably well;
- be understandable and forecastable;
- be measurable and hard to game;
- allow expansion without punishing healthy use;
- align with marginal cost and gross margin;
- avoid perverse product behavior.

Score candidates and test them against real account examples, including
high-use/low-value and low-use/high-value edge cases.

### 3. Design Packaging

Start with customer jobs and required outcomes. Create the fewest packages that
make segment differences clear. One plan, two plans, modular add-ons, usage
pricing, or negotiated enterprise terms may outperform the familiar three-column
page.

For each package specify:

- target customer and outcome;
- included capabilities and limits;
- value metric and overage behavior;
- service, support, security, and compliance level;
- upgrade/downgrade path;
- monthly, annual, and contract terms;
- who should not buy it.

Use [pricing-page templates](references/pricing-page-templates.md) after the
structure is decided.

### 4. Establish a Price Range

Triangulate:

- economic value and avoided alternative cost;
- current customer behavior and deal history;
- competitor and substitute pricing;
- willingness-to-pay interviews;
- Van Westendorp or Gabor-Granger surveys when sample and question design are
  credible;
- sales objections and win/loss evidence;
- gross margin, support, payment fees, taxes, and acquisition payback.

Do not infer the final price from one method. Report range, confidence, and the
assumptions that drive it.

### 5. Choose the Entry Model

Evaluate paid-only, reverse trial, time-limited trial, usage-limited trial,
freemium, demo/sales-led, and hybrid paths.

Choose based on:

- how quickly value can be experienced;
- setup and integration effort;
- variable cost and abuse risk;
- collaboration or viral loops;
- buyer approval process;
- support burden;
- whether free use naturally creates qualified expansion.

A free plan is a product and support commitment, not merely a marketing tactic.

### 6. Model Economics and Scenarios

For each candidate structure model:

- customer distribution by plan/usage;
- MRR/ARR and expansion potential;
- gross margin and variable cost;
- discounts, failed payments, refunds, and taxes;
- acquisition payback and sales capacity;
- downgrade/churn sensitivity;
- annual cash-flow effect.

Use ranges and sensitivity analysis rather than a single optimistic forecast.

### 7. Test Without Confounding Everything

Select the lowest-risk method appropriate to traffic and sales volume:

- new-customer cohort with a documented start date;
- sales quote test across comparable accounts;
- landing-page or checkout test with consistent traffic allocation;
- qualitative price/packaging interviews;
- staged rollout by segment or geography;
- shadow billing or invoice preview for a new usage metric.

Change one coherent hypothesis at a time when possible. Define exposure, sample,
primary metric, guardrails, observation window, and decision rule. Read [the A/B
testing framework](references/ab-testing-framework.md); low traffic may require
sequential learning rather than a conventional significance test.

### 8. Plan the Migration

For price changes, decide:

- new customers only, grandfathering, sunset, or phased migration;
- notice period and contract constraints;
- customer-specific impact analysis;
- downgrade, pause, credit, or transition offer;
- billing and entitlement implementation;
- support scripts and escalation authority;
- rollback criteria.

Explain the customer value and exact effect. Do not force migration through
ambiguity or cancellation friction.

Review [pricing case studies](references/pricing-case-studies.md) for patterns,
not promises.

## Output Contract

Return:

1. pricing diagnosis and strategic objective;
2. segment/value map;
3. value-metric scorecard;
4. two to four packaging/pricing options;
5. unit-economics and sensitivity model;
6. recommended structure with rationale and risks;
7. research/experiment plan;
8. pricing-page information architecture;
9. migration and communication plan when applicable.

## Sources

- [SaaS Pricing Strategy |
  Paddle](https://www.paddle.com/resources/saas-pricing)
- [Van Westendorp Pricing Model |
  Qualtrics](https://www.qualtrics.com/experience-management/product/how-to-use-the-van-westendorp-pricing-model/)
- [A/B Test Sample Size Calculator |
  Optimizely](https://www.optimizely.com/sample-size-calculator/)
- [Negative Option Rule | U.S. Federal Trade
  Commission](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule)
- [Stripe Billing Documentation](https://docs.stripe.com/billing)
