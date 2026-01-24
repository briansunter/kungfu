# Prioritization Frameworks: RICE and ICE Scoring

---

## Why Prioritization Frameworks Matter

**The solo founder problem**: Every decision falls entirely on you. No team
meetings to distribute weight, no product manager to choose features, no boss to
set priorities.

**What happens without frameworks**:

- Shiny object syndrome (chase new ideas constantly)
- Bias-driven decisions (build what you want, not what customers need)
- Overwhelm (everything feels urgent)
- Regret (waste time on wrong things)

**What frameworks provide**:

- Objectivity (numerical scores replace gut feelings)
- Clarity (easy comparison of options)
- Confidence (justification for choices)
- Speed (faster decisions with clear criteria)

---

## RICE Scoring Framework

### Formula

```
RICE Score = (Reach × Impact × Confidence) ÷ Effort
```

### Components

**Reach**: How many people will this impact in a given time period?

**Examples**:

- "Impact 1,000 customers per month" → Reach = 1000
- "Save 10 hours/week for 3 team members" → Reach = 3
- "Affects all future customers" → Reach = estimated monthly new customers

**Impact**: How much will this affect each person?

**Scale**:

- 3 = Massive impact (transformational)
- 2 = High impact (significant improvement)
- 1 = Medium impact (nice to have)
- 0.5 = Low impact (minor improvement)
- 0.25 = Minimal impact (barely noticeable)

**Confidence**: How sure are you about your estimates?

**Percentage**:

- 100% = Certain (data-backed, measured before)
- 80% = High (strong evidence, similar to past work)
- 50% = Medium (educated guess, some uncertainty)
- 20% = Low (wild guess, highly uncertain)

**Effort**: How much work will this require?

**Unit**: Person-months

- 1 month = 1 person working full-time for 1 month
- 0.5 months = 2 weeks
- 0.25 months = 1 week

### RICE Calculation Examples

**Example 1: New Dashboard Feature**

**Reach**: 1,000 customers will see this monthly **Impact**: 2 (High - saves
significant time) **Confidence**: 80% (0.8 - built similar features before)
**Effort**: 0.5 months (2 weeks)

```
RICE = (1000 × 2 × 0.8) ÷ 0.5
RICE = 1600 ÷ 0.5
RICE = 3200
```

**Example 2: Integration with Zapier**

**Reach**: 200 customers will use this (survey data) **Impact**: 1 (Medium -
convenient but not critical) **Confidence**: 50% (0.5 - never built Zapier
integration) **Effort**: 1 month (full-time for 4 weeks)

```
RICE = (200 × 1 × 0.5) ÷ 1
RICE = 100 ÷ 1
RICE = 100
```

**Decision**: Build dashboard first (RICE 3200 vs 100)

---

## ICE Scoring Framework

### Formula

```
ICE Score = (Impact + Confidence + Ease) ÷ 3
```

**Note**: "Ease" is the inverse of Effort (high ease = low effort)

### Components

**Impact**: (Same as RICE, simplified scale)

- 3 = Massive
- 2 = High
- 1 = Medium
- 0.5 = Low
- 0.25 = Minimal

**Confidence**: (Same as RICE, simplified scale)

- 3 = 100% (certain)
- 2 = 80% (high)
- 1 = 50% (medium)
- 0.5 = 20% (low)

**Ease**: How easy is this to implement?

- 3 = Very easy (hours to days)
- 2 = Easy (weeks)
- 1 = Medium (months)
- 0.5 = Hard (quarter+)
- 0.25 = Very hard (highly uncertain)

### ICE Calculation Examples

**Example 1: Email Template Update**

**Impact**: 1 (Medium - improves onboarding slightly) **Confidence**: 3 (100% -
done this before) **Ease**: 3 (Very easy - 2 hours work)

```
ICE = (1 + 3 + 3) ÷ 3
ICE = 7 ÷ 3
ICE = 2.33
```

**Example 2: Mobile App Development**

**Impact**: 3 (Massive - opens new market) **Confidence**: 1 (50% - never built
mobile app) **Ease**: 0.5 (Hard - 3+ months)

```
ICE = (3 + 1 + 0.5) ÷ 3
ICE = 4.5 ÷ 3
ICE = 1.5
```

**Decision**: Update email templates first (ICE 2.33 vs 1.5)

---

## Which Framework to Use?

### Use RICE When:

- You have data on reach (customers, users, traffic)
- Decisions are high-stakes (quarter roadmap)
- You need precision (major feature decisions)
- You have time for thorough analysis

### Use ICE When:

- You need quick decisions (weekly prioritization)
- Data is scarce (early stage, limited metrics)
- Comparing similar items (all small features)
- You want simpler scoring (faster calculations)

**Pro tip**: Use RICE for big decisions (quarterly), ICE for small decisions
(weekly).

---

## Spreadsheet Template

### RICE Tracker Template

| Feature    | Reach | Impact | Confidence | Effort | RICE Score | Priority |
| ---------- | ----- | ------ | ---------- | ------ | ---------- | -------- |
| Dashboard  | 1000  | 2      | 0.8        | 0.5    | 3200       | 1st      |
| Zapier     | 200   | 1      | 0.5        | 1      | 100        | 5th      |
| Onboarding | 500   | 3      | 0.7        | 0.25   | 4200       | 1st      |
| Export PDF | 150   | 1      | 0.9        | 0.1    | 1350       | 3rd      |

### ICE Tracker Template

| Task             | Impact | Confidence | Ease | ICE Score | Priority |
| ---------------- | ------ | ---------- | ---- | --------- | -------- |
| Email fix        | 1      | 3          | 3    | 2.33      | 1st      |
| Mobile app       | 3      | 1          | 0.5  | 1.5       | 5th      |
| New pricing      | 2      | 2          | 1    | 1.67      | 4th      |
| SEO landing page | 2      | 3          | 2    | 2.33      | 1st      |

---

## Common Prioritization Mistakes

### Mistake 1: Ignoring Framework Scores

**Problem**: Calculate RICE/ICE but override with gut feeling **Solution**:
Trust the framework, or don't use it. Override only with new data.

### Mistake 2: Gaming the Numbers

**Problem**: Inflate reach/impact to justify what you want to build
**Solution**: Be conservative with estimates. It's better to underestimate than
overestimate.

### Mistake 3: Not Updating Scores

**Problem**: Calculate once, never revisit as you learn more **Solution**:
Update scores quarterly or when new data emerges.

### Mistake 4: Analysis Paralysis

**Problem**: Spend more time prioritizing than building **Solution**: Quick ICE
for small decisions (15 minutes), thorough RICE for big ones (1 hour).

### Mistake 5: Ignoring Dependencies

**Problem**: Prioritize B before A when B depends on A **Solution**: Note
dependencies in tracker, prioritize dependencies first.

---

## Advanced: Combining with Strategy

### Strategic Alignment Filter

After scoring with RICE/ICE, apply strategic filter:

**Strategic questions**:

1. Does this align with 6-month goal?
2. Does this serve our ideal customer?
3. Does this differentiate us from competitors?
4. Is this within our core competency?

**If NO to any**: Deprioritize regardless of score.

**Example**:

- Zapier integration scores RICE 100 (relatively low)
- But: Strategic priority (customers demand it, competitors have it)
- Decision: Build it anyway (strategic alignment override)

### The "Must Do" Category

Some things don't need scoring:

- Legal/compliance requirements
- Security vulnerabilities
- Production bugs affecting users
- Payment processing issues

**Tag these as "Must Do"** and prioritize above scored items.

---

## Solo Founder Prioritization Workflow

### Weekly (ICE for Speed)

**Time**: 30 minutes **Input**: New feature requests, bugs, opportunities
**Process**:

1. List all items (10-20 items max)
2. Quick ICE scoring (use your gut for estimates)
3. Sort by score
4. Pick top 3 for the week
5. Say no to everything else

**Output**: This week's top 3 priorities

### Monthly (RICE for Quality)

**Time**: 2 hours **Input**: Feature backlog, customer feedback, strategic goals
**Process**:

1. List all items (20-50 items)
2. Thorough RICE scoring (use data when possible)
3. Sort by score
4. Apply strategic alignment filter
5. Pick top 10 for the month
6. Schedule into themed days

**Output**: Monthly roadmap

### Quarterly (Strategic Review)

**Time**: 4 hours **Input**: Last quarter's results, strategic goals, market
changes **Process**:

1. Review what worked/didn't work
2. Re-score all items with updated data
3. Identify strategic shifts
4. Set top 3 objectives for next quarter
5. Allocate themed days to objectives

**Output**: Quarterly strategy and roadmap

---

**Remember**: Frameworks reduce bias but don't eliminate judgment. Use them to
inform decisions, not replace thinking.

---

## Sources

- [RICE Prioritization Framework | Intercom](https://www.intercom.com/blog/rice-prioritization/)
- [ICE Scoring Model | Product Management resources](https://www.productboard.com/guides/ice-scoring/) (Multiple industry-standard sources)
