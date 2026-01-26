# Reference Formatting Guide

All references and sources in SKILL.md and reference files must use **markdown
link format**.

## Correct Format ✅

Use markdown links for all external sources:

```markdown
## Sources

- [Indie Hackers Launch Strategy 2025: 23% Conversion Rate vs Product Hunt's 3% | Awesome Directories](https://awesome-directories.com/blog/indie-hackers-launch-strategy-guide-2025/)
- [11 Best Product Hunt Alternatives 2026 (89% Wouldn't Launch Again) | OpenHunts](https://openhunts.com/blog/product-hunt-alternatives-2025)
- [Smart Micro-SaaS Pricing Strategies for Indie Founders | Freemius Blog](https://freemius.com/blog/micro-saas-pricing-strategies/)
```

## Incorrect Format ❌

Do NOT use block quotes or plain URLs:

```markdown
## Sources

- Indie Hackers Launch Strategy 2025: 23% Conversion Rate vs Product Hunt's 3% |
  Awesome Directories
  https://awesome-directories.com/blog/indie-hackers-launch-strategy-guide-2025/
- 11 Best Product Hunt Alternatives 2026 (89% Wouldn't Launch Again) | OpenHunts
  https://openhunts.com/blog/product-hunt-alternatives-2025
```

## Why Markdown Links?

1. **Clickable** - Links are directly clickable in markdown renderers
2. **Clean** - Single line per reference, no awkward indentation
3. **Consistent** - Matches the pattern used throughout the codebase
4. **Validatable** - Can be automatically checked by validation scripts

## Validation

The validation script (`scripts/validate.py`) checks that:

- All `## Sources` sections use markdown link format `[Title](url)`
- Links are valid URLs (http:// or https://)
- No plain URLs or block quote formatting

## Examples

### SKILL.md Sources Section

```markdown
## Sources

- [From Founding to Exit in Two Years: The FeedbackPanda Story | The Bootstrapped Founder](https://thebootstrappedfounder.com/from-founding-to-exit-in-two-years-the-feedbackpanda-story/)
- [This teacher built a student feedback tool and hit $55K MRR | They Got Acquired](https://theygotacquired.com/saas/feedback-panda-acquired-by-sureswift-capital/)
```

### Reference File Sources Section

```markdown
## Sources

- [Growing My SaaS from Solo Founder to +1 Employee | HostiFi Blog (Medium)](https://medium.com/hostifi/growing-my-saas-from-solo-founder-to-1-employee-bf367061f578)
- [The 8-Step Customer Success Process for Reducing Churn | Gong](https://www.gong.io/blog/customer-success-process)
```

### Inline References in Content

When referencing sources inline within content, also use markdown links:

```markdown
According to
[Indie Hackers launch data](https://awesome-directories.com/blog/indie-hackers-launch-strategy-guide-2025/),
community-led growth delivers 7.5x better conversion than launch events.
```

## Book References

For book references, use a link to the book's page:

```markdown
- [The E-Myth Revisited by Michael Gerber](https://www.amazon.com/E-Myth-Revisited-Michael-E-Gerber/dp/0060753187)
```

If no online source exists, format as plain text without a link:

```markdown
- The E-Myth Revisited by Michael Gerber (Book)
```
