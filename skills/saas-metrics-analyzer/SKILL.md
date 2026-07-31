---
name: saas-metrics-analyzer
description: Reconcile and analyze SaaS revenue, growth, retention, cohorts, unit economics, margins, and efficiency. Use whenever the user mentions MRR, ARR, churn, GRR, NRR, ARPU, CAC, LTV, payback, cohort retention, growth rate, burn, Rule of 40, fundraising metrics, or a monthly business review.
category: business
license: MIT
---

# SaaS Metrics Analyzer

Build a trustworthy metric model before judging performance. Definitions,
cohorts, segments, billing terms, and data quality matter more than a universal
“health score.”

## Operating Rules

- State the reporting period, currency, timezone, data sources, exclusions, and
  whether values are recognized revenue, billings, cash, or recurring run rate.
- Reconcile source data before calculating ratios.
- Never invent missing values or silently turn estimates into facts.
- Show formulas, units, counts, and denominators. Distinguish logo, revenue,
  account, seat, and user metrics.
- Analyze trends and cohorts before applying benchmarks. Benchmarks must match
  stage, ACV, segment, geography, billing model, and definition.
- Report uncertainty and sample size; avoid false precision for small cohorts.
- Do not imply causal diagnosis from correlation alone.

## Metric Dictionary

Define each metric in the user’s model. Recommended core definitions:

```text
Closing MRR = Opening MRR + New + Expansion + Reactivation - Contraction - Churn
ARR = MRR × 12  # only when MRR is a valid recurring run rate
ARPA = MRR / active paying accounts
Logo churn = lost accounts / opening accounts
GRR = (Opening MRR - Contraction - Churn) / Opening MRR
NRR = (Opening MRR + Expansion + Reactivation - Contraction - Churn) / Opening MRR
CAC = attributable sales and marketing cost / new customers acquired
CAC payback months = CAC / monthly gross profit from the acquired customer
```

Specify whether reactivation belongs in NRR for the chosen reporting convention.
Keep the convention consistent.

A simple steady-state LTV estimate is sometimes written as:

```text
LTV ≈ ARPA × gross margin / monthly revenue churn
```

Use it only when churn is positive and reasonably stable. It can be misleading
with heterogeneous cohorts, expansion, annual contracts, changing retention, or
small samples. Prefer cohort contribution margin or survival-based models when
data supports them.

## Workflow

### 1. Audit and Normalize Data

Check:

- duplicate accounts, test users, internal plans, and one-time charges;
- taxes, refunds, credits, discounts, pauses, and failed payments;
- annual/multi-year contracts and normalization to MRR;
- upgrades, downgrades, reactivations, and backdated changes;
- currency conversion policy;
- beginning/ending population consistency;
- event and subscription status definitions.

Produce a data-quality report and identify which conclusions are blocked or
tentative.

### 2. Reconcile MRR

Create an MRR bridge by month and verify that components equal closing MRR.
Separate:

- new;
- expansion;
- contraction;
- churn;
- reactivation;
- price/currency/accounting adjustments.

Investigate unexplained residuals instead of hiding them in “other.”

### 3. Analyze Growth Composition

Calculate net new MRR and growth rate, then explain what produced growth.
Compare new acquisition with expansion and losses. A high headline growth rate
supported by a small base or temporary annual-plan conversion should be labeled
accordingly.

Analyze by customer segment, plan, acquisition channel, geography, and cohort
where sample size permits.

### 4. Analyze Retention

Build cohort tables or curves for activation, logo retention, revenue retention,
and repeated core-value behavior. Distinguish voluntary and involuntary churn.
Examine:

- first-week/month drop-off;
- retention curve shape and stabilization;
- GRR versus NRR;
- concentration of expansion;
- reasons and timing of contraction/churn;
- retention by acquisition source and customer fit.

### 5. Analyze Unit Economics

Calculate CAC by channel and acquisition cohort, not only as a blended average.
Define included spend and attribution window. Report:

- CAC and sales cycle;
- gross-margin-adjusted payback;
- contribution margin by segment;
- LTV range and model assumptions;
- LTV:CAC only when both measures are comparable;
- support/implementation burden;
- cash impact of annual prepayment.

A very high LTV:CAC ratio can indicate strong economics, underinvestment, or an
overstated LTV. Investigate rather than celebrating automatically.

### 6. Analyze Efficiency and Risk

Where data is available, assess:

- gross margin and major variable-cost drivers;
- operating margin, burn, runway, and cash conversion;
- revenue/customer concentration;
- discount and contract exposure;
- infrastructure cost per active account or unit of value;
- sales and support capacity;
- dependency and seasonality risk.

Use Rule of 40 or other composite metrics only when relevant to the company’s
stage and with the exact growth and margin definitions stated.

### 7. Benchmark Carefully

Read [metric benchmarks](references/metric-benchmarks.md), then verify current
primary or reputable benchmark sources. Present peer ranges with report year,
sample, segment, and definition. Use benchmarks to generate questions, not to
override company-specific economics.

### 8. Prioritize Actions

For each finding provide:

- evidence and confidence;
- financial/customer impact;
- likely mechanisms and counter-hypotheses;
- next analysis or experiment;
- owner, cadence, and decision threshold.

Prioritize data integrity, retention/product fit, pricing/packaging,
acquisition, and cost work according to actual constraints—not a fixed universal
order.

## Output Contract

Return:

1. executive summary with confidence;
2. metric dictionary and data-quality report;
3. MRR bridge and growth composition;
4. cohort and retention analysis;
5. unit-economics model with sensitivity ranges;
6. efficiency and concentration risks;
7. contextual benchmark comparison;
8. ranked actions and unresolved questions;
9. reproducible formulas or query specification.

## Sources

- [SaaS Metrics | ChartMogul](https://chartmogul.com/resources/saas-metrics/)
- [Net MRR Retention | ChartMogul Help
  Center](https://help.chartmogul.com/article/163-net-mrr-retention)
- [SaaS Benchmarks | OpenView](https://openviewpartners.com/saas-benchmarks/)
- [State of the Cloud | Bessemer Venture
  Partners](https://www.bvp.com/atlas/state-of-the-cloud)
- [SaaS Metrics | Paddle](https://www.paddle.com/resources/saas-metrics)
