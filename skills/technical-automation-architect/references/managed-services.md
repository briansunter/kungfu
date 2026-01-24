# Build vs Buy Decision Matrix

**Source**: Report 3: Project Management & Technical Operations (lines 156-183)
**Confidence**: HIGH - Proven framework from solo founders

---

## The Core Question

**"Would you rather spend 3 months building authentication or 3 months acquiring
your first 100 customers?"**

This question captures the essence of build vs buy for solo founders.

---

## Always Buy (Leverage) These

### Authentication & User Management

**Buy options**:

- **Auth0**: Enterprise-grade, $23/month free tier
- **Supabase Auth**: Open source, PostgreSQL included
- **Clerk**: Developer-friendly, modern UX

**Why buy**:

- Integration: 1 day vs 2-3 months build time
- Security: SOC2, GDPR compliant (you'd miss things)
- Features: SSO, MFA, social logins included
- Maintenance: They handle vulnerabilities, password resets

**Cost**: $0-23/month vs 2-3 months of your time

---

### Payment Processing

**Buy options**:

- **Stripe**: Industry standard, amazing docs
- **Paddle**: Merchant of Record (handles taxes for you)
- **Lemon Squeezy**: Similar to Paddle, great for digital products

**Why buy**:

- PCI compliance (massive headache to build yourself)
- Subscription management (billing cycles, proration)
- Fraud prevention (machine learning detection)
- International regulations (VAT, sales tax handled)

**Cost**: 2.9% + $0.30 per transaction vs months building

---

### Email Infrastructure

**Buy options**:

- **SendGrid**: Industry standard, reliable
- **Resend**: 10x cheaper, better DX
- **Postmark**: Best deliverability

**Why buy**:

- Deliverability (spam filters are complex)
- Infrastructure (SMTP servers, IP warming)
- Analytics (open rates, bounces, spam complaints)
- Templates and management UI

**Cost**: $0-50/month vs weeks building email infrastructure

---

### Managed Databases

**Buy options**:

- **Supabase**: PostgreSQL with extras
- **PlanetScale**: MySQL-compatible, branching
- **RDS**: AWS managed databases

**Why buy**:

- Automatic backups (you'll forget otherwise)
- High availability (multi-AZ)
- Security patches (managed for you)
- Scaling (handle traffic spikes)

**Cost**: $0-50/month (early stage) vs operations headache

---

### Hosting Infrastructure

**Buy options**:

- **Vercel**: Frontend hosting, zero config
- **Railway**: Full-stack hosting
- **Fly.io**: Global deployment

**Why buy**:

- No server management
- Automatic HTTPS
- Global CDN
- DDoS protection
- Scaling handled for you

**Cost**: $0-20/month vs managing servers yourself

---

## Build Only These

### Your Core Differentiator

**Build when**:

- It's your unique value proposition
- No existing solution fits your use case
- Custom integration required
- Competitive advantage depends on it

**Examples**:

- Your actual product features
- Custom business logic
- Unique algorithms or calculations
- Domain-specific functionality

---

## SaaS Boilerplates: The Middle Ground

**What they provide**:

- Authentication (pre-built)
- User management
- Billing/subscription logic
- Team invitations
- Email templates
- Admin dashboards
- Landing page templates

**Popular boilerplates**:

- **ShipFast** (Django/NextJS): $299, production-ready
- **SaaS Pegasus** (Django): $297, comprehensive
- **Jumpstart** (Rails): $299, Rails 7 ready
- **Bullet Train** (Rails): Open source option

**Benefits**:

- Reduce development time 60-70%
- Months → days for foundation features
- Proven patterns (battle-tested)
- Focus on differentiator, not boilerplate

**Cost**: $0-299 one-time vs 3-6 months building

---

## Decision Matrix

### For Each Component, Ask:

**Question 1: Is this our core differentiator?**

- YES → Consider building
- NO → Buy/leverage

**Question 2: Does a managed service exist?**

- YES → Use managed service
- NO → Consider building (or find different approach)

**Question 3: What's the cost comparison?**

- Managed service cost: $X/month
- Build time cost: 3 months × $0 = ???
- Opportunity cost: What else could you build in 3 months?

**Question 4: What's the exit strategy?**

- If managed service shuts down, what happens?
- Can you migrate away easily?
- Are you locked in to their ecosystem?

---

## Real Examples

### Example 1: Authentication

**Build approach**:

- Time: 2-3 months
- Skills needed: Security, OAuth, session management
- Maintenance: Ongoing vulnerability patches
- Risk: Security breaches

**Buy approach (Auth0/Supabase)**:

- Time: 1 day integration
- Skills needed: Read docs, copy API keys
- Maintenance: Zero (they handle it)
- Risk: Service shutdown (mitigation: standard protocols)

**Winner**: Buy (saves 2-3 months)

### Example 2: Custom Algorithm

**Scenario**: You're building a tool that optimizes pricing using proprietary ML
model

**Build approach**:

- Time: 1-2 months
- Differentiation: Core value prop
- Competitive advantage: Yes

**Buy approach**:

- Does managed service exist? No
- Can you use generic ML service? Not tailored enough

**Winner**: Build (core differentiator)

### Example 3: Transactional Email

**Build approach**:

- Time: 3-4 weeks
- Infrastructure: SMTP servers, IP warming, spam filters
- Deliverability: Likely poor initially
- Maintenance: Ongoing monitoring

**Buy approach (SendGrid/Resend)**:

- Time: 1 day integration
- Deliverability: Excellent (they've done IP warming)
- Maintenance: Zero (they handle reputation)

**Winner**: Buy (saves 1 month)

---

## Cost-Benefit Calculation Template

### Build vs Buy Calculator

```
Component: [e.g., Authentication]

Build Approach:
- Development time: ___ weeks
- Your hourly rate (opportunity cost): $___/hr
- Total build cost: ___ weeks × 40 hrs/week × $___/hr = $___
- Ongoing maintenance: ___ hours/month
- Total first-year cost: $___

Buy Approach:
- Setup time: ___ hours
- Monthly service cost: $___/month
- First-year cost: Setup + (12 × monthly) = $___

Comparison:
- Buy cheaper by: $___
- Time saved: ___ weeks
- What you can do with saved time: [build X feature, acquire Y customers]

Decision: BUILD / BUY
Reason: [Your rationale]
```

---

## Common Mistakes

### Mistake 1: Building for "Learning Experience"

**Problem**: "I'll build auth to learn how it works" **Reality**: You'll learn
less than you think, ship product later **Solution**: Ship product first, learn
on side projects

### Mistake 2: "We Can Build It Cheaper"

**Problem**: Underestimating build time and complexity **Reality**: Always takes
longer, has more edge cases **Solution**: Use managed service, ship faster

### Mistake 3: Vendor Lockup Fears

**Problem**: "What if Auth0 shuts down?" **Reality**: They won't (huge company),
and migration paths exist **Solution**: Focus on shipping, not theoretical
future problems

### Mistake 4: Custom Requirements

**Problem**: "Our auth needs are special" (rarely true) **Reality**: Most
"special" requirements aren't actually special **Solution**: Validate with real
customers before building

---

**Remember**: Every hour spent building undifferentiated features is an hour not
spent on your core differentiator or acquiring customers.

---

**Source**: Full research at `/docs/ams/notes/research-indie-saas-business/`

- Report 3: Project Management & Technical Operations
