# Hiring Checklist and Benchmarks

**Source**: Report 4: Growth, Scaling & Automation (lines 149-183)
**Confidence**: HIGH - Proven hiring framework from successful founders

---

## The Systemization-First Hiring Approach

**The critical mistake**: Hiring before documenting processes leads to chaos and
founder dependency

**The proven approach**: Reach $100K ARR and document 80%+ of recurring tasks
before hiring

**Case study**: Reilly Chase (HostiFi) documented 100+ support guides over weeks
before hiring. First hire handled 80%+ of day-to-day support within weeks.

---

## Hiring Benchmarks: Are You Ready?

### Revenue Benchmark

**Target**: $100K ARR minimum

**Why this number**:

- Demonstrates product-market fit (revenue is real)
- Funds full-time salary + overhead
- Proves business viability (not hobby project)

**Below $100K ARR**:

- Focus on growth, not hiring
- Document processes anyway (prep for future)
- Consider contractors for specific tasks

**At $100K ARR**:

- Can afford $40-50K salary + overhead
- Revenue sufficient to justify cost
- Time to focus on strategic work (not support/ops)

---

### Profit Benchmark

**Target**: Monthly profit approaches day job salary

**Calculation**:

```
Annual salary: $80,000
Monthly: $80,000 ÷ 12 = $6,667
Monthly profit target: $6,000-7,000
```

**Why this matters**:

- Replaces personal income if you quit job
- Reduces financial pressure on business
- Allows sustainable hiring (not desperate)

**Warning**: Don't hire if monthly profit < $3,000 (business can't sustain
salary yet)

---

### Time Benchmark

**Target**: Work consumes all free time (evenings, weekends)

**Reality check**:

- Working 60+ hours/week
- No time for family, friends, life
- Burnout risk high
- Quality suffering (mistakes increase)

**Hiring triggers**:

- Consistently working weekends
- No vacation in 6+ months
- Constantly putting out fires
- Family/complaining about absence

---

### Process Benchmark (CRITICAL)

**Target**: 80%+ of recurring tasks documented as SOPs

**What counts as documented**:

- Written SOPs or checklists
- Screen recordings for visual processes
- Decision trees for common scenarios
- Templates for communications (emails, responses)
- Runbooks for operations (deployments, backups, etc.)

**How to measure**:

```
Total recurring tasks: 50
Documented SOPs: 45

Coverage: 45 ÷ 50 = 90% ✓
```

**Why 80% threshold**:

- New hire can be autonomous quickly
- Founder not bottleneck for answers
- Processes standardized (quality consistent)
- Scalable beyond first hire

---

## First Hire: Role Options

### Option 1: Technical Support Engineer ⭐ Recommended

**Responsibilities**:

- Day-to-day customer support
- Troubleshooting technical issues
- Bug triage and documentation
- Customer onboarding

**Why start here**:

- Frees founder immediately (biggest impact)
- Uses your SOPs directly
- Can be trained from documented guides
- Lower salary than developer ($40-50K vs $80-100K)

**Success criteria**:

- Handles 80%+ of support tickets independently
- Customer satisfaction maintained or improved
- Founder freed from support queue

**Case study**: HostiFi hired technical support first after documenting 100+
guides. Result: Support handled 80%+ by new hire within weeks.

---

### Option 2: Customer Success Manager

**Responsibilities**:

- Customer onboarding and training
- Quarterly business reviews (QBRs)
- Retention and expansion revenue
- High-touch customer relationships

**When to choose**:

- High-touch B2B SaaS ($99+/month)
- Complex product requiring training
- Enterprise customers (need dedicated support)
- Revenue >$150K ARR

**Trade-off**:

- Higher salary ($50-70K)
- Requires domain knowledge
- More strategic (harder to train)
- Better for second or third hire

---

### Option 3: Contract Specialist

**Responsibilities**:

- Specific task (UI design, content writing, development)
- Project-based work
- Part-time or as-needed

**When to choose**:

- Need specific expertise you lack
- Can't afford full-time hire yet
- Project-based work (website redesign, content creation)
- Hiring for first time (lower risk than employee)

**Advantages**:

- Lower risk (contract, not employee)
- Flexible scale (up or down as needed)
- Specialist expertise (better than generalist)
- Test before committing to full-time

**Disadvantages**:

- Less dedicated (split across clients)
- Harder to build culture
- Availability varies
- Higher hourly rate (though part-time)

---

## The E-Myth Approach

**Core principle**: Don't hire another "you" — create processes so almost anyone
can produce consistent results

**Reilly Chase's experience (HostiFi)**:

- Problem: Support consumed "all my days, nights, and weekends"
- Solution: Documented every ticket resolution via screen recording
- Result: 100+ guides created covering every common support issue
- Outcome: First hire trained in weeks, handled 80%+ of support independently

**How to apply**:

1. **Record yourself** solving every problem (screen recording)
2. **Identify patterns** (common problems, repeat solutions)
3. **Create written guides** (step-by-step, screenshots, examples)
4. **Test with others** (can someone else follow your SOP?)
5. **Iterate based on feedback** (revise SOPs for clarity)

**Example SOP**:

```markdown
# UniFi Not Loading: Troubleshooting Guide

**Symptom**: Customer reports "UniFi not loading" or "Can't access controller"

**Step 1**: Check Controller Status

- Log into UniFi Controller
- Navigate to Devices
- Look for device status: "Connected", "Adopting", "Disconnected"

**Step 2**: If "Disconnected"

- Check network cables (physically or remotely if switch managed)
- Power cycle access point (unplug for 30 seconds, plug back in)
- Wait 2-3 minutes for AP to reconnect
- Verify status changes to "Connected"

**Step 3**: If Still Disconnected

- Check firewall rules (port 8080, 8443, 8880 must be open)
- Verify AP is on latest firmware
- Check for IP address conflicts
- Review controller logs for errors

**Step 4**: If All Else Fails

- Factory reset access point (press reset button for 10 seconds)
- Re-adopt to controller
- Contact Ubiquiti support (hardware issue?)

**Screenshots**: [Include screenshots for each step]

**Common causes** (from 100+ tickets):

- Network cable unplugged (40%)
- Firewall blocking (25%)
- Firmware outdated (20%)
- IP conflict (10%)
- Hardware failure (5%)

**Last updated**: 2025-01-01
```

---

## Hiring Process Checklist

### Pre-Hiring Prep

**Financial readiness**:

- [ ] Consistent $10K+ MRR for 3+ months
- [ ] Monthly profit >$5K
- [ ] 3-6 months runway (salary + buffer)

**Process readiness**:

- [ ] 80%+ of tasks documented as SOPs
- [ ] 10-20 core SOPs created
- [ ] SOPs tested by contractor/friend
- [ ] Knowledge base accessible and searchable

**Emotional readiness**:

- [ ] Accepted that hire won't be perfect clone
- [ ] Prepared to delegate (trust but verify)
- [ ] Ready to train and mentor (time investment)

---

### Job Description Template

**Title**: Customer Support Specialist (or appropriate role)

**About Us**:

- [Product name and what it does]
- [Company size: Solo founder + team size]
- [Culture: Remote, async, customer-obsessed]

**Role Overview**:

- Provide world-class customer support via [channels]
- Troubleshoot technical issues using our documented SOPs
- Contribute to knowledge base and process improvement
- [Other responsibilities]

**Requirements**:

- [Skill 1: e.g., 1+ years customer support experience]
- [Skill 2: e.g., Technical aptitude, comfortable learning new tools]
- [Skill 3: e.g., Excellent written communication]
- [Skill 4: e.g., Self-directed, follows SOPs independently]

**Nice-to-Have**:

- [Experience with your tech stack: e.g., Django, Stripe, etc.]
- [Experience with your tools: e.g., Intercom, Zendesk, etc.]
- [Industry knowledge: e.g., marketing agencies, SaaS, etc.]

**Compensation**:

- [Salary range: e.g., $45-55K/year]
- [Benefits: e.g., Health insurance stipend, learning budget, etc.]
- [Schedule: Full-time (40 hrs/week), remote, flexible hours]

**How to Apply**:

- [Email resume to: hiring@company.com]
- [Short cover letter explaining interest]
- [Complete this task: e.g., Write a support response to this mock ticket]

---

### Interview Questions Template

**Experience**:

- Tell me about a time you turned an unhappy customer into a happy one
- Describe your process for troubleshooting unfamiliar technical issues
- How do you handle situations where you don't know the answer?

**Problem-Solving**:

- Here's a mock support ticket: [example]. How would you respond?
- Customer is frustrated due to a bug on our end. How do you handle it?
- You receive 50 tickets in one day. How do you prioritize?

**Culture Fit**:

- What's your preferred work environment (quiet office vs collaboration)?
- How do you handle ambiguity or incomplete documentation?
- Describe a time you improved a process or workflow

**SOP-Following**:

- Here's our SOP for [process]. Can you walk me through it?
- Have you used documented SOPs before? How did you follow them?
- What would you do if SOP didn't cover a situation?

---

## Post-Hiring Onboarding

### Week 1: Shadow and Learn

**Day 1**:

- Welcome call with founder (30 minutes)
- Company mission, values, culture
- Product overview and demo
- Set up accounts and tools
- Review SOP documentation structure

**Day 2-5**:

- Shadow founder on support tickets
- Founder responds, hiree observes
- Discuss why and how for each ticket
- Hiree starts responding to simple tickets (founder reviews)
- Gradually increase complexity

### Week 2-4: Independence Building

**Week 2**:

- Hiree responds to 50% of tickets independently
- Founder reviews and provides feedback
- Daily 15-minute sync to discuss questions

**Week 3**:

- Hiree responds to 80% of tickets independently
- Founder handles only escalations and complex issues
- Daily check-in reduced to 15 minutes every other day

**Week 4**:

- Hiree handles all standard tickets independently
- Founder handles only 20% (escalations, strategy)
- Transition to weekly 30-minute meeting

### Month 2-3: Optimization

**Goals**:

- Identify SOP gaps from hiree's experience
- Update SOPs based on feedback
- Hiree suggests process improvements
- Cross-train on additional responsibilities

**Success metrics**:

- Hiree handles 80%+ of support independently
- Customer satisfaction maintained or improved
- Founder freed from support queue (10+ hours/week saved)
- Zero founder knowledge dependency

---

## Measuring Hiring Success

### Key Metrics

**Training time**:

- Target: New hire autonomous in <2 weeks
- Warning: Taking >1 month to get up to speed

**Process consistency**:

- Target: Hiree follows SOPs 90%+ of time
- Warning: Constant deviations from documented processes

**Customer satisfaction**:

- Target: CSAT or NPS maintained or improved
- Warning: Scores declining after hire

**Founder time savings**:

- Target: 10-15 hours/week freed up
- Warning: Still working 60+ hours/week

**Business impact**:

- Target: Revenue continues growing
- Target: Churn rate maintained or improved
- Warning: Growth stagnates or churn increases

---

## Common Hiring Mistakes

**Mistake 1: Hiring Too Soon**

- **Problem**: Hiring at $30K ARR before processes documented
- **Solution**: Wait until $100K ARR and 80%+ tasks documented

**Mistake 2: Hiring Mini-Me**

- **Problem**: Looking for someone with your exact skills/background
- **Solution**: Hire for aptitude and attitude, train for skills

**Mistake 3: Not Delegating**

- **Problem**: Hiree joins but founder doesn't let go of control
- **Solution**: Trust your SOPs and hiree, verify through metrics

**Mistake 4: No Training Plan**

- **Problem**: Hiree thrown into deep end with no guidance
- **Solution**: Structured 4-week onboarding plan

**Mistake 5: Hiring for Skills Not Culture Fit**

- **Problem**: Brilliant candidate but toxic attitude
- **Solution**: Cultural fit > skills (teach skills, can't teach personality)

---

**Remember**: The goal isn't to clone yourself—it's to create processes so
anyone can produce consistent results.

---

**Source**: Report 4: Growth, Scaling & Automation (lines 149-183)
