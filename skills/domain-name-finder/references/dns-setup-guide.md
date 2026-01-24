# DNS Setup Guide

Configure DNS records to point your domain to hosting services, email providers,
and more.

## Quick Reference: Common Record Types

| Record Type | Purpose                                | Example                       |
| ----------- | -------------------------------------- | ----------------------------- |
| **A**       | Points domain to IPv4 address          | `velora.io` → `192.0.2.1`     |
| **AAAA**    | Points domain to IPv6 address          | `velora.io` → `2001:db8::1`   |
| **CNAME**   | Points domain to another domain        | `www.velora.io` → `velora.io` |
| **MX**      | Mail exchange (email routing)          | `velora.io` → `mx.zoho.com`   |
| **TXT**     | Text records (verification, SPF, DKIM) | Various                       |
| **NS**      | Nameservers (delegate DNS)             | `ns1.cloudflare.com`          |

## Common Setup Scenarios

### Scenario 1: Static Site on Vercel/Netlify

**For:** Next.js, React, static sites

**Vercel Setup:**

1. Go to Vercel project → Settings → Domains
2. Add your domain (e.g., `velora.io`)
3. Vercel provides DNS records to add:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: A
   Name: @
   Value: 76.76.21.123

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. Add these records at your registrar's DNS panel
5. Wait 5-30 minutes for propagation

**Netlify Setup:**

1. Go to Netlify site → Domain settings
2. Add custom domain
3. Netlify provides these records:

   ```
   Type: A
   Name: @
   Value: 75.2.70.75

   Type: A
   Name: @
   Value: 75.2.70.22

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Scenario 2: Using Cloudflare DNS

**Recommended** for performance and security.

**Setup:**

1. **Create Cloudflare account** (free tier)
2. **Add your site:**
   - Enter domain name
   - Select plan (Free is fine)
3. **Change nameservers** at registrar:
   - From: `ns1.registrar.com`, `ns2.registrar.com`
   - To: `bob.ns.cloudflare.com`, `lana.ns.cloudflare.com` (example)
4. **Wait 2-24 hours** for nameserver change to propagate
5. **Add DNS records** in Cloudflare dashboard:

   ```
   Type: A
   Name: @
   Content: 192.0.2.1 (your server IP)
   Proxy: Proxied (orange cloud) ✓

   Type: CNAME
   Name: www
   Content: velora.io
   Proxy: Proxied (orange cloud) ✓
   ```

**Benefits:**

- Free CDN (global content delivery)
- DDoS protection
- SSL certificate (automatic)
- Caching optimization
- Analytics

### Scenario 3: Email with Google Workspace

**For:** Professional email (hello@yourdomain.com)

**Setup:**

1. **Sign up for Google Workspace** ($6/user/month)
2. **Verify domain ownership** in Google Admin console
3. **Add these DNS records** at your registrar:

   **MX Records** (replace domain.com with your domain):

   ```
   Type: MX
   Name: @
   Priority: 1
   Content: ASPMX.L.GOOGLE.COM

   Type: MX
   Name: @
   Priority: 5
   Content: ALT1.ASPMX.L.GOOGLE.COM

   Type: MX
   Name: @
   Priority: 5
   Content: ALT2.ASPMX.L.GOOGLE.COM

   Type: MX
   Name: @
   Priority: 10
   Content: ALT3.ASPMX.L.GOOGLE.COM

   Type: MX
   Name: @
   Priority: 10
   Content: ALT4.ASPMX.L.GOOGLE.COM
   ```

   **TXT Records** (SPF - prevents spam spoofing):

   ```
   Type: TXT
   Name: @
   Content: v=spf1 include:_spf.google.com ~all
   ```

   **Verification Record** (temporary, for Google):

   ```
   Type: TXT
   Name: @
   Content: google-site-verification=XXXXXXXXXXXX
   ```

4. **Wait up to 48 hours** for MX records to propagate
5. **Verify in Google Admin console**
6. **Create user accounts** and start using email

### Scenario 4: Email Forwarding (Free Option)

**For:** Simple email forwarding without paying for hosting

**Options:**

**Cloudflare Email Routing** (Free):

1. Enable in Cloudflare dashboard → Email → Email Routing
2. Add destination email (e.g., yourname@gmail.com)
3. Create forwarding rules:
   - `hello@velora.io` → `yourname@gmail.com`
   - `info@velora.io` → `yourname@gmail.com`

**Porkbun Email Forwarding** (Free):

1. Go to Domain Management → Email Forwarding
2. Add forwarding rules
3. Unlimited forwards, free

**Namecheap Email Forwarding** (Free):

1. Go to Domain → Advanced DNS
2. Find "Email Forwarding" section
3. Add forwards

### Scenario 5: Custom Server (VPS/Dedicated)

**For:** Self-hosted applications, custom servers

**Setup:**

1. **Get server IP** from your hosting provider (DigitalOcean, AWS, etc.)
2. **Add A record** at registrar:
   ```
   Type: A
   Name: @
   Content: 203.0.113.10 (your server IP)
   TTL: 3600 (or default)
   ```
3. **Optional**: Add WWW CNAME:
   ```
   Type: CNAME
   Name: www
   Content: velora.io
   ```
4. **Configure web server** (Nginx, Apache) to respond to domain
5. **Set up SSL** with Let's Encrypt (certbot)

## DNS Propagation

**What it is:** Time for DNS changes to take effect worldwide

**Typical timeframe:** 5 minutes to 48 hours

**Check propagation:**

- https://dnschecker.org/
- https://whatsmydns.net/

**Factors:**

- TTL (Time To Live) settings
- ISP DNS caching
- Geographic DNS servers

**Best practices:**

- Set TTL low (300 seconds) before making changes
- Restore TTL to normal (3600+) after changes propagate
- Be patient - some ISPs cache longer than others

## DNS TTL Explained

**TTL (Time To Live):** How long DNS records are cached

**Guidelines:**

- **Default:** 3600 (1 hour) or 86400 (24 hours)
- **Before changes:** Lower to 300 (5 minutes)
- **After changes:** Restore to 3600+
- **Critical records:** Lower TTL (600-1800)

**Example:**

```
Type: A
Name: @
Content: 192.0.2.1
TTL: 3600
```

## Troubleshooting

### Domain Not Resolving

**Check:**

1. DNS records added correctly?
2. Nameservers correct?
3. Waited for propagation? (use dnschecker.org)
4. Browser cache cleared? (Cmd+Shift+R)
5. ISP DNS cached? (try Google DNS: 8.8.8.8)

### Email Not Working

**Check:**

1. MX records correct? (use mxtoolbox.com)
2. SPF record present?
3. Waited 48 hours for propagation?
4. Port 25 open? (for outgoing mail)
5. Email provider configured?

### SSL Certificate Issues

**Solutions:**

- Use Cloudflare (Universal SSL)
- Use Let's Encrypt (free)
- Wait 15-30 minutes for DNS propagation
- Check CAA records (if present)

### Subdomain Not Working

**Check:**

1. Wildcard DNS set? (\*.example.com)
2. Subdomain record added?
3. Web server configured for subdomain?
4. SSL certificate covers subdomain?

## Advanced Topics

### CNAME Flattening

**What it is:** Use CNAME-like behavior at root domain

**Providers:** Cloudflare, DNSimple

**Why:** Root domains (@) can't have CNAME records per DNS spec, but some
providers work around this

### DNSSEC

**What it is:** DNS Security Extensions - cryptographic signing

**When to use:** High-security requirements

**How:** Enable at registrar (if supported)

### Anycast DNS

**What it is:** Single IP routed to multiple servers worldwide

**Providers:** Cloudflare, AWS Route 53, Google Cloud DNS

**Benefits:** Faster resolution, DDoS resistance

## Tools and Resources

**DNS Propagation Checkers:**

- https://dnschecker.org/
- https://whatsmydns.net/

**MX Record Lookup:**

- https://mxtoolbox.com/

**DNS Lookup:**

- https://www.nslookup.io/

**SSL Testing:**

- https://www.ssllabs.com/ssltest/

**DNS Records Explained:**

- https://support.google.com/a/answer/140034

**Cloudflare DNS:**

- https://www.cloudflare.com/dns/

## Quick Checklist

After DNS setup:

- [ ] Domain resolves in browser
- [ ] WWW redirect works
- [ ] Email works (can send/receive)
- [ ] SSL certificate active
- [ ] SPF record present (for email)
- [ ] Subdomains configured (if needed)
- [ ] Propagation complete worldwide
- [ ] Set TTL back to normal
- [ ] Enable DNSSEC (optional)
- [ ] Document DNS settings for future reference
