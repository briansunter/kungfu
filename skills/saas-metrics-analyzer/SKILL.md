---
name: saas-metrics-analyzer
description:
  Analyze SaaS business health across all critical metrics (MRR, ARR, churn,
  LTV:CAC, NRR, ARPU, growth rate) with benchmarks and actionable
  recommendations. Use for monthly business reviews, health checks, or
  diagnosing growth problems.
license: MIT
---

# When to Use This Skill

Use this skill when you need to:

- **Run monthly business health checks** to track progress
- **Benchmark metrics** against industry standards for indie SaaS
- **Diagnose growth problems** (stuck at plateau, high churn, poor unit
  economics)
- **Calculate missing metrics** from partial data
- **Identify red flags** requiring immediate attention
- **Get actionable recommendations** for metric improvement
- **Prepare for fundraising or acquisition** (know your numbers)

# Core Concepts

## The 5 Metric Categories

1. **Revenue Health** (25% weight): MRR, ARR, ARPU
2. **Unit Economics** (25% weight): LTV, CAC, LTV:CAC, payback period
3. **Retention Health** (25% weight): Monthly/annual churn, NRR
4. **Efficiency** (15% weight): Gross margin, profit margin
5. **Growth** (10% weight): MoM growth, viral coefficient

## Quick Health Assessment

| Score  | Rating    | Interpretation                          |
| ------ | --------- | --------------------------------------- |
| 90-100 | Excellent | Best-in-class across most metrics       |
| 70-89  | Healthy   | Solid business, room for optimization   |
| 50-69  | Warning   | Some red flags, needs attention         |
| <50    | Critical  | Major issues, immediate action required |

# Step-by-Step Analysis Process

## Step 1: Gather Your Metrics

Collect any of these you have available:

- Monthly Recurring Revenue (MRR)
- Customer count
- Monthly churn rate
- Customer Acquisition Cost (CAC)
- Average Revenue Per User (ARPU)
- Gross margin percentage

## Step 2: Calculate Missing Metrics

**ARPU** (if you have MRR and customers):

```
ARPU = MRR ÷ Total customers
```

**LTV** (if you have ARPU, margin, churn):

```
LTV = (ARPU × Gross Margin %) ÷ Monthly churn rate
```

**LTV:CAC** (if you have LTV and CAC):

```
LTV:CAC = LTV ÷ CAC
```

**CAC Payback** (if you have CAC, ARPU, margin):

```
Payback = CAC ÷ (ARPU × Gross Margin %)
```

**Annual churn** (if you have monthly):

```
Annual = (1 - (1 - Monthly)^12) × 100
```

## Step 3: Benchmark Against Standards

Use the detailed benchmarks in the metric reference sections below.

## Step 4: Identify Red Flags and Strengths

Flag metrics outside healthy ranges and highlight areas of strength.

## Step 5: Generate Recommendations

Prioritize actions by impact: churn → pricing → acquisition → operations.

---

# Metric Deep Dives

## Revenue Metrics

### Monthly Recurring Revenue (MRR)

**What it measures**: Predictable monthly revenue from subscriptions

**Benchmarks**:

| Stage            | MRR Range   | Timeline    |
| ---------------- | ----------- | ----------- |
| Early stage      | $1K-$3K     | 0-6 months  |
| Growth stage     | $5K-$10K    | 6-18 months |
| Sustainable      | $10K+       | 18+ months  |
| Successful indie | $15K median | -           |
| Top performers   | $30K-$100K+ | -           |

**Red flags**:

- ❌ Below $1K MRR after 6 months (product-market fit issues)
- ❌ Stuck at $3K-$5K for 3+ months (growth plateau)
- ❌ Declining for 2+ consecutive months

**Strengths**:

- ✅ Reaching $10K MRR in <18 months
- ✅ Consistent month-over-month growth

---

### Average Revenue Per User (ARPU)

**What it measures**: Average monthly revenue per customer

**Benchmarks**:

| Range             | Assessment                             |
| ----------------- | -------------------------------------- |
| <$29/month        | Underpriced (attracts bargain hunters) |
| $49-$299/month    | Healthy sweet spot for indie SaaS      |
| $300-$5,000/month | High-ticket (enterprise focus)         |

**Red flags**:

- ❌ ARPU <$29 with high churn
- ❌ ARPU declining over time

**Improvement levers**:

- Introduce tiered pricing ($29/$99/$199)
- Add annual payment discounts
- Implement usage-based pricing
- Raise prices on new customers first

**Related skill**: `pricing-strategy-designer`

---

## Unit Economics

### Customer Acquisition Cost (CAC)

**What it measures**: Cost to acquire one new customer

**Benchmarks**:

| CAC Range   | Assessment                      |
| ----------- | ------------------------------- |
| <$200       | Excellent (viral/community-led) |
| $200-$500   | Acceptable                      |
| $500-$1,000 | Expensive (need high LTV)       |
| >$1,000     | Danger zone for SMB SaaS        |

**Formula**:

```
CAC = (Sales + Marketing costs) ÷ New customers acquired
```

**Red flags**:

- ❌ CAC >$500 and ARPU <$50
- ❌ CAC rising over time
- ❌ CAC > LTV × 0.33

**Improvement levers**:

- Focus on community-led growth
- Implement product-led growth
- Optimize onboarding conversion
- Build SEO/content for organic traffic

---

### Customer Lifetime Value (LTV)

**What it measures**: Total revenue from average customer

**Formula**:

```
LTV = (ARPU × Gross Margin %) ÷ Monthly churn rate
```

**Benchmarks** (LTV:CAC ratio):

| Ratio | Assessment                       |
| ----- | -------------------------------- |
| <3:1  | Losing money on customers        |
| 3:1   | Minimum viable                   |
| 4:1   | Healthy (new standard)           |
| 5:1+  | Excellent                        |
| >7:1  | May be under-investing in growth |

**Red flags**:

- ❌ LTV:CAC <3:1
- ❌ LTV <$500
- ❌ LTV declining over time

**Improvement levers**:

- Reduce churn (biggest lever)
- Increase ARPU through pricing
- Improve onboarding
- Add expansion revenue

---

### CAC Payback Period

**What it measures**: Months to recover acquisition cost

**Benchmarks**:

| Months | Assessment                           |
| ------ | ------------------------------------ |
| <6     | Very healthy, can scale aggressively |
| 8-12   | Early-stage acceptable               |
| 12-15  | Excellent for established business   |
| 15-18  | Mid-stage acceptable                 |
| >18    | Danger zone for SMB SaaS             |

---

## Retention Metrics

### Monthly Churn Rate

**What it measures**: Percentage of customers canceling each month

**Benchmarks**:

| Rate | Assessment               |
| ---- | ------------------------ |
| <1%  | Excellent (~5% annually) |
| 1-3% | Healthy                  |
| 2.9% | Average B2B SaaS         |
| 3-5% | Warning zone             |
| >5%  | Danger zone              |

**Formula**:

```
Monthly Churn = (Customers lost ÷ Total customers) × 100
```

**Red flags**:

- ❌ Monthly churn >5%
- ❌ Churn increasing over time
- ❌ Early customers churning fast

**Improvement tactics**:

- Improve onboarding (<7 day TTV)
- Implement customer success
- Build in-product stickiness
- Exit surveys to identify causes

**Related skill**: `customer-retention-optimizer`

---

### Net Revenue Retention (NRR)

**What it measures**: Revenue retention including expansion

**Formula**:

```
NRR = ((Starting MRR + Expansion - Churn - Downgrades) ÷ Starting MRR) × 100
```

**Benchmarks**:

| NRR      | Assessment                   |
| -------- | ---------------------------- |
| <90%     | Severe contraction           |
| <100%    | Contraction (shrinking base) |
| 100-105% | Healthy                      |
| 106%     | Median                       |
| 110%+    | Excellent                    |
| 120-130% | Best-in-class                |

**Red flags**:

- ❌ NRR <100%
- ❌ NRR declining

**Improvement tactics**:

- Implement expansion strategies
- Use tiered pricing to encourage upgrades
- Build usage-based pricing
- Proactive customer success

---

## Efficiency Metrics

### Gross Margin

**What it measures**: Revenue after direct costs

**Benchmarks**:

| Margin | Assessment                             |
| ------ | -------------------------------------- |
| <75%   | Warning (infrastructure too expensive) |
| 77%    | Median across SaaS                     |
| 75%+   | Target for pure SaaS                   |
| ~90%   | Best-in-class (Carrd, ShipFast)        |

**COGS includes**: Hosting, payment processing (2.9%), support, third-party APIs

---

### Profit Margin

**What it measures**: Revenue after all expenses

**Benchmarks**:

| Margin | Assessment            |
| ------ | --------------------- |
| <50%   | Business model issues |
| >70%   | Good                  |
| 80-85% | Healthy indie SaaS    |
| >90%   | Best-in-class         |

---

## Growth Metrics

### Month-over-Month Growth

**Benchmarks**:

| Stage           | MoM Growth | Assessment           |
| --------------- | ---------- | -------------------- |
| Early (0-6mo)   | 20-50%     | Hypergrowth expected |
| Growth (6-18mo) | 10-20%     | Healthy              |
| Mature (18+mo)  | 5-10%      | Sustainable          |
| Any stage       | <5%        | Warning - stagnation |

**Red flags**:

- ❌ Negative growth
- ❌ <5% for 3+ months
- ❌ Rapidly decelerating

---

### Viral Coefficient (K-factor)

**What it measures**: New customers each customer brings

**Benchmarks**:

| K-factor | Assessment                 |
| -------- | -------------------------- |
| <0.3     | Little viral effect        |
| 0.5-1.0  | Healthy organic growth     |
| >1.0     | Viral growth (exponential) |

**Formula**:

```
K-factor = % customers who refer × conversion rate of referrals
```

---

# Sample Analysis Output

**Input metrics**:

```
MRR: $7,500
Customers: 120
Monthly churn: 4.2%
CAC: $420
Gross margin: 82%
MoM growth: 8%
```

**Calculated**:

```
ARPU: $62.50
LTV: $1,232 (at 82% margin, 4.2% churn)
LTV:CAC: 2.9:1
CAC Payback: 8.2 months
```

**Health Score: 68/100 (Warning)**

**🔴 Red Flags**:

1. **Churn Critical (4.2%)** - 42% above healthy threshold
2. **LTV:CAC Below Viable (2.9:1)** - Minimum is 3:1, healthy is 4:1

**✅ Strengths**:

1. **Strong MoM Growth (8%)** - Above stagnation threshold
2. **Excellent Gross Margin (82%)** - Above 77% median
3. **Healthy ARPU ($62.50)** - In sweet spot range

**Recommended Actions** (priority order):

1. **IMMEDIATE**: Reduce churn with `customer-retention-optimizer`
2. **HIGH**: Improve LTV:CAC with `pricing-strategy-designer`
3. **MEDIUM**: Maintain growth with `community-growth-specialist`

---

# Common Mistakes

**Mistake 1: Ignoring Churn**

- **Problem**: Churn compounds - 5% monthly = 46% annually
- **Solution**: Target <3% monthly, measure weekly

**Mistake 2: Vanity Metrics**

- **Problem**: Tracking signups instead of revenue metrics
- **Solution**: Focus on MRR, churn, LTV:CAC

**Mistake 3: Outdated Benchmarks**

- **Problem**: Using 2010s benchmarks (3:1 LTV:CAC was fine then)
- **Solution**: Use current standards (4:1 LTV:CAC is new minimum)

**Mistake 4: Measuring Infrequently**

- **Problem**: Quarterly reviews miss trends
- **Solution**: Weekly metrics review, monthly deep analysis

---

## Next Steps

After running your metrics checkup:

1. **Address red flags first** - Focus on critical metrics
2. **Use related skills** - Deep-dive into problem areas
3. **Track monthly** - Re-run this analysis every month
4. **Celebrate strengths** - Don't fix what isn't broken

**Recommended skills by problem area**:

- Churn issues → `customer-retention-optimizer`
- Pricing issues → `pricing-strategy-designer`
- Acquisition issues → `community-growth-specialist`
- Operations issues → `solo-operations-manager`

---

## Sources

- [ChartMogul SaaS Benchmarks 2024](https://chartmogul.com/reports/saas-benchmarks/)
- [OpenView SaaS Metrics Report](https://openviewpartners.com/)
- [ProfitWell Retention Benchmarks](https://www.profitwell.com/)
