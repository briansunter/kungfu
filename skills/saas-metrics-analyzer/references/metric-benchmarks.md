# Detailed Metric Benchmarks

Comprehensive benchmark tables and formulas for all SaaS metrics.

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

- Negative growth
- <5% for 3+ months
- Rapidly decelerating

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
K-factor = % customers who refer x conversion rate of referrals
```

---

## Sample Analysis Output

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

**Red Flags**:

1. **Churn Critical (4.2%)** - 42% above healthy threshold
2. **LTV:CAC Below Viable (2.9:1)** - Minimum is 3:1, healthy is 4:1

**Strengths**:

1. **Strong MoM Growth (8%)** - Above stagnation threshold
2. **Excellent Gross Margin (82%)** - Above 77% median
3. **Healthy ARPU ($62.50)** - In sweet spot range

**Recommended Actions** (priority order):

1. **IMMEDIATE**: Reduce churn with `customer-retention-optimizer`
2. **HIGH**: Improve LTV:CAC with `pricing-strategy-designer`
3. **MEDIUM**: Maintain growth with `community-growth-specialist`
