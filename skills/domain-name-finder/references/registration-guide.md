# Domain Registration Guide

Step-by-step guide to registering your chosen domain name.

## Pre-Registration Checklist

Before registering, ensure you've:

- ✅ Verified domain availability (Phase 4)
- ✅ Completed trademark screening (Phase 3)
- ✅ Selected your preferred registrar
- ✅ Decided on registration length (1-10 years)
- ✅ Prepared payment method

## Step-by-Step: Cloudflare Registration

**Recommended** for privacy and pricing.

### 1. Create Account

1. Go to https://dash.cloudflare.com/sign-up
2. Enter email, create password
3. Verify email address

### 2. Search for Domain

1. In Cloudflare dashboard, click "Register a new domain"
2. Enter your domain name (e.g., `velora.io`)
3. Click "Search"

### 3. Add to Cart

1. If available, click "Add"
2. Review price (at-cost, no markup)
3. Adjust registration length (1-10 years)

### 4. Configure Domain

**WHOIS Contact Information:**

- Fill in accurate contact details
- Use real info (ICANN requirement)
- WHOIS privacy is automatic and free

**DNS Settings:**

- Choose "Use Cloudflare DNS" (recommended)
- Or "Use third-party DNS" if using different host

### 5. Checkout

1. Review order
2. No upsells to skip
3. Enter payment info
4. Complete purchase

### 6. Post-Registration

1. **Receive confirmation email** with:
   - Order details
   - Access instructions
   - Transfer auth code (save this)

2. **Set up DNS records** (see `dns-setup-guide.md`)

3. **Enable auto-renewal**:
   - Go to Billing > Subscriptions
   - Enable auto-renew

4. **Enable 2FA**:
   - Go to My Profile > Authentication
   - Enable two-factor authentication

## Step-by-Step: Porkbun Registration

**Best for** lowest prices.

### 1. Create Account

1. Go to https://porkbun.com/
2. Enter username, email, password
3. Verify email address

### 2. Search for Domain

1. Enter domain name in search box
2. View results (available or taken)
3. Click "Add" if available

### 3. Checkout

1. Review cart
2. **Skip upsells** (email hosting, SSL certificates, etc.)
3. WHOIS privacy is auto-added (free)
4. Enter payment info
5. Complete purchase

### 4. Configure DNS

1. Go to "Domain Management"
2. Click your domain
3. Add DNS records (see `dns-setup-guide.md`)

## Step-by-Step: Namecheap Registration

**Best for** phone support.

### 1. Create Account

1. Go to https://www.namecheap.com/account/signup/
2. Enter email, create password
3. Verify email address

### 2. Search for Domain

1. Enter domain name
2. View pricing
3. Click "Add to Cart"

### 3. Checkout

**Watch for upsells** - decline these:

- 🚫 WHOIS PrivacyGuard Plus (standard is free)
- 🚫 Email hosting (set up separately)
- 🚫 SSL certificate (use Let's Encrypt free)
- 🚫 SEO listing (unnecessary)

**Keep these:**

- ✅ Free WHOIS Privacy (auto-included)
- ✅ Domain registration

### 4. Configure

1. Go to "Domain List" > "Manage"
2. Configure DNS (see `dns-setup-guide.md`)
3. Enable auto-renewal

## Common Registration Issues

### Payment Declined

**Causes:**

- International transaction (call bank)
- High fraud risk (use different payment method)
- Daily limit exceeded (try tomorrow)

**Solutions:**

- Use PayPal
- Use credit card (not debit)
- Call bank to authorize

### Domain Already in Cart

**Issue:** Domain reserved by another user

**Solution:**

- Wait 15-30 minutes (reservation expires)
- Try different registrar

### WHOIS Verification Required

**Issue:** ICANN requires email verification

**Solution:**

- Check email for verification link
- Click within 15 days or domain suspends
- Add `@icann.org` to contacts

### Registration Failed

**Causes:**

- Registry error (temporary)
- TLD restrictions (e.g., .us requires US address)
- Premium domain (higher price)

**Solutions:**

- Try again in 1-2 hours
- Check TLD requirements
- Contact registrar support

## Post-Registration Checklist

### Immediate (Day 1)

- [ ] Save confirmation email and receipt
- [ ] Save transfer auth code (EPP code)
- [ ] Enable 2FA on registrar account
- [ ] Configure DNS records
- [ ] Set up email forwarding or hosting
- [ ] Secure matching social handles

### Short-term (Week 1)

- [ ] Add to password manager
- [ ] Set calendar reminder for renewal
- [ ] Consider defensive registrations (typos, other TLDs)
- [ ] Update business cards/marketing materials
- [ ] Set up professional email (hello@domain.com)

### Ongoing

- [ ] Monitor domain expiration date
- [ ] Keep contact info updated
- [ ] Lock domain (prevent unauthorized transfers)
- [ ] Review auto-renewal settings
- [ ] Monitor for trademark conflicts

## Defensive Registrations

**Consider registering:**

- **Primary TLD variations:** .com, .io, .ai, .co
- **Common typos:** e.g., goggle.com for google.com
- **Hyphenated version:** task-flow.com for taskflow.com
- **Country TLDs:** .us, .uk, .ca if targeting those markets

**Cost-benefit:**

- Budget: Register primary only
- Growth stage: Add 1-2 variations
- Established brand: Secure 5-10 defensive domains

## Transferring Later

**If you want to move registrars:**

1. **Unlock domain** at current registrar
2. **Get auth code** (EPP code)
3. **Initiate transfer** at new registrar
4. **Approve transfer** emails (both sides)
5. **Wait 5-7 days**

**Cost:** Extends registration by 1 year (pay at new registrar)

**Restrictions:**

- Cannot transfer within 60 days of registration
- Domain must be unlocked
- Whois privacy must be disabled temporarily

## Internationalized Domain Names (IDNs)

**What they are:** Domain names with non-ASCII characters (e.g., café.com)

**Registration:**

- Enter punycode version (xn--caf-dma.com)
- Most registrars support IDNs
- Display varies by browser/email

**Considerations:**

- May not work in all browsers
- Email compatibility issues
- Risk of confusion with ASCII version

## Resources

- **ICANN Registrar Accreditation**:
  https://www.icann.org/resources/pages/accreditation-2012-02-25-en
- **Cloudflare Registrar**: https://www.cloudflare.com/products/registrar/
- **Porkbun**: https://porkbun.com/
- **Namecheap**: https://www.namecheap.com/

## Sources

- [ICANN Lookup](https://lookup.icann.org/en)
- [IANA Root Zone Database](https://www.iana.org/domains/root/db)
- [Create DNS Records | Cloudflare Docs](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [Search Trademarks | USPTO](https://www.uspto.gov/trademarks/search)
- [Global Brand Database | WIPO](https://branddb.wipo.int/)
- [Search for a Trademark | GOV.UK](https://www.gov.uk/search-for-trademark)
