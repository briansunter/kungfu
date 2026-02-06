# SOP Templates for All 5 Types

---

## Type 1: Checklist SOPs

**When to use**: Routine tasks, experienced workers, fast execution needed

**Template**:

```markdown
# [Task Name] Checklist

**Purpose**: [Why this task matters] **Frequency**: [Daily/Weekly/As needed]
**Owner**: [Role or person]

Preparation:

- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]

Process:

- [ ] [Step 1 - clear action]
- [ ] [Step 2 - clear action]
- [ ] [Step 3 - clear action]
- [ ] [Step 4 - clear action]
- [ ] [Step 5 - clear action]

Completion:

- [ ] [Final verification step]
- [ ] [Documentation/Handoff required]

**Notes**: [Common pitfalls, tips, tricks] **Last updated**: [Date]
```

**Example: Daily Support Checklist**

```markdown
# Daily Customer Support Checklist

**Purpose**: Ensure all customer inquiries receive timely responses
**Frequency**: Daily (before EOD) **Owner**: Customer Support

Preparation:

- [ ] Coffee ☕ (optional but recommended)

Review Support Queue:

- [ ] Check for new tickets (Zendesk/Intercom)
- [ ] Flag urgent tickets (payment issues, production down)
- [ ] Respond to all new tickets (target: <2 hours)

Follow Up on Pending:

- [ ] Check tickets awaiting customer response
- [ ] Update status if no response in 48 hours

Close Resolved Tickets:

- [ ] Confirm customer is satisfied
- [ ] Add resolution notes for future reference
- [ ] Close ticket

End of Day:

- [ ] Verify zero tickets >24 hours old
- [ ] Hand off urgent issues to founder if needed

**Notes**: Never let a ticket sit >24 hours without response. If stuck: Ask
founder, don't ignore. **Last updated**: 2025-01-01
```

---

## Type 2: Decision Tree SOPs

**When to use**: Complex troubleshooting, multiple scenarios, branching logic

**Template**:

```markdown
# [Process Name] Decision Tree

**Purpose**: [How to diagnose and resolve X] **When to use**: [Trigger
scenarios]

Start Here: [IF: Condition A] → [Action A] → [Check result] → [IF: Result B] →
[Action C] → [IF: Result C] → [Action D]

[IF: Condition E] → [Action E] → ...

Escalation Path:

1. [Tier 1 support]
2. [Tier 2 support]
3. [Founder/Expert]
4. [Emergency protocol]

**Common Results**:

- [Result 1]: [Solution] (Frequency: X%)
- [Result 2]: [Solution] (Frequency: Y%)
- [Result 3]: [Solution] (Frequency: Z%)

**Notes**: [Edge cases, warnings, tips] **Last updated**: [Date]
```

**Example: Payment Failure Decision Tree**

```markdown
# Payment Failed Decision Tree

**Purpose**: Diagnose and resolve failed payment issues **When to use**:
Customer reports payment failure or Stripe webhook triggers

Start Here: [IF: Hard decline (card lost, expired)] → Send payment update email
immediately → Offer to update payment method → [IF: Updated within 3 days] →
Restore service access → [IF: No response after 7 days] → Suspend service → [IF:
Still no response after 30 days] → Cancel subscription

[IF: Soft decline (insufficient funds, temporary hold)] → Retry payment in 24
hours automatically → [IF: Retry succeeds] → Send confirmation email → [IF:
Retry fails] → Send payment update email → [Continue to "Hard decline" flow]

[IF: Bank decline (fraud suspicion)] → Flag account for manual review → Notify
founder immediately → [Founder action required] → Do not auto-retry

Escalation Path:

1. Customer Support (Tier 1)
2. Founder (if customer asks for exception)
3. Founder (if account value >$500/month)

**Common Results**:

- Card expired (40%): Customer updates card
- Insufficient funds (30%): Retry succeeds in 24 hours
- Fraud suspicion (5%): Manual review required
- Other (25%): Contact customer support

**Notes**: Always send friendly, non-accusatory emails. Payment failures happen
to everyone - don't damage relationship. **Last updated**: 2025-01-01
```

---

## Type 3: How-To Guide SOPs

**When to use**: Step-by-step procedures, detailed instructions, training
material

**Template**:

```markdown
# [Task/Process Name]: How-To Guide

**Purpose**: [What this achieves] **Prerequisites**: [What you need before
starting] **Time required**: [Estimated duration] **Complexity**:
[Beginner/Intermediate/Advanced]

Overview: [Brief 2-3 sentence summary of the process]

Step 1: [Action Name] [Detailed instructions]

- [Substep 1]
- [Substep 2]
- [Substep 3] [Screenshot or example]

Step 2: [Action Name] [Detailed instructions] [Screenshot or example]

Step 3: [Action Name] ...

Troubleshooting: [Common issues and solutions]

Tips and Best Practices:

- [Tip 1]
- [Tip 2]

Related SOPs:

- [Link to related process]
- [Link to prerequisite process]

**Last updated**: [Date]
```

**Example: Customer Refund Process**

```markdown
# Processing Customer Refunds: How-To Guide

**Purpose**: Process refund requests quickly and accurately **Prerequisites**:
Admin access to Stripe/Paddle dashboard **Time required**: 5 minutes
**Complexity**: Beginner

Overview: This guide covers how to process refund requests, update payment
systems, and communicate with customers throughout the process.

Step 1: Verify Refund Eligibility

- Check customer's subscription start date
- Review refund policy (30-day window? prorated?)
- Verify if customer has active support tickets

[Screenshot: Stripe customer view]

Step 2: Process Refund in Stripe

- Log into Stripe dashboard
- Navigate to Payments → Customers
- Search for customer by email or name
- Click on the latest payment/invoice
- Click "Refund" button in top-right
- Select refund reason: "Customer request"
- Confirm refund

[Screenshot: Stripe refund button and confirmation dialog]

Step 3: Verify Refund Processed

- Check payment status shows "Refunded"
- Verify amount matches request
- Note transaction ID for records

Step 4: Update Customer Account

- If subscription active, cancel it
- Set account status to "Refunded"
- Add note to customer record

[Screenshot: Account status update]

Step 5: Communicate with Customer

- Send refund confirmation email template
- Explain when refund will appear on statement (5-10 business days)
- Ask for feedback (optional but recommended)

Troubleshooting: **Issue**: Can't find customer in Stripe **Solution**: Search
by email, or check if they paid via Paddle/other method

**Issue**: Refund amount is wrong **Solution**: Verify proration calculation,
confirm with founder before processing

Tips and Best Practices:

- Always communicate confirmation to customer
- Process within 24 hours of request
- Document reason for refund (internal analysis)
- Be friendly and understanding (even if refusing)

Related SOPs:

- Cancellation Policy
- Customer Communication Templates
- Monthly Revenue Reconciliation

**Last updated**: 2025-01-01
```

---

## Type 4: Reference Guide SOPs

**When to use**: Quick lookup, config options, error codes, reference tables

**Template**:

```markdown
# [Topic] Reference Guide

**Purpose**: Quick lookup for [X] **Updated**: [Date]

[Table/List format for quick scanning]

Quick Links:

- [Resource 1]
- [Resource 2]
- [Resource 3]

**Last updated**: [Date]
```

**Example: Support Ticket Categories**

```markdown
# Support Ticket Categories Reference Guide

**Purpose**: Quickly categorize incoming support tickets **Updated**: 2025-01-01

Billing & Payments:

- BILL-UPDATE: Update payment method
- BILL-REFUND: Request refund
- BILL-INVOICE: Need invoice/receipt
- BILL-CHARGE: Question about charge

Technical Issues:

- TECH-LOGIN: Can't log in
- TECH-FEATURE: Feature not working
- TECH-BUG: Possible bug found
- TECH-PERFORMANCE: Slow loading/errors

Account Management:

- ACCT-UPGRADE: Upgrade plan
- ACCT-DOWNGRADE: Downgrade plan
- ACCT-CANCEL: Cancel subscription
- ACCT-PAUSE: Pause account

Feature Requests:

- FEAT-REQUEST: New feature request
- FEAT-ENHANCEMENT: Improve existing feature

General Inquiry:

- INFO-QUESTION: General question
- INFO-COMPARISON: Compare plans/features
- INFO-PARTNERSHIP: Partnership inquiry

**Assignment Rules**:

- BILL-\* → Founder (money-sensitive)
- TECH-\* → Technical support
- ACCT-\* → Customer support
- FEAT-\* → Product team (founder)
- INFO-\* → Customer support

**Response SLAs**:

- BILL-\*: Within 4 hours
- TECH-\*: Within 24 hours
- ACCT-\*: Within 24 hours
- FEAT-\*: Acknowledge within 48 hours
- INFO-\*: Within 24 hours

**Last updated**: 2025-01-01
```

---

## Type 5: Foundational Article SOPs

**When to use**: Background context, why we do it this way, philosophy and
principles

**Template**:

```markdown
# [Topic]: Foundational Knowledge

**Purpose**: [Why this matters for our business] **Audience**: [Who should read
this]

Background: [Context and history]

Our Philosophy: [Principles and values]

Key Concepts:

- [Concept 1]
- [Concept 2]

Common Misconceptions:

- ❌ [Wrong way]
- ✅ [Right way]

Related Reading:

- [Link to how-to guides]
- [Link to reference guides]
- [External resources]

**Last updated**: [Date]
```

**Example: Our Customer Support Philosophy**

```markdown
# Customer Support Philosophy: Foundational Knowledge

**Purpose**: Define how we approach customer support **Audience**: All team
members, especially new hires

Background: We're a solo SaaS founder wearing multiple hats. Customer support is
our face to the world and often the difference between retention and churn. This
document explains our philosophy and approach to support.

Our Philosophy:

1. **Friendly over Fast**: Better to take 10 extra minutes and build
   relationship than rush and miss context
2. **Humans First**: Every ticket is from a real person with real problems
3. **No Robots**: Personality, warmth, and empathy matter. Don't sound like a
   corporation.
4. **Ownership**: If you can't solve it, own the follow-up and ensure someone
   does
5. **Learning Opportunities**: Support tickets reveal product gaps and
   improvement opportunities

Key Principles:

- **Response Time**: Within 24 hours maximum, faster for billing issues
- **Tone**: Casual, friendly, helpful. Use contractions, emojis, first-person
  ("I")
- **Transparency**: Admit mistakes, explain limitations, never overpromise
- **Empowerment**: Solve the problem if you can, don't just forward to founder

Common Misconceptions:

- ❌ "Support is a distraction from building" → ✅ Support informs what to build
- ❌ "Every ticket needs founder attention" → ✅ Most tickets can be solved with
  SOPs
- ❌ "Quick replies = good support" → ✅ Thorough replies = fewer follow-up
  tickets

Related Reading:

- Customer Support Checklist SOP
- Payment Failed Decision Tree
- Common Customer Questions (FAQ)

**Last updated**: 2025-01-01
```

---

## SOP Creation Best Practices

### Formatting Guidelines

**DO**:

- ✅ Use clear headings and structure
- ✅ Include screenshots for visual clarity
- ✅ Use bullet points and numbered lists
- ✅ Bold key terms and actions
- ✅ Include examples where helpful

**DON'T**:

- ❌ Write walls of text (hard to scan)
- ❌ Use vague language ("some", "sometimes", "maybe")
- ❌ Skip the basics (assume no knowledge)
- ❌ Bury critical info in paragraphs

### Testing Your SOPs

**Before finalizing**:

1. Give to someone unfamiliar with process
2. Observe them following SOP (take notes)
3. Ask where they got stuck or confused
4. Revise based on feedback

**Version control**:

- v1.0: Initial release
- v1.1: After first use feedback
- v2.0: Major revision (process change)
- Always date stamp updates

---

**Remember**: Best SOP is the one people actually use. Fast and imperfect beats
comprehensive and ignored.

---

## Sources

- [SOP Template | Confluence](https://www.atlassian.com/software/confluence/templates/sop)
- [SOP Template and Guide | Asana](https://asana.com/resources/sop-template)
- [Notion Help Center](https://www.notion.so/help)
- [Loom Help Center](https://support.loom.com/hc/en-us)
