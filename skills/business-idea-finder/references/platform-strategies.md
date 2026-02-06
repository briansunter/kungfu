# Platform Strategies

Detailed search strategies for each social platform to mine problem signals.

## Reddit

### Why Reddit

**Highest signal density** for business ideas. Users post detailed problems,
engage in discussions, and explicitly request solutions.

### Key Subreddits

**General entrepreneurship**:

- r/SomebodyMakeThis (50K+ members) - Direct idea requests
- r/SaaS (200K+ members) - B2B SaaS problems
- r/startups (400K+ members) - Startup challenges
- r/Entrepreneur (1M+ members) - Business problems
- r/IndieHackers (100K+ members) - Solo founder pain points
- r/smallbusiness (300K+ members) - SMB needs

**Niche-specific** (examples):

- r/marketing (500K+)
- r/realestate (500K+)
- r/ecommerce (200K+)
- r/webdev (500K+)
- r/devops (200K+)
- r/projectmanagement (50K+)
- r/freelance (200K+)

**Technical**:

- r/programming (2M+)
- r/webdev (500K+)
- r/devops (200K+)
- r/AskProgramming (500K+)
- r/learnprogramming (3M+)

### Search Operators

**Basic patterns**:

```
site:reddit.com "I wish there was" [keyword]
site:reddit.com "someone should build" [problem]
site:reddit.com "frustrated with" [tool]
site:reddit.com "hate" [software]
```

**Subreddit-specific**:

```
site:reddit.com/r/SomebodyMakeThis [industry]
site:reddit.com/r/SaaS "wish there was"
site:reddit.com/r/startups "problem" "tool"
```

**Engagement filtering**:

- Sort by "Hot" for recent high-engagement
- Sort by "New" for last 7 days
- Filter by >50 upvotes for strong signals
- Check comments for "me too" and "I'd pay for"

### Engagement Indicators

**Strong signal** (50+ upvotes):

- Widespread problem
- Ready market
- Validate quickly

**Medium signal** (20-49 upvotes):

- Niche problem
- Good for specific markets
- Worth investigating

**Weak signal** (<20 upvotes):

- May be venting
- One-off issue
- Check for specificity

### Search Workflows

**Workflow 1: Niche Deep Dive**

1. Pick niche (e.g., "project management for marketing agencies")
2. Search: `site:reddit.com/r/marketing "project management" "frustrated"`
3. Search: `site:reddit.com/r/SaaS "wish there was" "marketing agency" tool`
4. Sort by: Hot, then New (last 30 days)
5. Filter: 20+ upvotes, 5+ comments
6. Extract: Problem description, pain points, current workarounds

**Workflow 2: Problem Signal Mining**

1. Pick signal phrase (e.g., "I wish there was")
2. Search: `site:reddit.com "I wish there was" [niche]`
3. Vary phrase: "someone should build", "why doesn't anyone"
4. Check multiple subreddits
5. Compile: 30-50 signals with links

**Workflow 3: Competitor Gap Analysis**

1. Search: `site:reddit.com "[competitor] sucks" "hate [competitor]"`
2. Read complaints for missing features
3. Search: `site:reddit.com "alternative to [competitor]"`
4. Identify: Unmet needs, feature gaps, pricing complaints

### Example Queries

**B2B SaaS ideas**:

```
site:reddit.com/r/SaaS "I wish there was" CRM tool
site:reddit.com/r/startups "someone should build" project management
site:reddit.com "frustrated with" invoicing software
```

**Developer tools**:

```
site:reddit.com/r/programming "hate" API documentation
site:reddit.com/r/devops "manual" "deployment" "pain"
site:reddit.com/r/webdev "wish there was" testing tool
```

**E-commerce**:

```
site:reddit.com/r/ecommerce "inventory" "spreadsheet" "nightmare"
site:reddit.com/r/shopify "frustrated with" analytics
site:reddit.com/r/Entrepreneur "manual" "order fulfillment"
```

### Pro Tips

- Use Reddit's native search with filters (time, upvotes)
- Check "rising" posts for emerging problems
- Look for detailed comments (500+ words) = deep pain
- Check OP's comment history for recurring problems
- Look for "I'm a developer, thinking about building..." posts

## HackerNews

### Why HackerNews

**Technical and B2B focus**. High-value audience (developers, founders,
decision-makers). "Ask HN" posts explicitly request tools and solutions.

### High-Signal Content

**"Ask HN" posts**:

- "Ask HN: Looking for a tool to [task]"
- "Ask HN: How do you manage [problem]?"
- "Ask HN: Best way to [technical challenge]?"

**Comment patterns**:

- Detailed workflows
- Tool comparisons
- "I built my own" = opportunity
- "I'd pay for" in discussions

**Show HN failures**:

- Low-upvote "Show HN" = weak product-market fit
- Comments saying "I need X instead"

### Search Operators

**Basic patterns**:

```
site:news.ycombinator.com "Ask HN" looking for [tool]
site:news.ycombinator.com "Ask HN" [problem] tool
site:news.ycombinator.com "how do you" [task]
site:news.ycombinator.com "what do you use for" [task]
```

**Technical focus**:

```
site:news.ycombinator.com "Ask HN" API [task]
site:news.ycombinator.com "Ask HN" database [problem]
site:news.ycombinator.com "Ask HN" devops [challenge]
```

### Engagement Indicators

**Strong signal** (50+ upvotes on "Ask HN"):

- Widespread technical problem
- B2B audience = willing to pay
- Developer pain = high-value

**Medium signal** (20-49 upvotes):

- Niche technical problem
- Specific workflow challenge

**Check comments**:

- 10+ comments with detailed solutions
- "I've been doing X for years..." = entrenched problem
- "I built a script for this..." = opportunity

### Search Workflows

**Workflow 1: "Ask HN" Mining**

1. Search: `site:news.ycombinator.com "Ask HN" looking for [tool type]`
2. Vary: "best way to", "how do you", "any tool for"
3. Filter: Last 30 days, 20+ upvotes
4. Read: Top 10 comments for workflows and pain
5. Extract: Problem, current solutions, gaps

**Workflow 2: Technical Pain Points**

1. Search: `site:news.ycombinator.com "painful" [technical task]`
2. Search: `site:news.ycombinator.com "manually" [automation target]`
3. Look for: "I built my own", "wrote a script"
4. Extract: Workflow details, frequency, value

**Workflow 3: Show HN Gap Analysis**

1. Browse: "Show HN" posts with <50 upvotes
2. Read: Comments for "I need X", "missing feature"
3. Identify: What's missing, what should be built

### Example Queries

**API tools**:

```
site:news.ycombinator.com "Ask HN" API documentation tool
site:news.ycombinator.com "Ask HN" API testing framework
site:news.ycombinator.com "painful" API integration
```

**DevOps**:

```
site:news.ycombinator.com "Ask HN" deployment automation
site:news.ycombinator.com "manually" server management
site:news.ycombinator.com "hate" Kubernetes "complexity"
```

**Developer workflows**:

```
site:news.ycombinator.com "Ask HN" code review tool
site:news.ycombinator.com "how do you" code reviews
site:news.ycombinator.com "spreadsheet" "engineering metrics"
```

### Pro Tips

- HN audience is technical → focus on B2B/developer tools
- Comments often contain "I built [alternative]" = competitor intelligence
- Look for "Show HN: [tool I built]" → study what works/doesn't
- Check "Who is hiring" threads → skill gaps = tool opportunities
- High-upvote comments = validated pain points

## Twitter/X

### Why Twitter

**Real-time frustration**. Users complain about tools immediately after bad
experiences. High volume, requires filtering.

### High-Signal Content

**Tool complaints**:

- "I hate [tool]"
- "[Tool] is so clunky"
- "Why doesn't [tool] have [feature]"

**Workflow frustration**:

- "Why is it so hard to [task]"
- "Spent 3 hours [manual task]"
- "Can't believe we still have to [painful task]"

**Tool switching**:

- "Just switched from [tool] to [tool]"
- "Looking for [tool] alternative"
- "[Tool] competitor recommendations?"

### Search Operators

**Basic patterns**:

```
"I hate" [tool type]
"why is it so hard to" [task]
"annoying that" [software]
"frustrated with" [tool]
"still using" [legacy tool]
```

**Advanced patterns**:

```
"can't believe" [tool] "doesn't" [feature]
"[tool] is overkill for" [use case]
"[tool] keeps breaking" [feature]
"wish there was a tool" [task]
```

### Engagement Indicators

**Strong signal** (100+ likes):

- Widespread frustration
- Resonates with broad audience
- High viral potential

**Medium signal** (50-99 likes):

- Niche frustration
- Specific audience pain

**Check replies**:

- 10+ replies saying "me too" = shared pain
- Replies with alternatives = competitive landscape
- Replies with "I'm building this" = market opportunity

### Search Workflows

**Workflow 1: Complaint Mining**

1. Search: `"I hate" [tool category]`
2. Vary: "frustrated with", "annoying that", "clunky"
3. Filter: Last 7 days, 50+ likes
4. Read: Replies for context and alternatives
5. Extract: Specific pain points, missing features

**Workflow 2: Workflow Frustration**

1. Search: `"why is it so hard to" [task]`
2. Vary: "spend so much time", "still manually"
3. Look for: Process descriptions, tool stacks
4. Extract: Manual steps, integration gaps

**Workflow 3: Tool Alternatives**

1. Search: `"alternative to" [competitor]`
2. Search: `"switching from" [competitor]`
3. Read: Why they're leaving, what they want
4. Extract: Feature gaps, pricing complaints, UX issues

### Example Queries

**Project management**:

```
"I hate" project management software
"why is it so hard to" project tracking
"frustrated with" Jira "complexity"
"alternative to" Asana
```

**CRM**:

```
"annoying that" CRM "slow"
"Hate Salesforce" "expensive"
"looking for" CRM "alternative"
"CRM" "too complicated" "small business"
```

**Developer tools**:

```
"I hate" API documentation tools
"frustrated with" Postman
"why is it so hard to" deploy code
"manual" "testing" "painful"
```

### Pro Tips

- Twitter is high-noise → filter aggressively (50+ likes)
- Search for exact tool names → see real-time complaints
- Check author's profile → target customer validation
- Look for threads (tweet storms) → detailed workflows
- Recent tweets (last 7 days) = current pain

## Threads

### Why Threads

**Informal, casual needs**. Lower barrier to post = more raw problems. Less
polished, more authentic frustration.

### High-Signal Content

**Casual requests**:

- "someone should build" [idea]
- "I need" [solution]
- "why doesn't" [software] [feature]

**Daily complaints**:

- "annoying that" [tool]
- "why is it so hard" [task]
- "still using" [manual method]

### Search Operators

**Basic patterns**:

```
"someone should build" [idea]
"I need" [solution]
"why doesn't" [software] [feature]
"annoying that" [tool]
"hard to" [task]
```

### Engagement Indicators

**Strong signal** (50+ likes):

- Shared daily frustration
- Common problem
- Good for consumer apps

**Medium signal** (20-49 likes):

- Niche problem
- Worth investigating

**Check replies**:

- 5+ replies with "+1" = shared pain
- Replies with suggestions = competitors
- Replies saying "me too" = validation

### Search Workflows

**Workflow 1: Informal Need Detection**

1. Search: `"someone should build" [idea]`
2. Search: `"I need" [solution type]`
3. Filter: Last 7 days, 20+ likes
4. Read: Thread for context and replies
5. Extract: Problem description, desired solution

**Workflow 2: Daily Frustration**

1. Search: `"annoying that" [tool]`
2. Search: `"why is it so hard" [task]`
3. Look for: Process complaints, workarounds
4. Extract: Specific pain points, frequency

### Example Queries

```
"someone should build" habit tracker app
"I need" better email client
"why doesn't" Instagram "have" scheduling
"annoying that" Slack "notifications"
```

### Pro Tips

- Threads is newer → less competition for signals
- Casual tone → more honest complaints
- Shorter posts → need to read thread for detail
- Combine with other platforms for validation

## Product Hunt

### Why Product Hunt

**Gap analysis**. See what's launching, what's missing, and what's not working.
Low-engagement launches show weak product-market fit.

### High-Signal Content

**Low-engagement launches**:

- <50 upvotes = weak product-market fit
- Comments asking for missing features
- Launches in problem-rich niches

**Feature requests**:

- "I wish this had [feature]"
- "Missing [capability]"
- "[Competitor] is better because..."

### Search Workflows

**Workflow 1: Gap Analysis**

1. Browse: Recent launches in your niche
2. Sort: Least upvoted first
3. Read: Comments for missing features
4. Identify: What should be built

**Workflow 2: Feature Mining**

1. Browse: Top launches in niche
2. Read: Comments for "missing X", "needs Y"
3. Extract: Feature gaps, improvement opportunities

**Workflow 3: Competitor Analysis**

1. Search: [competitor name] or [category]
2. Read: Launch comments
3. Extract: Complaints, feature requests, pricing feedback

### Engagement Indicators

**Strong opportunity**:

- <50 upvotes on launch in problem-rich niche
- Comments with "I need X instead"
- Multiple mentions of missing feature

**Weak opportunity**:

- High upvotes, positive comments = solved problem
- General consumer app (hard to differentiate)

### Pro Tips

- Focus on B2B categories (higher success rate)
- Read comments, not descriptions (complaints = opportunities)
- Look for "launching after X months" = timeline data
- Check hunter/follower count = audience validation

## IndieHackers

### Why IndieHackers

**Revenue validation data**. Real founders share numbers, problems, and what's
working. "Would pay for" discussions indicate market willingness.

### High-Signal Content

**Unsolved problems**:

- "Unsolved problems in [niche]"
- "What problems are you still facing?"
- "What would you pay for?"

**Revenue data**:

- "Making $X/month with [tool]"
- "[Niche] customers pay $X for [solution]"
- Pricing discussions

**Pivot stories**:

- "Why I pivoted from [idea A] to [idea B]"
- "What didn't work" = avoid these

### Search Operators

**Basic patterns**:

```
site:indiehackers.com "would pay for" [problem]
site:indiehackers.com "unsolved problems" [niche]
site:indiehackers.com "wish I had a tool" [task]
site:indiehackers.com "revenue" [niche]
```

### Engagement Indicators

**Strong signal** (20+ upvotes):

- Community-wide problem
- Validated by multiple founders
- B2B audience = willing to pay

**Check comments**:

- Revenue numbers = market size data
- Pricing discussions = willingness to pay
- "I built [alternative]" = competition

### Search Workflows

**Workflow 1: Unsolved Problems**

1. Search: `site:indiehackers.com "unsolved problems" [niche]`
2. Filter: Last 90 days, 10+ upvotes
3. Read: Top comments for details
4. Extract: Problem list, revenue potential

**Workflow 2: Willingness to Pay**

1. Search: `site:indiehackers.com "would pay for" [problem]`
2. Search: `site:indiehackers.com "pay" [solution]`
3. Extract: Pricing ranges, budget data

**Workflow 3: Revenue Validation**

1. Search: `site:indiehackers.com "making" "revenue" [niche]`
2. Read: What's working, what's not
3. Extract: Business models, pricing, audience

### Example Queries

```
site:indiehackers.com "would pay for" CRM tool
site:indiehackers.com "unsolved problems" SaaS
site:indiehackers.com "revenue" "project management" tool
```

### Pro Tips

- IndieHackers = B2B/micro-SaaS focus
- Revenue data = real market validation
- Comments from successful founders = mentorship
- Look for "I interviewed 50 customers" = validated problems

## Cross-Platform Strategy

### Validation Approach

**Signal amplification** = same problem on 3+ platforms = strong opportunity

**Workflow**:

1. Find signal on Reddit (50+ upvotes)
2. Search Twitter for similar complaints
3. Check IndieHackers for revenue data
4. Validate on Product Hunt (gap analysis)

**Prioritization**:

- Mentioned on 3+ platforms = top priority
- Recent (last 30 days) on all platforms = current pain
- High engagement on all = widespread problem

### Platform Strengths

| Platform         | Strength                         | Use For               |
| ---------------- | -------------------------------- | --------------------- |
| **Reddit**       | Highest signal density           | Primary discovery     |
| **HackerNews**   | Technical/B2B focus              | Developer tools       |
| **Twitter/X**    | Real-time frustration            | Competitor complaints |
| **Threads**      | Casual, informal needs           | Consumer apps         |
| **Product Hunt** | Gap analysis                     | Feature validation    |
| **IndieHackers** | Revenue validation, pricing data | Willingness to pay    |

### Search Sequencing

**Week 1**: Reddit + HackerNews (high-signal platforms) **Week 2**: Twitter +
Threads (real-time validation) **Week 3**: Product Hunt + IndieHackers (market
validation)

**Deliverable**: 30-50 signals with cross-platform validation

## Sources

- [How to Get Startup Ideas | Paul Graham](https://paulgraham.com/startupideas.html)
- [Do Things that Don't Scale | Paul Graham](https://paulgraham.com/ds.html)
- [Market Research and Competitive Analysis | U.S. SBA](https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis)
- [Google Trends](https://trends.google.com/trends/)
- [Reddit Content Policy](https://www.redditinc.com/policies/content-policy)
- [Hacker News Guidelines](https://news.ycombinator.com/newsguidelines.html)
