---
name: customer-retention-optimizer
description: Diagnose and improve SaaS retention across activation, onboarding, engagement, billing recovery, customer success, expansion, cancellation, and win-back. Use whenever the user mentions churn, cohorts, NRR, GRR, activation, onboarding drop-off, inactive users, failed payments, or customer health.
category: business
license: MIT
---

# Customer Retention Optimizer

Find where and why customers lose value, then design measurable interventions.
Do not treat all churn as one problem or hide product-market-fit issues behind
lifecycle messaging.

## Operating Rules

- Start from the user’s event definitions, billing data, customer segments, and
  cohorts; do not apply generic benchmarks before checking comparability.
- Separate observed behavior from inferred churn causes.
- Never fabricate interviews, health scores, or causal claims from correlations.
- Preserve easy cancellation, honest messaging, consent, and user control. Do
  not use dark patterns, misleading countdowns, or obstructive save flows.
- Prefer one well-instrumented intervention over a large unmeasurable campaign.
- Protect personal data and use only the minimum data needed for customer
  success.

## Define the Metrics First

Document the period, population, denominator, exclusions, and source for each
metric. At minimum distinguish:

- **Logo churn:** customers lost / starting customers;
- **Gross revenue retention (GRR):** retained recurring revenue before
  expansion;
- **Net revenue retention (NRR):** retained revenue after expansion and
  contraction;
- **Voluntary churn:** customer-initiated cancellation;
- **Involuntary churn:** failed payment or billing failure;
- **Activation:** the smallest observable behavior associated with receiving
  value;
- **Retention:** return or continued value at a defined interval, by cohort.

Do not convert monthly churn to annual by multiplying by 12. Use compounding and
state that the calculation assumes a stable monthly rate.

## Workflow

### 1. Validate Data and Reconcile Revenue

Check event tracking, subscription states, refunds, pauses, reactivations,
upgrades, downgrades, annual plans, and account merges. Reconcile opening MRR to
expansion, contraction, churn, reactivation, and closing MRR before diagnosing.

Produce a metric dictionary and list any data gaps that could change the
conclusion.

### 2. Segment the Retention Problem

Analyze cohorts by dimensions that may change the value path:

- signup month and lifecycle age;
- plan, contract term, and acquisition channel;
- use case, role, company size, and geography;
- onboarding path and activation behavior;
- voluntary versus involuntary churn;
- new, retained, resurrected, and expansion revenue.

Use retention curves rather than only blended averages. Small cohorts should
show counts and uncertainty, not false precision.

### 3. Locate the Breakpoint

Map the customer journey:

`promise → setup → first value → repeated value → habit/workflow integration →
expansion → renewal`

For each transition, measure completion, time, abandonment, support friction,
and qualitative evidence. Common root-cause groups are:

- expectation mismatch or poor-fit acquisition;
- setup complexity or missing integration;
- weak or delayed first value;
- insufficient recurring use case;
- reliability, performance, or trust problems;
- price/value mismatch;
- billing failure;
- organizational change or seasonal need.

Read [onboarding patterns](references/onboarding-checklist.md) and [health score
design](references/health-score-calculation.md), but calibrate them to actual
retained behavior.

### 4. Gather Causal Evidence

Combine product data with cancellation reasons, support conversations, sales
notes, interviews, and account reviews. Ask about concrete past behavior:

- What outcome were they trying to achieve?
- What happened immediately before disengagement?
- What workaround or replacement did they choose?
- What would have made staying rational?

Treat exit-survey options as hypotheses; forced categories can mask the real
cause.

### 5. Prioritize Interventions

Rank interventions by affected revenue, evidence strength, expected impact,
implementation effort, reversibility, and risk. Match the treatment to the
cause:

- fit problem → positioning, qualification, or product scope;
- activation problem → shorter path, templates, migration help, or guided setup;
- recurring-value problem → workflow integration, reminders with consent, or
  missing capability;
- reliability problem → engineering and communication, not promotional email;
- involuntary churn → card updater, retry logic, clear dunning, and grace
  periods;
- value/price problem → packaging, downgrade, pause, or right-sized plan;
- high-value at-risk account → human success plan with owner and desired
  outcome.

Use [email sequences](references/email-sequences.md) only after choosing the
correct trigger and segment.

### 6. Run and Evaluate Experiments

For each experiment define:

- target cohort and eligibility;
- hypothesis and mechanism;
- primary metric and guardrails;
- exposure date and observation window;
- comparison method;
- stop conditions;
- owner and follow-up decision.

Activation can move quickly; renewal effects may require longer observation.
Avoid declaring success from opens or clicks when the goal is retained value.

### 7. Build a Sustainable System

Create:

- a weekly risk review for actionable accounts;
- a monthly cohort and revenue-retention review;
- event-triggered playbooks with rate limits;
- a feedback loop from churn causes to product, marketing, and sales;
- periodic validation that the health score still predicts outcomes;
- a fair cancellation, pause, export, and deletion experience.

## Output Contract

Return:

1. metric dictionary and data-quality findings;
2. cohort and segment diagnosis;
3. ranked root-cause hypotheses with evidence and counter-evidence;
4. intervention backlog with estimated affected revenue;
5. two to four experiment cards;
6. instrumentation and operating cadence;
7. assumptions, risks, and unresolved questions.

## Sources

- [SaaS Metrics | ChartMogul](https://chartmogul.com/resources/saas-metrics/)
- [Net MRR Retention | ChartMogul Help
  Center](https://help.chartmogul.com/article/163-net-mrr-retention)
- [Stripe Revenue Recovery
  Documentation](https://docs.stripe.com/billing/revenue-recovery)
- [Customer Health Score |
  Gainsight](https://www.gainsight.com/glossary/customer-health-score/)
- [Bringing Dark Patterns to Light | U.S. Federal Trade
  Commission](https://www.ftc.gov/reports/bringing-dark-patterns-light)
