# Validation Framework

How to validate discovered business ideas before investing time and money.

## Overview

Validation answers: **Is this a real opportunity worth pursuing?**

Most startups fail because they build something nobody wants. Validation
de-risks by proving demand before building.

## 5-Step Validation Process

### Step 1: Competitor Analysis

**Goal**: Understand the landscape and differentiation opportunities.

**Search for competitors**:

- `[problem description] tool`
- `[niche] software`
- `[task] app`
- `alternative to [known competitor]`

**Assess competitor density**:

| Count    | Assessment  | Strategy                                   |
| -------- | ----------- | ------------------------------------------ |
| **0-2**  | Green field | First-mover advantage, but validate demand |
| **3-5**  | Competitive | Find differentiation angle                 |
| **6-10** | Crowded     | Must have clear USP, specific niche        |
| **10+**  | Saturated   | Avoid unless clear gap identified          |

**For each competitor, analyze**:

1. **Pricing**: What do they charge? (Free, freemium, $X/month)
2. **Features**: What do they offer? What's missing?
3. **Reviews**: What do users love? What do they hate?
4. **Target customer**: Who are they serving? (SMB, enterprise, consumers)
5. **Differentiation**: What makes them unique?
6. **Weaknesses**: Where are they vulnerable?

**Differentiation strategies**:

- **Simpler**: Competitors are over-complicated, you're streamlined
- **Niche focus**: Competitors are broad, you specialize in [specific use case]
- **Better UX**: Competitors are clunky, you're intuitive
- **Pricing**: Competitors are expensive, you're affordable
- **Integration**: Competitors don't integrate with [popular tool]
- **Platform**: Competitors are web-only, you're mobile-first
- **Speed**: Competitors are slow, you're real-time

**Green flags**:

- Competitors are profitable (proves market exists)
- Competitors have bad reviews (opportunity to be better)
- Competitors are expensive (pricing opportunity)
- Competitors haven't updated in years (abandoned market)

**Red flags**:

- Competitors are well-funded, moving fast
- Competitors have strong reviews, low churn
- Competitors are free and hard to undercut
- Competitors are dominant with network effects

### Step 2: Market Sizing

**Goal**: Verify market is large enough to sustain business.

**Quick indicators (free)**:

1. **Google Trends**: Search interest over time
   - Query: `[problem]`, `[niche] software`, `[task] tool`
   - Look: Upward trend, stable demand, or declining?
   - Compare: `[competitor]` vs `[alternative]`

2. **Community size**:
   - Subreddit members: r/[niche]
   - Facebook groups: `[niche] professionals`
   - LinkedIn groups: `[industry] leaders`
   - Estimate: 1-5% of community will pay

3. **Search volume** (estimate via Google Ads):
   - Keyword planner: `[tool]`, `[problem] solution`
   - 1K+ monthly searches = decent demand
   - 10K+ monthly searches = large market

4. **Competitor clues**:
   - "Used by 10,000+ businesses"
   - "$1M ARR" (divide by ACV for customer count)
   - Team size, hiring posts (indicates growth)

**Paid tools** (optional, for deeper analysis):

- **Ahrefs/SEMrush**: Search volume, keyword difficulty
- **SimilarWeb**: Competitor traffic estimates
- **LinkedIn Sales Navigator**: Target customer count
- **G2/Capterra**: Category size, competitor reviews

**Market size framework**:

| Market Size  | Assessment | Micro-SaaS Potential |
| ------------ | ---------- | -------------------- |
| **<1,000**   | Tiny       | Too small, skip      |
| **1K-10K**   | Small      | Niche micro-SaaS     |
| **10K-100K** | Medium     | Good opportunity     |
| **100K-1M**  | Large      | Strong potential     |
| **1M+**      | Massive    | Competitive but big  |

**Rough calculation**:

```
Potential customers = Community size × 0.01 (1% conversion)
TAM (Total Addressable Market) = Customers × Annual contract value
```

Example:

- r/SaaS: 200K members → 2K potential customers (1%)
- Pricing: $50/month → $600/year
- TAM: 2,000 × $600 = $1.2M/year (healthy for solo founder)

**Green flags**:

- Growing market (Google Trends upward)
- Large community (10K+ potential customers)
- Competitors are profitable
- Multiple competitors (proves market exists)

**Red flags**:

- Declining search interest (shrinking market)
- Tiny community (<1K potential customers)
- No competitors (may indicate no demand)
- Competitors struggling to monetize

### Step 3: Willingness to Pay Signals

**Goal**: Confirm people will pay, not just complain.

**Look for these signals**:

**Explicit mentions** (strongest):

- "I'd pay for [solution]"
- "Would pay $X/month for..."
- "Any tool that does this, I'm in"
- "Budget is $X for [tool]"

**Implied B2B budget**:

- "Currently paying $X for [competitor]"
- "Looking for cheaper alternative to [expensive tool]"
- "[Tool] is worth $X to me"
- Business problems (time savings, efficiency)

**Quantified value**:

- "Saves me 5 hours/week"
- "Would pay $100 to avoid this headache"
- "Currently hiring freelancer for $X/month to do this"
- "Lost $X due to [problem]"

**Pricing anchors**:

- Competitor pricing: Floor and ceiling
- "I'd pay $50 but not $200"
- "At $10/month, I'd sign up today"
- "Enterprise budget is $X/year"

**Willingness to pay indicators**:

| Signal Strength            | Indicator                                 | Examples                         |
| -------------------------- | ----------------------------------------- | -------------------------------- |
| ⭐⭐⭐⭐⭐ **Very Strong** | Explicit "I'd pay $X" with amount         | "Would pay $50/month for this"   |
| ⭐⭐⭐⭐ **Strong**        | Explicit "I'd pay" without amount         | "I'd pay for this solution"      |
| ⭐⭐⭐ **Moderate**        | B2B context (business value implied)      | Marketing agencies need this     |
| ⭐⭐ **Weak**              | Personal frustration, no business context | "I hate doing my taxes manually" |
| ⭐ **Very Weak**           | Vague wish, no urgency                    | "Someone should build a tax app" |

**Validation tiers**:

1. **Tier 1 (Strong)**: 10+ explicit "would pay for" mentions with pricing
2. **Tier 2 (Moderate)**: 5+ explicit mentions or B2B context
3. **Tier 3 (Weak)**: Few mentions, consumer context

**Prioritize**: Tier 1 opportunities first.

**Pricing strategy**:

- **Below competitors**: 20-30% cheaper to win customers
- **Value-based**: Charge based on ROI (10% of value created)
- **Freemium**: Free tier to acquire, paid to upgrade
- **Tiered**: Good/Better/Best at $29/$79/$199 per month

**Green flags**:

- Multiple "would pay for" mentions with pricing
- B2B context (higher willingness to pay)
- Competitors charging $50+/month
- Clear ROI (time savings, revenue increase)

**Red flags**:

- No "would pay" mentions (only complaints)
- Consumer context (low willingness to pay)
- Competitors are free or very cheap
- Problem seems minor inconvenience

### Step 4: Technical Feasibility

**Goal**: Ensure you can actually build this as a solo founder.

**Assess complexity**:

**Solo-founder friendly** (1-3 months MVP):

- CRUD apps with standard features
- Workflow automation
- Dashboards and reporting
- Integrations (API wrappers)
- Simple marketplaces (no network effects)

**Small team needed** (3-6 months):

- Complex integrations (multiple systems)
- Real-time features (WebSockets, live sync)
- Advanced UI/UX (custom interactions)
- Mobile apps (iOS + Android)
- Payment processing, subscriptions

**Large team needed** (6+ months) → **avoid**:

- AI/ML from scratch
- Blockchain infrastructure
- Hard technical problems (video compression, 3D rendering)
- High-scale infrastructure (millions of users)
- Regulatory compliance (HIPAA, SOC2, fintech)

**Complexity checklist**:

- [ ] Can you build core feature in <3 months?
- [ ] Can you build it with standard frameworks (no R&D)?
- [ ] Can you launch MVP with <10 features?
- [ ] Can you handle infrastructure solo (AWS, Vercel, etc.)?
- [ ] Can you handle customer support solo?
- [ ] Can you fund development yourself (<$10K)?

**If 3+ "No"**: Too complex for solo founder. Deprioritize.

**Tech stack considerations**:

- **Web apps**: Next.js, Supabase, Vercel (fast, solo-friendly)
- **Mobile**: React Native, Flutter (cross-platform)
- **Integrations**: APIs, webhooks, Zapier
- **Payments**: Stripe, LemonSqueezy (easy setup)
- **Auth**: Clerk, Auth0, Supabase Auth

**Green flags**:

- Simple CRUD + 1-2 unique features
- Existing APIs to leverage (OpenAI, Stripe, etc.)
- Can launch MVP in <3 months
- No regulatory hurdles
- Can be run solo (support, dev, marketing)

**Red flags**:

- Requires R&D or novel technology
- Needs mobile app (iOS + Android = 2x work)
- Regulatory compliance (healthcare, fintech)
- Hard technical problems (performance, scale)
- Network effects (marketplaces, social platforms)

### Step 5: Decision Matrix

**Score each opportunity** (1-10) across criteria:

| Criteria               | Weight | Scoring (1-10)                                       |
| ---------------------- | ------ | ---------------------------------------------------- |
| **Market Size**        | 2x     | 10K+ customers (10), 1K-10K (7), <1K (3)             |
| **Competition**        | 2x     | 0-2 competitors (10), 3-5 (7), 6+ (3)                |
| **Willingness to Pay** | 3x     | Explicit pricing (10), B2B implied (7), none (3)     |
| **Engagement**         | 2x     | 50+ upvotes (10), 20-49 (7), <20 (3)                 |
| **Recency**            | 1x     | Last 7 days (10), 30 days (7), 90+ (3)               |
| **Feasibility**        | 2x     | Solo-buildable (10), small team (5), team needed (1) |

**Calculate weighted score**:

```
Total = (Market × 2) + (Competition × 2) + (WTP × 3) + (Engagement × 2) + (Recency × 1) + (Feasibility × 2)

Max score: 130
```

**Decision thresholds**:

| Score Range | Decision            | Next Steps                          |
| ----------- | ------------------- | ----------------------------------- |
| **100+**    | **Pursue now**      | Start MVP, customer development     |
| **80-99**   | **Strong consider** | Deep validation, talk to customers  |
| **60-79**   | **Maybe**           | Keep as backup, monitor for signals |
| **<60**     | **Skip**            | Not worth pursuing currently        |

## Validation Checklist

Before committing to build, ensure:

- [ ] **Problem validated**: 50+ people expressed this problem (across
      platforms)
- [ ] **Recency validated**: Mentioned in last 30 days
- [ ] **Market sized**: 1K+ potential customers
- [ ] **Competitors analyzed**: Clear differentiation identified
- [ ] **Willingness to pay**: Explicit "would pay for" or B2B context
- [ ] **Feasible**: Solo-buildable in <3 months
- [ ] **Monetizable**: Clear path to $1K+ MRR

**If 5+ checked**: Strong validation, proceed to MVP.

**If 3-4 checked**: Moderate validation, do more customer interviews.

**If <3 checked**: Weak validation, skip or reconsider.

## Customer Development Interviews

After initial validation, talk to 10-20 potential customers.

**Goal**: Confirm problem is real, urgent, and worth paying for.

**Interview questions**:

1. **Problem exploration**:
   - "Tell me about how you currently [handle task]?"
   - "What's frustrating about your current process?"
   - "How much time do you spend on [task]?"
   - "What happens when [problem] occurs?"

2. **Solution validation**:
   - "If there was a tool that [solved problem], what would it look like?"
   - "What features would it need to have?"
   - "How would this fit into your current workflow?"

3. **Willingness to pay**:
   - "How much would this be worth to you monthly?"
   - "What's your budget for [type of tool]?"
   - "Would you pay $X/month for this?"

4. **Buying process**:
   - "Who would make the decision to buy this?"
   - "How do you typically purchase tools like this?"
   - "What would convince you to switch from [current tool]?"

**Green flags from interviews**:

- 7+/10 say problem is urgent
- 7+/10 say they'd pay your target price
- 5+/10 say they'd buy in next 30 days
- Clear buying process identified
- Can articulate specific use case

**Red flags**:

- "Nice to have" but not urgent
- "Would use if free" but won't pay
- "My company would never pay for this"
- Can't describe specific use case
- Current solution is "good enough"

## Next Steps After Validation

**If validated** (6+ checklist items, strong customer interviews):

1. **MVP scoping**: Define minimal feature set (3-5 features)
2. **Pre-launch**: Landing page to collect emails (validate demand)
3. **Build**: 1-3 month MVP development
4. **Beta**: Release to 10-20 early customers
5. **Launch**: Product Hunt, IndieHackers, Reddit
6. **Iterate**: Based on feedback

**If weakly validated** (3-5 checklist items):

1. **More interviews**: Talk to 20 more potential customers
2. **Pre-sell**: Try to get pre-orders or LOIs (letters of intent)
3. **Wait and monitor**: Track for more signals over 30 days
4. **Pivot**: Adjust idea based on feedback

**If not validated** (<3 checklist items):

1. **Skip**: Move to next opportunity
2. **Archive**: Keep notes, may improve later
3. **Don't build**: Not worth the time/risk

## Common Mistakes

**Mistake 1: Validating with friends/family**

- **Problem**: They'll say it's great to be nice
- **Solution**: Only validate with target customers who have the problem

**Mistake 2: Falling in love with the solution**

- **Problem**: Ignoring red flags because you're excited
- **Solution**: Be objective, use the scoring framework

**Mistake 3: Building without validation**

- **Problem**: "I'll just build it and see if people want it"
- **Solution**: Validate first, build second

**Mistake 4: Ignoring competition**

- **Problem**: "I'm first to market!" (usually means no market)
- **Solution**: Competition proves market exists, find differentiation

**Mistake 5: Over-building**

- **Problem**: Building 10 features when 3 will do
- **Solution**: Launch MVP with 3-5 core features, iterate based on feedback

**Mistake 6: Ignoring feasibility**

- **Problem**: Validating ideas you can't actually build
- **Solution**: Filter for solo-founder feasibility from the start

## Sources

- [How to Get Startup Ideas | Paul Graham](https://paulgraham.com/startupideas.html)
- [Do Things that Don't Scale | Paul Graham](https://paulgraham.com/ds.html)
- [Market Research and Competitive Analysis | U.S. SBA](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis)
- [Google Trends](https://trends.google.com/trends/)
- [Reddit Content Policy](https://www.redditinc.com/policies/content-policy)
- [Hacker News Guidelines](https://news.ycombinator.com/newsguidelines.html)
