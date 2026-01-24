# Customer Health Scores and Early Warning Systems

**Source**: Churn prediction and customer success research **Confidence**:
HIGH - Data-driven frameworks for retention

---

## Customer Health Score Methodology

### What is Health Scoring?

**Definition**: A numerical score (0-100) representing a customer's likelihood
to renew, expand, or churn

**The goal**: Predict churn 30-60 days before it happens so you can intervene
proactively

**The math**: Health scores combine multiple indicators into a single number for
easy prioritization

---

## Health Score Components

### Component 1: Product Usage (40 points)

**Login frequency** (15 points):

- Daily login: 15 points
- 4-6x/week: 12 points
- 2-3x/week: 8 points
- Weekly or less: 4 points
- No login (14+ days): 0 points

**Feature adoption** (15 points):

- Using 5+ features: 15 points
- Using 3-4 features: 12 points
- Using 1-2 features: 8 points
- Using 0 features: 0 points

**Depth of use** (10 points):

- Power user (advanced features): 10 points
- Intermediate (core features): 7 points
- Basic (simple features): 4 points
- Minimal (logged in only): 0 points

### Component 2: Engagement (25 points)

**Support interactions** (10 points):

- Positive sentiment: 10 points
- Neutral: 5 points
- Negative sentiment: 0 points
- No interactions: 5 points (neutral baseline)

**Feedback participation** (10 points):

- Completed exit survey: 5 points
- Responded to check-in email: 5 points
- Provided NPS score: 5 points
- Gave feature feedback: 5 points
- Maximum: 10 points (if multiple)

**Community involvement** (5 points):

- Active in community/forum: 5 points
- Referred customer: 5 points
- Case study participant: 5 points
- Maximum: 5 points

### Component 3: Account Value (20 points)

**Revenue tier** (10 points):

- Enterprise ($500+/month): 10 points
- Business ($99-$499/month): 7 points
- Pro ($49-$98/month): 5 points
- Basic ($0-$48/month): 3 points

**Tenure** (10 points):

- 12+ months: 10 points
- 6-12 months: 7 points
- 3-6 months: 5 points
- 1-3 months: 3 points
- <1 month: 1 point

### Component 4: Billing Health (15 points)

**Payment history** (15 points):

- No failed payments ever: 15 points
- 1 failed payment (resolved): 10 points
- 2-3 failed payments: 5 points
- 4+ failed payments: 0 points

**Plan changes** (0 points or bonus):

- Upgraded: +5 points (bonus)
- Downgraded: -5 points (penalty)
- Stable: 0 points

---

## Health Score Calculation

### Formula

```
Health Score = Usage (0-40) + Engagement (0-25) + Value (0-20) + Billing (0-15)

Maximum: 100 points
Minimum: 0 points
```

### Score Categories

**Green Zone (80-100)**: Healthy

- Low churn risk (<2%)
- Expansion opportunities
- Do nothing routine (monitor only)

**Yellow Zone (50-79)**: At Risk

- Medium churn risk (5-10%)
- Proactive outreach needed
- Success call recommended

**Red Zone (0-49)**: Critical

- High churn risk (20-40%)
- Immediate intervention required
- Founder outreach, special offers

---

## Early Warning Triggers

### Trigger 1: Usage Drop (Weight: High)

**Definition**: 50%+ decrease in login frequency for 2+ weeks

**Automated action**:

- Day 7: Send helpful tip email
- Day 14: Offer success call
- Day 30: Win-back with discount

**Manual action**:

- Review account history
- Identify why usage dropped
- Personal outreach from founder

### Trigger 2: Feature Stagnation (Weight: Medium)

**Definition**: Using only 1 feature for 30+ days

**Automated action**:

- Send advanced feature tutorial
- Share case study of similar customer
- Offer personalized training

**Manual action**:

- Success call for high-value customers
- Identify barriers to adoption
- Provide custom recommendations

### Trigger 3: Support Sentiment Shift (Weight: High)

**Definition**: Negative sentiment in 3+ consecutive support tickets

**Automated action**:

- Flag account for review
- Notify founder immediately

**Manual action**:

- Review ticket history
- Identify root cause
- Personal outreach to resolve

### Trigger 4: Payment Failure (Weight: Critical)

**Definition**: Failed payment + 7 days past due

**Automated action**:

- Day 1: Payment failed notification
- Day 3: Payment reminder
- Day 7: Service suspension notice

**Manual action**:

- For enterprise customers: Personal outreach
- For high-value customers: Call directly
- For standard customers: Let automation handle

### Trigger 5: Seat Count Decrease (Weight: High)

**Definition**: Team size reduction (10+ seats to 5-9 seats)

**Automated action**:

- Send check-in email
- Offer to pause/cancel without penalty

**Manual action**:

- Success call to understand reason
- Identify if temporary or permanent
- Save account if possible (downgrade, pause, etc.)

---

## Implementing Your Early Warning System

### Phase 1: Data Collection (Week 1)

**Set up tracking**:

- Product usage events (logins, features used)
- Support ticket sentiment (manual tags or AI)
- Billing events (payments, failures, plan changes)
- NPS and survey responses

**Tools**:

- Analytics: Amplitude, Mixpanel, Heap
- Support: Intercom, Zendesk, HelpScout
- Billing: Stripe, Paddle (webhooks)
- Custom: Build simple dashboard

### Phase 2: Score Calculation (Week 2)

**Build scoring model**:

- Create spreadsheet with formula
- Test on known healthy/churned customers
- Adjust weights based on your data
- Set thresholds (green/yellow/red)

**Tools**:

- Spreadsheet: Google Sheets, Excel
- Database: PostgreSQL, MySQL
- Automation: Zapier, Make (n8n)

### Phase 3: Automation Setup (Weeks 3-4)

**Automated triggers**:

- Health score drops below 50 → Email customer
- No login for 14 days → Check-in email
- Payment failed → Dunning sequence
- NPS ≤6 → Follow-up email

**Tools**:

- Email: SendGrid, Resend, Postmark
- Automation: Zapier, Make, customer communications platform
- Scheduling: Cron jobs, built-in schedulers

### Phase 4: Monitoring and Iteration (Ongoing)

**Track effectiveness**:

- Did early warning predict actual churn?
- Which triggers were most accurate?
- How many customers saved per intervention?

**Iterate monthly**:

- Adjust scoring weights based on data
- Add new triggers as patterns emerge
- Remove ineffective triggers
- A/B test different interventions

---

## Sample Health Score Dashboard

### Customer List View

```
Customer          Health Score  Trend    Risk      Last Login
────────────────────────────────────────────────────────────
Acme Corp         92 (Green)    ↗        Low       Today
Beta LLC          78 (Yellow)   →        Medium    3 days ago
Gamma Inc         45 (Red)      ↘        High      14 days ago
Delta Co          88 (Green)    ↗        Low       Yesterday
```

### Risk Filter View

```
Red Zone (0-49) - Critical Risk: 3 customers
- Gamma Inc (45) - Last login: 14 days ago
- [Customer] (Score) - [Risk factor]
- [Customer] (Score) - [Risk factor]

Yellow Zone (50-79) - Medium Risk: 12 customers
- Beta LLC (78) - Feature stagnation
- [Customer] (Score) - [Risk factor]

Green Zone (80-100) - Low Risk: 85 customers
- All healthy, monitor routine
```

---

## Proactive Outreach Framework

### By Health Score

**Green Zone (80-100)**: Quarterly business reviews

- Send QBR email with results
- Offer upsell opportunities
- Request referrals and testimonials

**Yellow Zone (50-79)**: Monthly check-ins

- Send personal email from founder
- Offer success call
- Provide targeted resources

**Red Zone (0-49)**: Immediate intervention

- Founder personal outreach
- Special discounts if appropriate
- Identify and fix root cause

### By Customer Tier

**Self-Serve (80% of customers)**: Automation only

- Email sequences
- In-app messages
- Help center content

**Pro Active (15% of customers)**: Automation + human touch

- Quarterly success calls
- Personalized outreach
- Proactive check-ins

**White Glove (5% of customers)**: High-touch

- Dedicated support (founder initially)
- Monthly strategy calls
- Custom onboarding
- Feature input access

---

## Measuring Early Warning Effectiveness

### Key Metrics

**Prediction accuracy**:

- True positives: Correctly predicted churn
- False positives: Predicted churn but stayed
- False negatives: Predicted healthy but churned
- True negatives: Correctly predicted healthy

**Intervention success**:

- Customers saved per month
- Churn reduction percentage
- Revenue retained from saved customers

**ROI calculation**:

- Cost of interventions (emails, calls, discounts)
- Revenue retained from saved customers
- Net positive if revenue > cost

**Target**:

- Prediction accuracy: >70%
- Intervention success: >20% (save 1 in 5 at-risk customers)

---

**Remember**: The best early warning system is useless without action. Score
customers, then proactively reach out to at-risk segments.

---

**Source**: Customer success and retention best practices
