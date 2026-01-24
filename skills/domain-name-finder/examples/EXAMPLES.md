# Domain Name Finder - Real-World Examples

Walkthrough examples showing the 7-phase workflow in action.

## Example 1: SaaS Project Management Tool

**Context:** Startup building an AI-powered project management SaaS. Budget:
$100-200. Target: B2B tech companies.

### Phase 1: Requirements Gathering

**Project type:** SaaS (B2B) **Budget:** $100-200 (willing to pay for premium
.io) **TLD preferences:** .io (tech), .ai (trendy), open to .com if affordable
**Naming style:** Brandable, compound words, tech-focused **Length:** Short (6-8
letters preferred) **Keywords:** task, flow, project, sync, mind, brain, ai,
auto

### Phase 2: Brainstorming

Generated 30 names using brainstorming techniques:

**Descriptive:**

- TaskFlow.io, ProjectSync.com, AutoTask.ai
- TaskMind.io, ProjectBrain.com

**Brandable/Compound:**

- Velora.io, Zenify.app
- Taskly.io, Flowstate.ai
- Synq.io, Projx.com

**Creative:**

- TaskFlow.io ✓ (our favorite)
- Velora.io ✓ (backup)
- ZenFlow.app

**Final list to check:**

1. taskflow.io
2. velora.io
3. zenflow.app
4. taskly.io
5. synq.io

### Phase 3: Trademark Screening

```bash
npx -y bun run scripts/check-trademarks.ts taskflow velora zenflow taskly synq
```

**Results:**

```
✅ taskflow    RISK: LOW
   USPTO: 0 result(s)
   EUIPO: 0 result(s)
   Web: 3 active businesses

✅ velora      RISK: LOW
   USPTO: 0 result(s)
   EUIPO: 0 result(s)
   Web: 1 active businesses

⚠️ zenflow    RISK: MEDIUM
   USPTO: 2 potential match(es)
   EUIPO: 1 potential match(es)
   Web: 8 active businesses

❌ taskly      RISK: HIGH
   USPTO: 15 potential match(es)
   Conflicts: USPTO: 15 potential match(es)

✅ synq        RISK: LOW
   USPTO: 1 potential match(es)
   Web: 2 active businesses
```

**Decision:** Eliminate `zenflow` and `taskly`. Focus on `taskflow`, `velora`,
`synq`.

### Phase 4: Domain Availability

```bash
npx -y bun run scripts/check-dns.ts taskflow.io velora.io synq.io
npx -y bun run scripts/check-whois.ts taskflow.io velora.io synq.io
```

**Results:**

```
❌ taskflow.io   REGISTERED
   Registrar: GoDaddy
   Created: 2019-05-15
   Expires: 2025-05-15
   Nameservers: ns1.digitalocean.com

✅ velora.io    AVAILABLE
   No DNS records found
   No WHOIS data

❌ synq.io      REGISTERED
   Registrar: Namecheap
   Created: 2021-03-10
```

**Decision:** `velora.io` is available! Check .com and alternatives.

**Additional checks:**

```bash
npx -y bun run scripts/check-dns.ts velora.com taskflow.com
```

**Results:**

- `velora.com`: Premium ($4,500) - over budget
- `taskflow.com`: Taken, but listed for sale ($2,000)

**Revised finalists:**

1. `velora.io` (available, $35/year)
2. `velora.app` (check availability)
3. `veloura.io` (creative spelling variation)

### Phase 5: Analysis and Scoring

| Domain     | Brandability | Trademark Risk | SEO | Budget | Marketing | Total  |
| ---------- | ------------ | -------------- | --- | ------ | --------- | ------ |
| velora.io  | 9            | 9              | 7   | 10     | 8         | **43** |
| velora.app | 9            | 9              | 6   | 9      | 8         | **41** |
| veloura.io | 7            | 8              | 5   | 10     | 6         | **36** |

**Winner:** `velora.io`

### Phase 6: Deep Dive

**Velora.io breakdown:**

- **Pronunciation:** veh-LOR-ah (3 syllables, flows well)
- **Meaning:** "velo" (speed/velocity) + "ora" (gold/speak) - evokes speed and
  value
- **Associations:** Similar to Aurora, Valor, Velour - positive connotations
- **Trademark:** Low risk, no conflicts
- **Domain history:** Clean (checked Wayback Machine - no previous use)
- **Social handles:** Check availability

```bash
npx -y bun run scripts/check-social.ts velora
```

**Social availability:**

```
velora
  ✅ Twitter/X     AVAILABLE
  ✅ Instagram     AVAILABLE
  ✅ GitHub        AVAILABLE
  ✅ LinkedIn      AVAILABLE
  ✅ YouTube       AVAILABLE
  Summary: 5/5 available, 0/5 taken
```

**Marketing angles:**

- Tagline: "Velocity for your projects"
- Logo potential: V with motion lines, gold/orange gradient
- Competitors: No direct conflicts

### Phase 7: Registration

**Recommended registrar:** Cloudflare (at-cost pricing, free WHOIS privacy)

**Registration:**

- Domain: velora.io
- Cost: $35/year × 2 years = $70
- WHOIS privacy: Free
- Auto-renewal: Enabled

**Defensive registrations:**

- velora.tech ($10/year) - for blog/docs
- velora.app ($15/year) - for mobile app

**Post-registration:**

- Set up DNS for Vercel hosting
- Configure Google Workspace email
- Secure social handles: @velora on all platforms
- Consider trademark filing ($225-400) if product takes off

---

## Example 2: E-commerce Store (Niche Coffee)

**Context:** Artisan coffee subscription service. Budget: $50-100. Target:
Coffee enthusiasts.

### Phase 1: Requirements

**Project type:** E-commerce (D2C) **Budget:** $50-100 **TLD:** .com preferred
(trust), .store if .com unavailable **Naming style:** Descriptive, memorable,
coffee-related **Length:** Medium (8-12 letters okay) **Keywords:** brew, bean,
roast, cup, java, grind, pour, craft

### Phase 2: Brainstorming

**Descriptive:**

- CraftBeanCoffee.com
- DailyRoast.com
- PourOverCoffee.com

**Brandable:**

- BeanBrewery.com
- RoastRise.com
- CupCraft.club

**Creative:**

- Brewtality.com ✓
- JavaJive.club ✓
- RoastRoute.com ✓

### Phase 3: Trademarks

```bash
npx -y bun run scripts/check-trademarks.ts brewtality javajive roastroute
```

**Results:**

- `brewtality`: LOW risk (1 web result - inactive blog)
- `javajive`: HIGH risk (8 USPTO matches, "Java Jive" is common phrase)
- `roastroute`: MEDIUM risk (3 similar marks)

**Decision:** Focus on `brewtality.com`, `roastroute.com`

### Phase 4: Availability

```bash
npx -y bun run scripts/check-dns.ts brewtality.com roastroute.com
```

**Results:**

- `brewtality.com`: AVAILABLE
- `roastroute.com`: Taken (parked page)

**Winner:** `brewtality.com` ($12.98/year at Namecheap)

### Phase 5: Scoring

| Domain         | Brandability | Trademark | SEO | Budget | Marketing | Total  |
| -------------- | ------------ | --------- | --- | ------ | --------- | ------ |
| brewtality.com | 8            | 8         | 9   | 10     | 8         | **43** |

**Fits all criteria well.**

### Phase 6: Deep Dive

**Brewtality.com:**

- **Pronunciation:** brew-TAL-i-ty (4 syllables, memorable)
- **Meaning:** Brew + Brutality (edgy, intense flavor)
- **Target appeal:** Younger coffee drinkers, craft enthusiasts
- **SEO:** Contains "brew" - good for search
- **Social handles:**

```bash
npx -y bun run scripts/check-social.ts brewtality
```

**Social availability:**

- Twitter: Available
- Instagram: Available
- GitHub: Available
- LinkedIn: Available
- YouTube: Available

**Perfect match across all platforms.**

### Phase 7: Registration

**Registrar:** Namecheap (good support, free WHOIS privacy)

**Registration:**

- brewtality.com: $12.98 (first year)
- Auto-renewal: Enabled
- WHOIS privacy: Free

**DNS setup:**

- Point to Shopify store
- Set up Google Workspace email
- Secure @brewtality social handles

---

## Example 3: Personal Brand (Freelance Developer)

**Context:** Full-stack developer building personal brand. Budget: $20-50.
Target: Potential clients, employers.

### Phase 1: Requirements

**Project type:** Personal brand / portfolio **Budget:** $20-50 **TLD:** .com,
.dev, .me acceptable **Naming style:** Name-based or professional handle
**Length:** Short to medium **Keywords:** [First name] [Last name], dev, code,
build

### Phase 2: Brainstorming

**Name-based:**

- alexrivera.com (taken)
- arivera.dev (available?)
- alexriveradev.com (available?)

**Professional handle:**

- codebyalex.com
- alexbuilds.dev
- madebyalex.dev

### Phase 3: Trademarks

```bash
npx -y bun run scripts/check-trademarks.ts alexrivera codebyalex alexbuilds
```

**Results:** All LOW risk (personal names have less trademark protection)

### Phase 4: Availability

```bash
npx -y bun run scripts/check-dns.ts alexrivera.com arivera.dev alexriveradev.com codebyalex.com
```

**Results:**

- alexrivera.com: Premium ($2,500)
- arivera.dev: AVAILABLE
- alexriveradev.com: AVAILABLE
- codebyalex.com: AVAILABLE

**Decision:** `alexriveradev.com` (clear, professional)

### Phase 5: Scoring

| Domain            | Brandability | Trademark | SEO | Budget | Marketing | Total  |
| ----------------- | ------------ | --------- | --- | ------ | --------- | ------ |
| alexriveradev.com | 9            | 9         | 8   | 10     | 9         | **45** |
| arivera.dev       | 7            | 9         | 6   | 10     | 7         | **39** |
| codebyalex.com    | 8            | 9         | 7   | 10     | 8         | **42** |

**Winner:** `alexriveradev.com` (most professional)

### Phase 6: Deep Dive

**alexriveradev.com:**

- **Clear branding:** Name + "dev" - obvious what to expect
- **SEO:** Name-based, good for personal brand
- **Social handles:** Check @alexriveradev

### Phase 7: Registration

**Registrar:** Porkbun (lowest price)

**Registration:**

- alexriveradev.com: $9.13/year
- WHOIS privacy: Free
- 5-year registration: $45.65

**DNS setup:**

- Point to Vercel/Netlify portfolio
- Set up email forwarding
- Secure @alexriveradev on GitHub, LinkedIn, Twitter

---

## Key Takeaways

1. **Budget matters:** Premium .com domains cost thousands. Be open to .io,
   .dev, .app
2. **Trademark early:** Don't fall in love with a name that's legally risky
3. **Social handles:** Check them before committing - consistency matters
4. **Defensive registrations:** Secure related domains if budget allows
5. **WHOIS privacy:** Always get it (free at Cloudflare, Porkbun, Namecheap)
6. **Be patient:** Good names take time to find. Brainstorm 30+ to find 3-5 good
   ones
