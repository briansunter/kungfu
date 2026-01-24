# SaaS Legal Boilerplate Generator

Generate comprehensive legal documents for SaaS web applications with compliance
for GDPR, CCPA, and other jurisdictions.

## Features

- **Privacy Policy** - Global template with GDPR, CCPA, PIPEDA, LGPD compliance
- **Terms of Service** - SaaS-specific service agreements
- **Cookie Policy** - Cookie and tracking disclosure
- **Data Processing Agreement** - GDPR Article 28 compliant DPA
- **CCPA Opt-Out** - "Do Not Sell or Share" privacy rights
- **Acceptable Use Policy** - Usage guidelines

## Quick Start

### Interactive Mode (Recommended)

```bash
cd plugins/business/skills/saas-legal-generator
python scripts/interactive_generator.py
```

The interactive generator will prompt you for:

1. Company information
2. Service details
3. Billing setup
4. Data practices
5. Target jurisdictions
6. Third-party services

### Document Generation

Generated documents are saved to `output/` directory:

- `privacy-policy.md`
- `terms-of-service.md`
- `cookie-policy.md`
- `data-processing-agreement.md`
- `do-not-sell-my-information.md`

## Templates

All templates are in `templates/` directory with customizable placeholders:

| Template                       | Purpose           | Jurisdictions        |
| ------------------------------ | ----------------- | -------------------- |
| `privacy-policy-global.md`     | Privacy Policy    | Global + GDPR + CCPA |
| `terms-of-service-saas.md`     | Terms of Service  | Universal            |
| `cookie-policy.md`             | Cookie Disclosure | GDPR + ePrivacy      |
| `data-processing-agreement.md` | DPA               | GDPR Article 28      |
| `ccpa-opt-out-link.md`         | CCPA Opt-Out      | California           |

## Placeholder Replacement

Templates use placeholders like `[COMPANY_NAME]` that are replaced during
generation:

- `[COMPANY_NAME]` - Your legal business name
- `[DOMAIN]` - Website domain
- `[CONTACT_EMAIL]` - Privacy/legal contact
- `[JURISDICTION]` - Governing law
- `[EFFECTIVE_DATE]` - Document date
- `[CURRENCY]` - Payment currency (USD, EUR)

## Common Workflows

### Complete SaaS Launch Package

Generate all essential documents for a new SaaS product:

```bash
python scripts/interactive_generator.py
# Select: Privacy Policy, Terms, Cookies, DPA, CCPA
# Target jurisdictions: GDPR, CCPA
```

### GDPR Compliance Only

For European market entry:

```bash
# Run interactive mode
# Select: Privacy Policy, Cookie Policy, DPA
# Target: GDPR only
```

### California Residents (CCPA)

For CCPA/CPRA compliance:

```bash
# Run interactive mode
# Select: Privacy Policy, CCPA Opt-Out
# Target: CCPA
```

## Customization

### Industry-Specific Clauses

Templates include placeholder sections for:

- **Healthcare (HIPAA):** PHI handling, BAA
- **Financial (SEC/FINRA):** Risk disclaimers
- **E-commerce:** Returns, shipping, PCI DSS
- **Education (FERPA):** Student data, parental consent

### Third-Party Services

Commonly integrated services:

- **Payment:** Stripe, PayPal, Braintree
- **Hosting:** AWS, GCP, Azure
- **Analytics:** Google Analytics, Mixpanel
- **Email:** SendGrid, Mailgun, Postmark
- **Support:** Intercom, Zendesk, Help Scout

## Deployment

### Website Footer Links

Required footer links:

```html
<footer>
  <a href="/privacy">Privacy Policy</a>
  <a href="/terms">Terms of Service</a>
  <a href="/cookies">Cookie Policy</a>
  <a href="/do-not-sell">Do Not Sell or Share</a>
  <!-- CCPA -->
</footer>
```

### Cookie Consent Banner (GDPR)

```html
<div id="cookie-banner" style="display: none;">
  <p>
    We use cookies for analytics, personalization, and advertising. By
    continuing, you agree to our <a href="/cookies">Cookie Policy</a>.
  </p>
  <button onclick="acceptEssential()">Accept Essential</button>
  <button onclick="acceptAll()">Accept All</button>
  <button onclick="showSettings()">Customize</button>
</div>
```

### CCPA "Do Not Sell" Link

Add to footer and privacy policy:

```html
<a href="/do-not-sell">Do Not Sell or Share My Personal Information</a>
```

## Maintenance

### Review Schedule

- **Quarterly:** Check for law changes in target markets
- **Annually:** Full document review and update
- **As Needed:** Update for new features or data practices

### Version Control

Track document versions:

```markdown
**Privacy Policy Version:** 1.0 **Effective Date:** January 15, 2025 **Last
Updated:** January 15, 2025
```

## Validation Checklist

Before deploying:

- [ ] All placeholders replaced with actual details
- [ ] Jurisdictions match your target markets
- [ ] Data collection accurately described
- [ ] Contact information current and monitored
- [ ] Links work from footer
- [ ] Documents accessible (not login-gated)
- [ ] Reviewed by attorney (recommended)
- [ ] Translated for non-English markets

## Important Disclaimer

⚠️ **These templates are for informational purposes only and do not constitute
legal advice.**

Laws vary by jurisdiction and change frequently. Always consult with a qualified
attorney to review your legal documents before publication.

## Resources

### External References

- **[GDPR.eu](https://gdpr.eu/)** - GDPR guidance and resources
- **[CCPA Official](https://oag.ca.gov/privacy/ccpa)** - California AG CCPA
  resources
- **[Termly Templates](https://termly.io/resources/templates/)** - Additional
  templates
- **[Promise.legal](https://promise.legal/templates/)** - SaaS legal templates

### Research Sources

Based on research from:

- [PrivacyPolicies.com](https://www.privacypolicies.com/) - Privacy policy
  generators
- [Cookie-Script Guide](https://cookie-script.com/guides/saas-privacy-policy) -
  SaaS privacy guides
- [Promise.legal Templates](https://promise.legal/) - Startup legal templates
- [Termly Generator](https://termly.io/products/privacy-policy-generator/) -
  Policy generators
- [GDPR.eu DPA](https://gdpr.eu/data-processing-agreement/) - GDPR DPA template
- [SecurePrivacy CCPA](https://secureprivacy.ai/blog/ccpa-requirements-2026-complete-compliance-guide) -
  CCPA compliance

## File Structure

```
saas-legal-generator/
├── SKILL.md                      # Main skill documentation
├── README.md                     # This file
├── EXAMPLES.md                   # Usage examples
├── templates/                    # Legal document templates
│   ├── privacy-policy-global.md
│   ├── terms-of-service-saas.md
│   ├── cookie-policy.md
│   ├── data-processing-agreement.md
│   └── ccpa-opt-out-link.md
├── scripts/                      # Generation scripts
│   └── interactive_generator.py
├── references/                   # Additional documentation
│   └── jurisdiction-guide.md
└── output/                       # Generated documents (created at runtime)
```

## Support

For questions or issues:

- Email: [Your Contact Email]
- Documentation: See SKILL.md
- Templates: See `templates/` directory

---

**Generated by:** SaaS Legal Boilerplate Generator Skill **Last Updated:**
[EFFECTIVE_DATE]
