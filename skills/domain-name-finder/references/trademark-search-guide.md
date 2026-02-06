# Trademark Search Guide

Comprehensive guide to searching trademark databases across major jurisdictions.

## Automated Search

Use the bundled script for preliminary screening:

```bash
bun run scripts/check-trademarks.ts velora zenify taskflow
```

**What it checks:**

- USPTO (United States)
- EUIPO (European Union)
- Web search for active businesses

**Limitations:**

- May not catch all similar marks
- Doesn't check all jurisdictions
- Not legal advice - consult an attorney

## Manual Search Databases

### United States (USPTO)

**TESS Database** -
https://www.uspto.gov/trademarks-application-process/search-trademark-database

**Search tips:**

1. Use "Free Form" search for comprehensive results
2. Try variations: `velora`, `velorah`, `veloura`
3. Check relevant classes (e.g., Class 9 for software, Class 42 for tech
   services)
4. Review both "Live" and "Dead" marks (dead marks may show history)

**International Classification System (Nice Classes):**

- Class 9: Software, mobile apps
- Class 42: Technology services, SaaS, cloud computing
- Class 35: Business services, advertising
- Class 38: Communication services

### European Union (EUIPO)

**eSearch** - https://euipo.europa.eu/eSearch/

**Search tips:**

1. Search across all EU member states
2. Check both word marks and figurative marks (logos)
3. Review "Opposition period" marks (may still be available)

### United Kingdom (UKIPO)

**Trademark Search** - https://www.gov.uk/search-for-trademark

**Search tips:**

1. Post-Brexit, UK has separate registry from EU
2. Check both UK and EU if targeting Britain

### Canada (CIPO)

**Trademark Database** - https://ised-isde.canada.ca/site/trademark-search/

**Search tips:**

1. Canadian marks less crowded than US
2. Check English and French variations

### International (WIPO)

**Global Brand Database** - https://www3.wipo.int/branddb/en/

**Search tips:**

1. Search across 50+ national registries
2. Good for identifying global conflicts

## Common Law Trademarks

**What they are:**

- Unregistered trademarks protected through use
- Exist even without formal registration
- Protected by state/common law in US

**How to check:**

1. Google search: `"yourname" + business/software/app`
2. Search app stores (Apple App Store, Google Play)
3. Search social media platforms
4. Search Secretary of State databases (US)

**Why they matter:**

- Can still be infringed even if not registered
- Priority goes to first use in commerce
- Geographic scope limited to area of use

## Risk Assessment

### Low Risk

- No direct matches in relevant classes
- No common law users found
- No confusingly similar marks

### Medium Risk

- Similar marks in unrelated industries
- Common law users in different geographic markets
- Dead trademarks (abandoned)

### High Risk

- Exact match in same class
- Confusingly similar in related class
- Active common law users in same space

## When to Consult an Attorney

**Definitely consult if:**

- High-risk results found
- Significant investment planned ($10k+)
- Targeting multiple jurisdictions
- Building a consumer-facing brand
- Existing business with revenue

**May be able to skip if:**

- Low-risk results
- Small personal project
- Limited geographic scope
- Testing MVP/prototype

## Legal Disclaimer

Trademark search results are for informational purposes only and do not
constitute legal advice. Trademark law varies by jurisdiction and is complex.
Always consult a qualified trademark attorney for definitive clearance before:

- Making significant investments
- Launching products
- Raising funding
- Expanding internationally

## Resources

- **USPTO Trademark Basics**: https://www.uspto.gov/trademarks/basics
- **WIPO Trademark Resources**: https://www.wipo.int/trademarks/en/
- **International Trademark Association (INTA)**: https://www.inta.org/

## Sources

- [ICANN Lookup](https://lookup.icann.org/en)
- [IANA Root Zone Database](https://www.iana.org/domains/root/db)
- [Create DNS Records | Cloudflare Docs](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [Search Trademarks | USPTO](https://www.uspto.gov/trademarks/search)
- [Global Brand Database | WIPO](https://branddb.wipo.int/)
- [Search for a Trademark | GOV.UK](https://www.gov.uk/search-for-trademark)
