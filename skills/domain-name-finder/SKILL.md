---
name: domain-name-finder
description: Generate, research, verify, and rank domain names with current registration checks, trademark-risk screening, language and security review, social-handle research, and registration guidance. Use whenever the user needs a product, company, app, project, or personal-brand name or wants to compare domains.
category: business
license: MIT
compatibility: Optional Bun scripts; live web access is required for current registration, trademark, price, and platform checks.
---

# Domain Name Finder

Produce names that fit the product and survive practical checks. Availability,
trademark risk, reputation, pronunciation, and renewal cost are separate
questions.

## Non-Negotiable Rules

- Use live checks immediately before recommending registration. Domain status
  and prices can change between research and checkout.
- For generic top-level domains, prefer **RDAP, registry, registrar, and ICANN
  Lookup**. Since January 28, 2025, RDAP is the definitive source for gTLD
  registration data. DNS absence is only a heuristic; a registered domain may
  have no DNS records.
- Trademark searching requires official database and broader-use review.
  Similarity in sound, appearance, meaning, and related goods/services can
  matter even when the exact string is absent.
- Never state “available,” “clear,” or “safe” from an error, timeout, missing
  DNS response, or a single database.
- Check the exact registrar checkout for premium status, first-year price,
  renewal price, transfer price, and registry restrictions.
- Do not register, bid, or spend money without explicit user authorization.

## Inputs

Infer from the product or repository, then establish:

- product, audience, positioning, and desired associations;
- target countries and languages;
- acceptable TLDs and annual renewal budget;
- naming style, length, keywords, and words to avoid;
- need for matching company name or social handles;
- launch urgency and tolerance for premium/aftermarket domains.

## Workflow

### 1. Create a Naming Brief

Summarize the product in one line, then define three to five naming territories
such as outcome, metaphor, category, invented word, founder story, or technical
concept. Add objective constraints and a rejection list.

### 2. Generate a Diverse Longlist

Generate 30 to 60 candidates across multiple techniques:

- clear compounds and phrases;
- evocative metaphors;
- invented but pronounceable words;
- roots from relevant languages, verified for meaning;
- abbreviations only when naturally spoken;
- modifier + category combinations.

Avoid indiscriminate misspellings, hard-to-hear letter sequences, hyphens,
numbers, accidental double letters, and names that depend on explaining the
spelling.

### 3. Run Fast Mechanical Checks

Use the bundled scripts as aids:

```bash
bun run scripts/check-all.ts candidate.com another.app
bun run scripts/check-dns.ts candidate.com
bun run scripts/check-whois.ts candidate.com
bun run scripts/check-social.ts candidate
```

- [`check-all.ts`](scripts/check-all.ts) aggregates signals; inspect each
  underlying result.
- [`check-dns.ts`](scripts/check-dns.ts) reports DNS state, not registration
  availability.
- [`check-whois.ts`](scripts/check-whois.ts) is a compatibility/fallback check.
  Prefer RDAP or registrar data when available.
- [`check-social.ts`](scripts/check-social.ts) can produce false positives
  because platforms rate-limit and change response behavior; verify finalists
  manually.

Record `registered`, `apparently unregistered`, `reserved/premium`, `unknown`,
or `error` rather than collapsing uncertainty into yes/no.

### 4. Screen Brand and Legal Risk

Run the helper, then verify official databases and broader use:

```bash
bun run scripts/check-trademarks.ts candidate another
```

[`check-trademarks.ts`](scripts/check-trademarks.ts) identifies search leads; it
does not determine legal status. Review the [trademark search
guide](references/trademark-search-guide.md), then search relevant official
databases, state/company registries where appropriate, app stores, search
engines, social platforms, and industry directories.

For each finalist record:

- identical and similar marks;
- goods/services and jurisdictions;
- active businesses and common-law use;
- similarity in sound, spelling, appearance, and meaning;
- confidence and whether counsel review is warranted.

### 5. Check Language, Voice, and Security

For finalists:

- say the name aloud and test phone/spoken recall;
- check common misspellings and autocorrect;
- review meanings and offensive associations in target languages;
- inspect Unicode, IDN, and homograph risk;
- check confusingly similar domains and impersonation potential;
- review historical use, search reputation, spam/blocklists, and archived pages;
- confirm email usability and whether the name looks credible in an invoice or
  app store.

### 6. Verify Registration and Cost

Use ICANN Lookup/RDAP plus at least one reputable registrar. Confirm:

- exact domain and punycode representation;
- registration status and registry restrictions;
- premium/aftermarket status;
- initial, renewal, and transfer price;
- WHOIS/RDAP privacy behavior;
- DNSSEC, account security, lock, and recovery options.

Use [the registrar comparison](references/registrars-comparison-2025.md) only as
a historical starting point; re-check current terms and pricing. Follow [the
registration guide](references/registration-guide.md) and [DNS setup
guide](references/dns-setup-guide.md) after purchase.

### 7. Rank Finalists

Score 0 to 5 with evidence:

| Criterion | Weight |
| --- | ---: |
| Strategic fit and distinctiveness | 3 |
| Pronunciation, spelling, and recall | 3 |
| Legal/brand risk | 3 |
| Verified registration and renewal cost | 2 |
| Cross-language and reputation safety | 2 |
| Search, social, and email usability | 1 |
| Security and impersonation risk | 1 |

Do not let availability dominate name quality. Include the best available option
and the best overall option even when they differ.

## Output Contract

Return:

1. naming brief and territories;
2. longlist grouped by style;
3. shortlist table with exact check time and sources;
4. detailed dossier for three to five finalists;
5. trademark-risk caveat and counsel triggers;
6. registration recommendation and backup choices;
7. next-step checklist.

See [worked examples](examples/EXAMPLES.md).

## Sources

- [ICANN Lookup](https://lookup.icann.org/en)
- [RDAP Is Now the Definitive Source for gTLD Registration Data |
  ICANN](https://www.icann.org/en/announcements/details/rdap-is-now-the-definitive-source-for-gtld-registration-data-27-01-2025-en)
- [Search Trademarks | USPTO](https://www.uspto.gov/trademarks/search)
- [Likelihood of Confusion |
  USPTO](https://www.uspto.gov/trademarks/search/likelihood-confusion)
- [Global Brand Database | WIPO](https://branddb.wipo.int/)
- [Unicode Security Considerations](https://www.unicode.org/reports/tr36/)
