---
name: SaaS Metrics Checkup
description:
  Analyze business health across all critical SaaS metrics (MRR, ARR, churn,
  LTV:CAC, NRR, ARPU, growth rate). Benchmarks against industry standards and
  identifies areas needing attention. Use this command for monthly business
  reviews, performance tracking, or health checks.
---

# SaaS Metrics Checkup

This command analyzes your SaaS business health across all critical metrics,
benchmarked against industry standards for indie and solo SaaS companies.

## What This Does

Performs a comprehensive health check including:

- **Revenue metrics**: MRR, ARR, ARPU, growth rates
- **Unit economics**: LTV, CAC, LTV:CAC ratio, payback period
- **Retention metrics**: Monthly/annual churn, NRR (Net Revenue Retention)
- **Efficiency metrics**: Gross margin, profit margins
- **Growth metrics**: MoM growth, viral coefficient
- **Operational health**: Customer count, activation rate

Each metric is benchmarked against:

- Industry standards (all SaaS companies)
- Indie/Solo SaaS benchmarks (your peer group)
- Best-in-class companies (top performers)

## Using This Command

Provide your current business metrics, and this command will:

1. **Calculate missing metrics** (if you provide partial data)
2. **Benchmark against standards** (compare to healthy ranges)
3. **Identify red flags** (metrics needing immediate attention)
4. **Highlight strengths** (what you're doing well)
5. **Suggest improvements** (actionable recommendations)
6. **Track progress over time** (compare to previous checkups)

**Input: Provide any of the following:**

- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Customer count
- Average Revenue Per User (ARPU)
- Monthly churn rate
- Annual churn rate
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- Net Revenue Retention (NRR)
- Gross margin
- Month-over-month growth rate

**Output: Comprehensive analysis including:**

- Overall business health score
- Detailed breakdown by metric category
- Red flags requiring immediate attention
- Strengths to leverage
- Actionable improvement recommendations
- Related skills for deep dives

---

## Metric Categories and Benchmarks

### 1. Revenue Metrics

#### Monthly Recurring Revenue (MRR)

**What it measures**: Predictable monthly revenue from subscriptions

**Benchmarks**:

- **Early stage (0-6 months)**: $1K-$3K MRR
- **Growth stage (6-18 months)**: $5K-$10K MRR
- **Sustainable**: $10K+ MRR
- **Successful indie SaaS**: $15K MRR (median)
- **Top performers**: $30K-$100K+ MRR

**Formula**:

```
MRR = Σ (Monthly revenue from all subscription customers)
```

**Red flags**:

- ❌ Below $1K MRR after 6 months (product-market fit issues)
- ❌ Stuck at $3K-$5K MRR for 3+ months (growth plateau)
- ❌ Declining MRR for 2+ consecutive months (churn > acquisition)

**Strengths**:

- ✅ Reaching $10K MRR in <18 months (excellent growth)
- ✅ Consistent month-over-month growth

**Related skills**: `customer-retention-optimizer`,
`community-growth-specialist`

---

#### Annual Recurring Revenue (ARR)

**What it measures**: Predictable annual revenue from subscriptions

**Benchmarks**:

- **Ready to hire**: $100K ARR minimum
- **Healthy indie SaaS**: $120K-$500K ARR
- **Successful**: $500K-$1M ARR
- **Top performers**: $1M+ ARR

**Formula**:

```
ARR = MRR × 12
```

**Red flags**:

- ❌ Below $50K ARR after 18 months (slow progress)
- ❌ Considering hiring below $100K ARR (too soon)

**Strengths**:

- ✅ $100K ARR reached (ready to scale if processes systemized)
- ✅ $500K+ ARR as solo founder (exceptional performance)

**Related skills**: `systemization-documentation-expert`

---

#### Average Revenue Per User (ARPU)

**What it measures**: Average monthly revenue per customer

**Benchmarks**:

- **Underpriced**: <$29/month (attracts bargain hunters)
- **Healthy**: $49-$299/month (sweet spot for indie SaaS)
- **High-ticket**: $300-$5,000/month (enterprise/small business focus)

**Formula**:

```
ARPU = MRR ÷ Total customers
```

**Red flags**:

- ❌ ARPU <$29 and high churn (wrong customers)
- ❌ ARPU declining over time (pricing issues)

**Strengths**:

- ✅ ARPU $100+/month (strong pricing power)
- ✅ ARPU increasing over time (pricing optimization working)

**Improvement recommendations**:

- Introduce tiered pricing ($29/$99/$199)
- Add annual payment discounts
- Implement usage-based pricing for power users
- Raise prices on new customers first

**Related skills**: `pricing-strategy-designer`

---

### 2. Unit Economics Metrics

#### Customer Acquisition Cost (CAC)

**What it measures**: Cost to acquire one new customer

**Benchmarks**:

- **Target (2026)**: $350 or less for SMB-focused SaaS
- **Excellent**: <$200 (viral/community-led growth)
- **Acceptable**: $200-$500
- **Expensive**: $500-$1,000 (need high LTV to justify)
- **Danger zone**: >$1,000 for SMB SaaS

**Formula**:

```
CAC = (Sales + Marketing costs) ÷ New customers acquired
```

**Red flags**:

- ❌ CAC >$500 and ARPU <$50 (poor unit economics)
- ❌ CAC rising over time (acquisition getting harder)
- ❌ CAC >LTV × 0.33 (violates 3:1 LTV:CAC rule)

**Strengths**:

- ✅ CAC <$200 (efficient acquisition)
- ✅ CAC declining over time (improving efficiency)

**Improvement recommendations**:

- Focus on community-led growth (Indie Hackers, Reddit)
- Implement product-led growth (viral loops, referrals)
- Optimize onboarding to increase conversion
- Build SEO/content for organic traffic

**Related skills**: `community-growth-specialist`

---

#### Customer Lifetime Value (LTV)

**What it measures**: Total revenue from average customer

**Benchmarks**:

- **Minimum viable**: 3× CAC (LTV:CAC ratio)
- **Healthy**: 4× CAC (new 2026 standard)
- **Excellent**: 5× CAC or higher

**Formula**:

```
LTV = (ARPU × Gross Margin %) ÷ Monthly churn rate
```

**Example**: $100 ARPU, 90% margin, 5% monthly churn

```
LTV = ($100 × 0.90) ÷ 0.05 = $1,800
```

**Red flags**:

- ❌ LTV:CAC <3:1 (losing money on customers)
- ❌ LTV <$500 (customers not valuable enough)
- ❌ LTV declining over time (retention worsening)

**Strengths**:

- ✅ LTV:CAC >4:1 (healthy unit economics)
- ✅ LTV increasing over time (retention improving)

**Improvement recommendations**:

- Reduce churn (biggest lever for LTV)
- Increase ARPU through tiered pricing
- Improve onboarding to increase lifetime
- Add expansion revenue (upsells, upgrades)

**Related skills**: `customer-retention-optimizer`, `pricing-strategy-designer`

---

#### LTV:CAC Ratio

**What it measures**: Unit economics health (return on acquisition spend)

**Benchmarks**:

- **Minimum viable**: 3:1 (at least breaking even)
- **Healthy**: 4:1 (new 2026 standard, not old 3:1)
- **Excellent**: 5:1 or higher
- **Too high**: >7:1 (may indicate under-investing in growth)

**Industry benchmarks by sector**:

- Adtech: 7:1
- Business Services: 3:1
- SaaS median: 4:1

**Formula**:

```
LTV:CAC = LTV ÷ CAC
```

**Red flags**:

- ❌ LTV:CAC <3:1 (losing money on every customer)
- ❌ LTV:CAC declining (unit economics worsening)
- ❌ CAC payback >18 months (too slow for SMBs)

**Strengths**:

- ✅ LTV:CAC >4:1 (healthy, sustainable growth)
- ✅ LTV:CAC improving over time (unit economics getting better)

**Improvement recommendations**:

- Increase LTV (reduce churn, raise prices)
- Decrease CAC (community-led, product-led growth)
- Focus on high-value customer segments
- Improve customer success to increase lifetime

**Related skills**: `customer-retention-optimizer`,
`community-growth-specialist`

---

#### CAC Payback Period

**What it measures**: Months to recover acquisition cost

**Benchmarks**:

- **Early-stage**: 8-12 months (acceptable)
- **Mid-stage ($25M-$50M ARR)**: 15-18 months
- **Excellent (2026)**: 12-15 months
- **Danger zone**: >18 months for SMB SaaS

**Formula**:

```
CAC Payback = CAC ÷ (ARPU × Gross Margin %)
```

**Example**: $350 CAC, $100 ARPU, 90% margin

```
Payback = $350 ÷ ($100 × 0.90) = 3.9 months
```

**Red flags**:

- ❌ Payback >18 months (too slow for most SMBs)
- ❌ Payback increasing over time (worsening unit economics)

**Strengths**:

- ✅ Payback <12 months (excellent unit economics)
- ✅ Payback <6 months (very healthy, can scale aggressively)

**Related skills**: `pricing-strategy-designer`

---

### 3. Retention Metrics

#### Monthly Churn Rate

**What it measures**: Percentage of customers canceling each month

**Benchmarks**:

- **Excellent**: <1% monthly (~5% annually)
- **Healthy**: 1-3% monthly (~5-15% annually)
- **Average B2B SaaS**: 2.9% monthly (~3.5% annually)
- **Warning zone**: 3-5% monthly (~15-25% annually)
- **Danger zone**: >5% monthly (~>25% annually)

**Formula**:

```
Monthly Churn = (Customers lost ÷ Total customers) × 100
```

**Red flags**:

- ❌ Monthly churn >5% (unsustainable business)
- ❌ Churn increasing over time (product or market issues)
- ❌ Early customers churning fast (onboarding problem)

**Strengths**:

- ✅ Monthly churn <1% (world-class retention)
- ✅ Churn declining over time (product-market fit improving)

**Improvement recommendations**:

- Improve onboarding (reduce early churn)
- Implement customer success (proactive support)
- Build in-product stickiness (data, integrations)
- Identify and address churn reasons via exit surveys

**Related skills**: `customer-retention-optimizer`

---

#### Annual Churn Rate

**What it measures**: Percentage of customers canceling each year

**Benchmarks**:

- **Best-in-class**: <3% annually
- **Healthy B2B**: 3-5% annually
- **Average B2B SaaS**: 3.5-4.9% annually
- **Average B2C**: 6.5-8% annually
- **Warning zone**: >10% annually

**Formula**:

```
Annual Churn = (1 - (1 - Monthly churn)^12) × 100
```

**Example**: 2% monthly churn

```
Annual churn = (1 - (1 - 0.02)^12) × 100 = 21.6%
```

**Red flags**:

- ❌ Annual churn >10% (hard to grow)
- ❌ Annual churn >20% (business shrinking)

**Strengths**:

- ✅ Annual churn <5% (very healthy)
- ✅ Annual churn <3% (best-in-class)

---

#### Net Revenue Retention (NRR)

**What it measures**: Revenue retention including expansion revenue (upsells,
upgrades)

**Benchmarks**:

- **Best-in-class**: 120-130% NRR
- **Healthy**: >100% NRR (growing without new sales)
- **Median**: 106% NRR
- **Warning zone**: <100% NRR (contraction)

**Formula**:

```
NRR = ((Starting MRR + Expansion - Churn - Downgrades) ÷ Starting MRR) × 100
```

**Example**: $10K starting MRR, $500 expansion, $200 churn, $100 downgrades

```
NRR = (($10,000 + $500 - $200 - $100) ÷ $10,000) × 100 = 102%
```

**Red flags**:

- ❌ NRR <100% (shrinking existing customer base)
- ❌ NRR declining (retention or expansion worsening)

**Strengths**:

- ✅ NRR >110% (expansion outpaces churn)
- ✅ NRR >120% (world-class retention and expansion)

**Improvement recommendations**:

- Implement expansion revenue strategies (upsells, add-ons)
- Use tiered pricing to encourage upgrades
- Build usage-based pricing (grow with customers)
- Proactive customer success to identify upsell opportunities

**Related skills**: `customer-retention-optimizer`, `pricing-strategy-designer`

---

### 4. Efficiency Metrics

#### Gross Margin

**What it measures**: Revenue after direct costs (hosting, payment fees,
support)

**Benchmarks**:

- **Best-in-class**: ~90% (Carrd at 90%, ShipFast at 92%)
- **Target**: 75% or higher for pure SaaS
- **Median**: 77% across all SaaS
- **Warning zone**: <75% (infrastructure too expensive or services-heavy)

**Formula**:

```
Gross Margin = ((Revenue - COGS) ÷ Revenue) × 100
```

**COGS includes**: Hosting, payment processing (Stripe 2.9%), customer support,
third-party APIs

**Red flags**:

- ❌ Gross margin <75% (infrastructure or services issues)
- ❌ Margin declining over time (cost control needed)

**Strengths**:

- ✅ Gross margin >85% (excellent for indie SaaS)
- ✅ Gross margin >90% (best-in-class efficiency)

**Improvement recommendations**:

- Optimize infrastructure costs (cheaper hosting, CDN)
- Reduce third-party API usage or negotiate better rates
- Automate support to reduce headcount costs
- Reduce professional services (focus on product-only revenue)

**Related skills**: `technical-automation-architect`

---

#### Profit Margin

**What it measures**: Revenue after all expenses (including your time)

**Benchmarks**:

- **Best-in-class**: 80%+ (Carrd at 90%, ShipFast at 92%)
- **Healthy indie SaaS**: 80-85% profit margins
- **Good**: >70% profit margins
- **Warning zone**: <50% (too much overhead or low pricing)

**Formula**:

```
Profit Margin = ((Revenue - All expenses) ÷ Revenue) × 100
```

**Red flags**:

- ❌ Profit margin <50% (business model issues)
- ❌ Margin declining (cost control needed)

**Strengths**:

- ✅ Profit margin >80% (excellent for solo founder)
- ✅ Profit margin increasing (scaling efficiently)

**Related skills**: `solo-operations-manager`

---

### 5. Growth Metrics

#### Month-over-Month Growth

**What it measures**: Monthly revenue growth rate

**Benchmarks**:

- **Early stage (0-6 months)**: 20-50% MoM (hypergrowth expected)
- **Growth stage (6-18 months)**: 10-20% MoM (healthy growth)
- **Mature (18+ months)**: 5-10% MoM (sustainable growth)
- **Warning zone**: <5% MoM (stagnation)

**Formula**:

```
MoM Growth = ((Current MRR - Previous MRR) ÷ Previous MRR) × 100
```

**Red flags**:

- ❌ Negative MoM growth (shrinking business)
- ❌ Growth <5% for 3+ months (stuck in plateau)
- ❌ Growth decelerating rapidly (market saturation or competition)

**Strengths**:

- ✅ Consistent >10% MoM growth (healthy trajectory)
- ✅ Accelerating growth (product-market fit improving)

**Improvement recommendations**:

- Double down on acquisition channels working best
- Improve activation and onboarding (more signups → customers)
- Reduce churn (retention = growth)
- Introduce referral program (viral growth)

**Related skills**: `community-growth-specialist`,
`customer-retention-optimizer`

---

#### Viral Coefficient (K-factor)

**What it measures**: How many new customers each customer brings

**Benchmarks**:

- **Viral growth**: K-factor >1.0 (exponential growth)
- **Healthy**: K-factor 0.5-1.0 (meaningful organic growth)
- **Weak**: K-factor <0.3 (little viral effect)

**Formula**:

```
K-factor = (Invitations sent × Conversion rate) × (Customers inviting ÷ Total customers)
```

**Simplified**:

```
K-factor = % of customers who refer × conversion rate of referrals
```

**Example**: 30% of customers refer, 20% of referrals convert

```
K-factor = 0.30 × 0.20 = 0.06 (weak viral effect)
```

**Red flags**:

- ❌ K-factor <0.1 (no viral growth)

**Strengths**:

- ✅ K-factor >0.5 (significant organic growth)
- ✅ K-factor >1.0 (viral growth engine)

**Improvement recommendations**:

- Build referral incentives (discounts, free months)
- Add "made with [product]" footers (free marketing)
- Implement sharing features (invite team members)
- Create affiliate programs (commission for referrals)

**Related skills**: `community-growth-specialist`

---

## Business Health Score

### Overall Health Calculation

Your overall business health is calculated across 5 categories:

1. **Revenue Health** (25%): MRR, ARR, ARPU
2. **Unit Economics** (25%): LTV:CAC, CAC payback
3. **Retention Health** (25%): Churn rate, NRR
4. **Efficiency** (15%): Gross margin, profit margin
5. **Growth** (10%): MoM growth, viral coefficient

**Scoring**:

- **Excellent (90-100)**: Best-in-class across most metrics
- **Healthy (70-89)**: Solid business, room for optimization
- **Warning (50-69)**: Some red flags, needs attention
- **Critical (<50)**: Major issues, immediate action required

---

## Sample Checkup Output Example

**Input Example**:

```
MRR: $7,500
Customers: 120
Monthly churn: 4.2%
CAC: $420
ARPU: $62.50
Gross margin: 82%
MoM growth: 8%
```

**Generated Analysis**:

### Overall Health Score: 68/100 (Warning)

#### 🔴 Red Flags (Immediate Attention)

**1. Churn Rate Critical (4.2% monthly)**

- Industry benchmark: <3% monthly
- Your churn: 42% higher than healthy threshold
- Impact: Losing ~5 customers/month (~$312 MRR)
- Recommendation: Use `customer-retention-optimizer` skill immediately

**2. LTV:CAC Ratio Below Viable (2.1:1)**

- Calculated LTV: $892 (based on current ARPU and churn)
- Your CAC: $420
- Industry benchmark: Minimum 3:1, healthy 4:1
- Impact: Losing ~$158 per customer on average
- Recommendation: Reduce churn (biggest lever) or raise prices

#### 🟡 Strengths to Leverage

**1. Strong MoM Growth (8%)**

- Healthy growth rate for 12-month-old business
- Above 5% stagnation threshold
- Keep momentum while fixing churn

**2. Excellent Gross Margin (82%)**

- Above 77% industry median
- Approaching best-in-class 90%
- Infrastructure and operations efficient

**3. Healthy ARPU ($62.50)**

- Above $29 minimum threshold
- Good pricing power in market
- Room for tiered pricing expansion

#### 📊 Detailed Metrics Breakdown

| Metric        | Your Value | Benchmark            | Status          |
| ------------- | ---------- | -------------------- | --------------- |
| MRR           | $7,500     | $10K target          | 🟡 Below target |
| ARPU          | $62.50     | $49-299              | ✅ Healthy      |
| Monthly Churn | 4.2%       | <3%                  | 🔴 Critical     |
| LTV:CAC       | 2.1:1      | 3:1 min, 4:1 healthy | 🔴 Below viable |
| Gross Margin  | 82%        | 77% median           | ✅ Strong       |
| MoM Growth    | 8%         | 5-10%                | ✅ Healthy      |

#### 🎯 Recommended Actions (Priority Order)

**1. IMMEDIATE: Reduce Churn (Use `customer-retention-optimizer`)**

- Implement Day 3/7/14/30 check-in emails
- Improve onboarding to reduce early cancellations
- Set up health scoring to identify at-risk customers
- Target: Get below 3% monthly churn

**2. HIGH: Improve LTV:CAC (Use `pricing-strategy-designer`)**

- Current ARPU $62.50 → Target $100+ via tiered pricing
- Add annual payment discounts (increase upfront cash)
- Introduce enterprise tier for high-value customers

**3. MEDIUM: Maintain Growth (Use `community-growth-specialist`)**

- Current 8% MoM growth is healthy, maintain momentum
- Double down on acquisition channels working best
- Launch referral program to leverage existing customers

**4. LOW: Optimize Operations (Use `solo-operations-manager`)**

- 82% gross margin is good, aim for 90%
- Review infrastructure costs for optimization opportunities

---

## Research Sources

This metrics framework synthesizes findings from comprehensive indie SaaS
research:

**Primary Benchmarks**:

- Report 1: Business Economics & Pricing (all metrics sections)
- Industry standards from 54 sources
- Real-world case studies with concrete numbers
- 2026 updated benchmarks (not outdated 2010s data)

**Key Metrics Covered**:

- LTV:CAC ratios (3:1 minimum, 4:1 healthy, 5:1 excellent)
- Churn benchmarks (<1% monthly excellent, 3.5% B2B average)
- NRR targets (>100% healthy, 120%+ best-in-class)
- Gross margins (75% minimum, 90% best-in-class)
- Indie SaaS profit margins (80-85% median)

---

## Next Steps

After your metrics checkup:

1. **Address red flags first**: Focus on critical metrics
2. **Use related skills**: Deep-dive into areas needing improvement
3. **Track monthly**: Re-run this checkup every month
4. **Celebrate strengths**: Don't fix what isn't broken

**Monthly review rhythm**: Use `solo-operations-manager` for consistent
operational reviews
