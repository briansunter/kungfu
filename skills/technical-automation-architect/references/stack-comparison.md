# Tech Stack Comparison for Solo SaaS

**Source**: Report 3: Project Management & Technical Operations (lines 119-154)
**Confidence**: HIGH - Real-world stacks from successful solo founders

---

## Backend Frameworks

### Django (Python) ⭐ Recommended for Solo Founders

**Why it's great for solo**:

- "Like a superpower for solo developers"
- Batteries-included (admin, auth, ORM built-in)
- Conventions over configuration (fewer decisions)
- Predictable and mature (15+ years production-proven)
- Huge ecosystem (packages for everything)

**Best for**:

- Solo founders who know Python
- Rapid development (admin interface is massive time-saver)
- Data-heavy applications
- API backends

**Trade-offs**:

- Heavier than lightweight frameworks
- More opinionated (less flexibility)
- Python performance limits (not for high-throughput)

**Real-world examples**:

- Anthony N. Simon's solo SaaS: Django + PostgreSQL + Redis
- Multiple $100K+ ARR solo products built on Django

---

### Ruby on Rails

**Why it's great for solo**:

- Similar benefits to Django
- Convention over configuration
- Rapid development
- Mature ecosystem (gems for everything)
- Great for MVPs

**Best for**:

- Solo founders who know Ruby
- Web applications (CRUD-heavy)
- Startups needing fast iteration
- MVP to $1M ARR

**Trade-offs**:

- Performance limitations at scale
- Magical nature (harder to debug when things break)
- Declining popularity compared to Python/JS

---

### Go + HTMX + SQLite

**Why it's great for solo**:

- Extremely fast (performance)
- Simple deployment (single binary)
- HTMX avoids heavy JS frameworks
- SQLite = zero database ops
- Perfect for lean operations

**Best for**:

- Performance-conscious solo founders
- Simple, fast applications
- Lower hosting costs
- Developers who like minimalism

**Trade-offs**:

- Smaller ecosystem than Python/Ruby
- Fewer "batteries included"
- Manual implementation of some features

---

## Frontend Frameworks

### React + SWR

**Why it's great for solo**:

- Industry standard (hiring easier if needed)
- Massive ecosystem
- SWR for data fetching (simpler than Redux)
- Component reusability

**Best for**:

- Dashboards and admin panels
- Data-heavy UIs
- Complex user interfaces

**Trade-offs**:

- Build complexity (webpack, bundling)
- Heavy for simple sites
- Constant framework churn

---

### NextJS

**Why it's great for solo**:

- SSR for SEO (critical for marketing site)
- React for app (reuse skills)
- Vercel deployment (zero config)
- Great for landing pages + docs + blog

**Best for**:

- Landing pages
- Documentation sites
- Marketing websites
- Full-stack apps

**Trade-offs**:

- More complex than needed for simple apps
- Vercel lock-in (though excellent)

---

### HTMX

**Why it's great for solo**:

- Avoids heavy JavaScript
- Learn in weekend (vs months for React)
- Smaller bundle sizes
- Server-side rendering by default
- Perfect for boring business apps

**Best for**:

- CRUD applications
- Form-heavy workflows
- Solo founders wanting simplicity
- Rails/Django backends

**Trade-offs**:

- Not for complex interactive UIs
- Smaller community than React
- Limited component ecosystem

---

## Database Choices

### PostgreSQL ⭐ Recommended Default

**Why it's great**:

- Battle-tested (30+ years production)
- Sane defaults
- Rich feature set (JSON, full-text search, etc.)
- Free and open source
- Huge ecosystem

**Best for**:

- Primary application database
- Data requiring relational integrity
- Complex queries
- Production workloads

**Real-world**: Anthony N. Simon uses PostgreSQL for all solo SaaS products

---

### SQLite

**Why it's great**:

- Zero database operations
- Single file backups to S3
- Perfect for early stage
- Surprisingly capable

**Best for**:

- MVP and early traction (<$10K MRR)
- Read-heavy workloads
- Simplified deployment
- Testing and development

**Migration path**: Upgrade to PostgreSQL when you hit scale

---

### Redis

**Use cases**:

- Caching (reduce database load)
- Rate limiting
- Job queues (Sidekiq, Celery)
- Key/value store
- Session storage

**When you need it**:

- Performance optimization
- Background job processing
- Real-time features

---

## Infrastructure and Hosting

### Managed Hosting (Recommended)

**Vercel**:

- NextJS hosting
- Zero configuration
- Automatic HTTPS
- Global CDN
- Generous free tier

**Railway**:

- Simple deployment
- Supports multiple services
- Built-in database
- Good for full-stack apps

**Fly.io**:

- Deploy any language
- Global deployment
- Simple pricing
- Good for Dockerized apps

**Supabase**:

- Firebase alternative
- PostgreSQL included
- Auth built-in
- Real-time features
- Generous free tier

### Infrastructure as Code

**Docker**:

- Containerization
- Reproducible environments
- Simplified deployment
- Works with any cloud

**Terraform**:

- Infrastructure as code
- Disaster recovery
- Cloud migrations
- State management

**Kamal**:

- Simplified deployment tool
- Alternative to Kubernetes
- Used by solo founders post-K8s
- Zero-downtime deployments

---

## Complete Stack Examples

### Stack 1: The "Boring Python" Stack

```
Frontend: NextJS (landing) + React (app)
Backend: Django + Django REST Framework
Database: PostgreSQL
Cache: Redis
Hosting: Vercel (frontend) + Railway (backend)
Auth: Supabase Auth
Payments: Stripe
Email: Resend
```

**Best for**: Solo founders with Python experience

### Stack 2: The "Minimalist Go" Stack

```
Frontend: HTMX
Backend: Go + SQLite
Database: SQLite (migrate to PostgreSQL later)
Hosting: Fly.io
Auth: Go libraries (built-in)
Payments: Stripe
Email: Resend
```

**Best for**: Performance-conscious solo founders

### Stack 3: The "Rails Way" Stack

```
Frontend: Hotwire (Turbo + Stimulus)
Backend: Ruby on Rails
Database: PostgreSQL
Cache: Redis
Hosting: Render or Fly.io
Auth: Devise or Sorcery
Payments: Stripe or Paddle
Email: SendGrid
```

**Best for**: Solo founders with Ruby experience

---

## Decision Framework

### Choose Stack Based On:

1. **Existing Skills**: What do you already know?
2. **Problem Type**: CRUD vs real-time vs data-heavy
3. **Scale Expectations**: <1K users vs 10K+ users
4. **Time Constraints**: MVP in 4 weeks vs polish over months

### Avoid:

- New languages you'll need to learn
- Cutting-edge frameworks (use mature, stable tech)
- Complex architectures initially (microservices, K8s)

---

**Remember**: Best stack is the one you know deeply. Learning new tech costs 2-3
months of productivity.

---

**Source**: Full research at `/docs/ams/notes/research-indie-saas-business/`

- Report 3: Project Management & Technical Operations
