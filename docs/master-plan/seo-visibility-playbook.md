# The Complete SEO & Visibility Playbook

A practical guide to getting in front of customers without burning money on ads.

---

## The Uncomfortable Truth

This playbook works. But it requires six to twelve months before it compounds meaningfully. Most people quit at month three when traffic is still flat and nothing seems to be happening.

The ones who win are the ones who keep publishing and showing up after the initial motivation fades. The strategy isn't the hard part. The consistency is.

If you need customers next week, run paid ads. If you want a sustainable acquisition channel that compounds over time, this is the path.

---

## Part One: Understanding the Game

### What SEO Actually Is

SEO is convincing Google your page is the best answer for what someone searched. Google's job is showing the most helpful result. Your job is being that result.

Google ranks pages on three factors:

**Relevance** — does your page actually address the search query?

**Quality** — is the content genuinely useful and trustworthy?

**Authority** — do other credible sites vouch for you by linking to you?

### Keywords Explained

Keywords are the phrases people type into Google. Your task is discovering what potential customers search for, then creating pages that answer those searches better than anyone else.

**Short-tail keywords** like "coaching software" have massive volume but brutal competition. You won't rank for these early on, possibly ever.

**Long-tail keywords** like "online coaching software for personal trainers UK" have less volume but far less competition. This is where you win.

The shift in thinking: don't chase keywords, chase problems. "How to send meal plans to clients without email" is a frustrated person ready to pay for a solution.

### Backlinks Explained

A backlink is when another website links to yours. Google treats these as votes of confidence. More quality backlinks means higher rankings.

Quality matters more than quantity. One link from a respected industry blog beats fifty links from random directories.

How backlinks happen:

- You create something genuinely useful that others want to reference
- You write guest posts on other sites in your niche
- You get featured in "best of" roundup articles
- You build relationships with people who cover your industry
- You create tools, templates, or research worth citing

### On-Page vs Off-Page SEO

**On-page** is what you control directly:

- Title tags and meta descriptions
- Content structure and headings
- Page speed and mobile friendliness
- Internal linking between pages
- URL structure
- Schema markup

**Off-page** is everything external:

- Backlinks from other sites
- Brand mentions across the web
- Social media presence
- Reviews and reputation signals

### Paid Ads vs Organic

**Paid ads** deliver instant visibility. You pay, you appear. You stop paying, you disappear. It's renting attention.

**Organic** takes months to build but compounds indefinitely. Once you rank, traffic is essentially free. It's owning attention.

The smart approach: use paid ads to validate what converts while building organic in parallel. Once organic traffic materialises, reduce ad spend.

Paid ads don't directly boost SEO rankings. But brand awareness from ads can help indirectly — people who see ads might search your brand name later, signalling to Google you're legitimate.

### The New Game: AI Recommendations

There's a new layer now. When someone asks ChatGPT or Claude "what's a good tool for X", you want to be mentioned.

AI models learn about products from training data — Reddit discussions, blog posts, reviews, comparison articles, forum threads. They pick up on what gets mentioned frequently and positively in natural contexts.

So the strategy expands: be present in places AI training data comes from. Genuine Reddit threads. Indie Hackers discussions. Guest posts on industry blogs. YouTube reviews. Podcast mentions. The kind of organic presence that feels real because it is.

---

## Part Two: The Foundation

### The Website Stack

**Marketing site**: Astro + Sanity + Cloudflare Pages (or Vercel)

- Astro for the framework — static by default, blazing fast
- Sanity for content management — generous free tier, easy editing
- Cloudflare Pages for hosting — global CDN, essentially free

**Keep marketing site separate from your app.** Your Next.js or Vite web app lives at app.yourproduct.com or behind /login. Your marketing site is its own fast, lightweight, SEO-optimised thing.

This separation lets you optimise each for its purpose. Marketing sites need speed and SEO. Apps need interactivity and features.

### Core Pages

Every product needs these before you think about blog content:

**Homepage** — clear value proposition, who it's for, what problem it solves, one primary call to action.

**Features page** — what the product does, organised by benefit not feature list.

**Pricing page** — transparent, easy to understand, addresses objections.

**About/Story page** — who's behind this, why it exists. People buy from people.

### Technical SEO Baseline

Before creating content, get the foundations right:

**Google Search Console** — connect immediately. This shows what you rank for, technical issues, who links to you. Essential and free.

**Sitemap** — Astro generates this automatically with the sitemap plugin. Submit it in Search Console.

**Meta tags** — every page needs a unique title tag (under 60 characters) and meta description (under 160 characters). Pull these from Sanity fields.

**Open Graph tags** — for social sharing. Title, description, and image for each page.

**Fast load times** — static sites handle this inherently. Aim for under two seconds.

**Mobile friendly** — test everything on phones. Google uses mobile-first indexing.

**HTTPS** — non-negotiable. Cloudflare handles this automatically.

**Clean URLs** — `/features` not `/page?id=features`. Astro handles this naturally.

---

## Part Three: Research Before Writing

### Finding Your Twenty Keywords

Don't guess. Research what people actually search.

**Free tools:**

- Google Search Console (once you have traffic, shows what you rank for)
- Google autocomplete (type your topic, see what Google suggests)
- AnswerThePublic (shows questions people ask)
- Ubersuggest (limited free searches but useful)

**Paid tools worth considering:**

- Ahrefs (the gold standard, expensive)
- SEMrush (comprehensive, similar to Ahrefs)
- Keywords Everywhere (cheap browser extension)

### The "Jobs to Be Done" Frame

Instead of thinking "twenty keywords", think "twenty problems my users search when frustrated."

Someone searching "coaching software" might be browsing. Someone searching "how to stop clients ghosting on check-ins" has a problem they'll pay to solve.

Look for:

- Questions in forums and Reddit
- Complaints about existing solutions
- Specific frustrations people describe

These problem-aware searches convert better than generic terms.

### Validating Competitor Comparisons

Before writing "YourProduct vs Competitor" pages, verify people actually search for alternatives.

Check if "[Competitor] alternatives" or "[Competitor] vs" gets meaningful search volume. If nobody searches for the competitor, your comparison page serves no purpose.

Prioritise comparisons against competitors people actually know and search for.

### Mapping Keywords to Intent

Not all keywords equal:

**Informational** — "how to track macros" — person wants to learn. Good for blog posts, builds trust.

**Commercial investigation** — "best coaching software" — person is comparing options. Good for comparison pages.

**Transactional** — "CoachOS pricing" — person is ready to buy. Good for product pages.

Create content for all three types, but know that commercial and transactional keywords convert more directly.

---

## Part Four: Content Strategy

### The Content Hierarchy

**Tier one — conversion pages:**

- 3-5 comparison pages (YourProduct vs Competitor)
- 3-5 alternative pages (Competitor Alternatives)

These target people actively looking for solutions. Highest conversion potential.

**Tier two — problem-focused articles:**

- 10-15 articles targeting specific frustrations
- "How to [solve problem your product solves]"
- "Why [common pain point] happens and how to fix it"

These build trust and capture people earlier in their journey.

**Tier three — the linkable asset:**

- One genuinely valuable free resource
- Template, calculator, checklist, comprehensive guide, or tool
- Good enough that others reference and link to it

This earns backlinks passively over time.

### Writing Content That Ranks

**Depth over length.** A focused 1,500 word article beats a padded 4,000 word one. Cover the topic thoroughly, then stop.

**Answer the question fast.** Put the core answer near the top. Don't make people scroll through preamble.

**Use the words people search.** If people search "meal plan template", use that phrase, not "nutritional programming document".

**Add genuine expertise.** Share specific examples, real experiences, actual numbers. This is what AI-generated content can't replicate.

**Structure for scanning.** Clear headings, short paragraphs, logical flow. People skim before they read.

**No fluff.** Every sentence should add value. Cut ruthlessly.

### The Linkable Asset

This deserves special attention. One exceptional free resource can earn more backlinks than twenty blog posts.

Ideas that work:

- **Templates** — spreadsheets, documents, frameworks people actually use
- **Calculators** — tools that compute something useful
- **Comprehensive guides** — the definitive resource on a topic
- **Original research** — data or insights nobody else has
- **Free tools** — simple utilities that solve a specific problem

The test: would someone in your industry bookmark this and share it with colleagues?

Build this early. It works in the background while you create other content.

### Content That Won't Work

**AI-generated fluff.** Google actively penalises thin AI content. If it reads like every other article on the topic, it won't rank.

**Keyword stuffing.** Cramming keywords unnaturally hurts more than helps.

**Copycat content.** Rewriting what already ranks doesn't add value. Say something new or say it better.

**Clickbait without substance.** People bounce immediately, Google notices.

---

## Part Five: Distribution

Creating content is half the work. Getting it seen is the other half.

### Roundup Outreach

Search "best [your category] software" and find every article ranking on page one and two. These are your targets.

For each article:

1. Find the author's email (check their site, LinkedIn, Twitter)
2. Send a brief, personalised email introducing your product
3. Explain why it might be worth including
4. Make it easy — offer to provide screenshots, descriptions, whatever they need

Expect a low response rate. Maybe ten to twenty percent. But one inclusion in a high-ranking roundup can drive meaningful traffic and a valuable backlink.

### Guest Posting

Find blogs your target customers read. Not random sites, relevant ones.

The pitch:

- Show you've read their content
- Propose a specific topic that fits their audience
- Explain your relevant expertise
- Keep it brief

Write something genuinely useful, not a veiled advertisement. You get a byline, a backlink, and exposure to their audience.

Aim for two to three guest posts per product in the first six months.

### Reddit Strategy

Reddit can drive significant traffic if done right. It also bans self-promoters instantly.

**The approach:**

Months one and two — lurk and contribute. Answer questions helpfully. Share expertise. Build karma and history. Never mention your product.

Month three onward — when genuinely relevant, mention your product as one option among others. Be balanced, not salesy.

Find subreddits where your users hang out. For B2B SaaS, look for industry-specific communities, not just startup or entrepreneur subreddits.

Google now indexes Reddit heavily. A helpful comment in the right thread can rank and drive traffic for years.

### Podcast Outreach

Podcasts in your niche need guests constantly. Most hosts are hungry for interesting people to interview.

**Start small.** Tiny shows with a few hundred listeners accept guests easily. Build your interview skills here.

**Pitch the insight, not your product.** "I'd love to discuss how independent coaches can compete with big fitness apps" is better than "I'd like to tell your audience about my software".

**The compounding benefit:** Podcast show notes link to your site. That's a backlink. Episodes stay online forever. The host's audience discovers you.

Five small podcast appearances beats one big one you'll never land.

### Twitter/LinkedIn/Social

Social media has minimal direct SEO impact but builds the brand awareness that supports everything else.

What works:

- Building in public — sharing your journey as an indie maker
- Genuine expertise — specific insights about your industry
- Engaging with others in your space

What doesn't work:

- Pure self-promotion
- Generic motivational content
- Posting links and disappearing

Consistency matters more than volume. Three thoughtful posts weekly beats daily noise.

### YouTube Consideration

YouTube videos rank in Google. For some queries, video results dominate the page.

If you can create decent video content — tutorials, product comparisons, problem-solving walkthroughs — it's a powerful channel.

The barrier is higher (equipment, editing, on-camera skills) but competition is often lower than written content.

---

## Part Six: Technical Edge Cases

### Cannibalisation

If multiple pages target the same keyword, they compete against each other. Google gets confused about which to rank.

Solution: one page per primary keyword. Use internal linking to establish which page is the main one.

### Site Structure

Flat is better than deep. Important pages should be within two to three clicks of the homepage.

Use internal linking generously. When one article mentions a topic covered in another, link to it.

### Page Speed Deep Dive

Static sites are fast by default, but you can still mess this up.

Watch for:

- Unoptimised images (use WebP, compress everything)
- Too many fonts (stick to one or two)
- Heavy third-party scripts (analytics, chat widgets, trackers)
- Render-blocking resources

Test with Google PageSpeed Insights. Aim for ninety plus on mobile.

### Schema Markup

Structured data helps Google understand your content. Key types:

- **Article** — for blog posts
- **FAQPage** — for FAQ sections
- **Product** — for product pages
- **Review** — for testimonial pages

Astro makes this straightforward to implement.

### International SEO

If targeting multiple countries, consider:

- Hreflang tags for language/region variants
- Country-specific content where relevant
- Local hosting or CDN presence

For UK-focused products, make sure content uses UK spelling and references UK context.

### Handling Negative SEO

Competitors can theoretically harm you with spammy backlinks. In practice this is rare and Google is good at ignoring obvious manipulation.

If concerned, monitor backlinks in Search Console and use the disavow tool for clearly harmful links.

---

## Part Seven: Measurement

### The Three Numbers That Matter

Track monthly:

**Organic traffic** — from Google Search Console or analytics. This is the ultimate measure.

**Keyword positions** — track your top twenty target keywords. Are they moving up?

**Backlinks acquired** — from Search Console or Ahrefs. Quality matters more than quantity.

### Secondary Metrics

- Pages indexed (Search Console)
- Click-through rate from search results
- Bounce rate on key pages
- Conversions from organic traffic

### The Patience Game

Typical timeline:

**Month one to two** — infrastructure, research, initial content. Traffic: negligible.

**Month three to four** — more content, outreach begins. Traffic: still low.

**Month five to six** — some keywords start ranking. Traffic: growing slowly.

**Month seven to twelve** — compound effects kick in. Traffic: meaningful growth.

Don't check rankings daily. It fluctuates and you'll drive yourself mad. Weekly or monthly reviews are sufficient.

---

## Part Eight: The Monthly Rhythm

After the initial push, settle into a sustainable routine.

### Ongoing Monthly Tasks

**Content:**
- Two new articles (problem-focused or comparison)
- Update one existing article with fresh information

**Outreach:**
- One push per month, rotating between:
  - Roundup outreach
  - Guest post pitches
  - Podcast pitches

**Community:**
- Regular participation in relevant subreddits/forums
- Social media presence (Twitter/LinkedIn)

**Measurement:**
- Review Search Console data
- Check keyword position changes
- Note backlinks acquired

### Quarterly Reviews

Every three months:

- Identify what content performs best, create more like it
- Find underperforming content, improve or consolidate
- Refresh keyword research — new opportunities emerge
- Audit technical SEO for issues

---

## Part Nine: Secrets and Edge Cases

### The 80/20 of SEO

Most of your results will come from:

- Ten pages, not a hundred
- Five backlinks from quality sites, not fifty from rubbish ones
- One linkable asset that earns links passively
- Consistent presence in one or two communities

Focus ruthlessly on what moves the needle.

### When to Ignore SEO Best Practices

**If your audience doesn't use Google.** Some B2B niches operate entirely through referrals and relationships. Know your market.

**For genuinely new categories.** If nobody searches for what you do because they don't know it exists, SEO won't help. You need education and awareness first.

**When speed matters more.** Launching fast and learning beats waiting for the perfect SEO setup.

### The Competitor Intelligence Hack

Use Ahrefs or SEMrush to see exactly what keywords your competitors rank for and what backlinks they've earned. This reveals:

- Keywords worth targeting
- Sites that might link to you too
- Content gaps you can fill

### The Content Refresh Advantage

Old content that ranked well but declined can often be revived with updates. Add new information, improve structure, update the publish date. Google notices freshness.

### Building Topical Authority

Google trusts sites that cover topics comprehensively. Twenty articles about coaching software tells Google you're an authority on coaching software.

This means staying focused. Don't dilute your site with random topics. Go deep on your niche.

### The Brand Search Signal

When people search your brand name, Google takes it as a trust signal. Brand awareness from any channel (ads, social, podcasts) indirectly helps SEO.

### Local SEO (If Relevant)

For products with geographic focus:

- Google Business Profile listing
- Local keywords ("coaching software UK")
- Citations in local directories
- Location pages if serving multiple areas

### The Long Game Reality

SEO rewards consistency over intensity. Publishing two articles monthly for two years beats publishing thirty articles in month one then stopping.

Build systems that make this sustainable. Batch content creation. Schedule outreach. Make it routine, not heroic effort.

---

## Part Ten: The Launch Checklist

### Phase One: Foundation (Weeks 1-2)

```
[ ] Astro + Sanity site live
[ ] Core pages complete (home, features, pricing)
[ ] Google Search Console connected
[ ] Sitemap generated and submitted
[ ] Meta tags and Open Graph configured
[ ] Analytics installed
```

### Phase Two: Research (Weeks 2-3)

```
[ ] 20 problem-focused keywords identified
[ ] Competitor comparison volume validated
[ ] 5 roundup articles bookmarked for outreach
[ ] Keyword-to-content map created
```

### Phase Three: Initial Content (Weeks 3-6)

```
[ ] 1 linkable asset live
[ ] 5 comparison/alternative pages written
[ ] 5 problem-focused articles written
[ ] Internal linking structure implemented
```

### Phase Four: Distribution (Weeks 6-10)

```
[ ] 10 roundup articles contacted
[ ] 3 relevant subreddits joined (lurking)
[ ] 5 small podcasts pitched
[ ] 2 guest post pitches sent
[ ] Social profiles active
```

### Phase Five: Ongoing (Monthly)

```
[ ] 2 new articles published
[ ] 1 outreach push completed
[ ] Community participation maintained
[ ] Metrics reviewed
[ ] 1 old article refreshed
```

---

## Product-Specific Playbooks

### CoachOS

**What it is:** Fitness coaching SaaS platform — web dashboards for coaches, mobile apps for clients, exercise libraries, meal plans, check-ins.

**Target audience:** Independent fitness coaches, personal trainers, online coaches, small coaching businesses.

**Keyword themes:**

*Problem-focused:*
- "how to send meal plans to clients"
- "how to track client progress online"
- "client check-in software for coaches"
- "how to scale online coaching business"
- "stop clients ghosting on check-ins"

*Comparison:*
- "Trainerize alternatives"
- "Trainerize vs CoachOS"
- "Zenfit alternatives"
- "best coaching software for personal trainers"
- "TrueCoach vs Trainerize vs CoachOS"

*Commercial:*
- "online coaching platform UK"
- "fitness coaching software"
- "personal trainer client management app"

**Linkable asset ideas:**
- Free client onboarding template pack
- "How to price your online coaching" comprehensive guide
- Coaching business calculator (revenue projections)
- Exercise library sample with video demonstrations

**Communities:**
- r/personaltraining
- r/fitness (carefully)
- r/onlinecoaching
- Facebook groups for fitness coaches
- LinkedIn fitness professional groups

**Podcast targets:**
- Fitness business podcasts
- Personal trainer education shows
- Online coaching/entrepreneur podcasts

**Roundup targets:**
- "Best personal training software" articles
- "Top coaching platforms" listicles
- "Trainerize alternatives" posts
- Fitness industry blog comparisons

**Unique angles:**
- UK-based/UK-focused (many competitors are US-centric)
- Independent maker story (vs VC-funded competitors)
- Coach-first design philosophy

---

### FranchiseOS

**What it is:** Operations management SaaS — inventory, ledger, staff clock in/out, multi-location management for cafes, restaurants, hospital cafes, any food service business.

**Target audience:** Franchise operators, multi-site food service businesses, hospital/institutional cafes, independent cafe owners scaling up.

**Keyword themes:**

*Problem-focused:*
- "how to track inventory across multiple locations"
- "staff clock in out system for restaurants"
- "stop stock going missing in kitchen"
- "how to manage multiple cafe locations"
- "reduce food waste in restaurant"

*Comparison:*
- "MarketMan alternatives"
- "7shifts alternatives"
- "Deputy alternatives UK"
- "restaurant inventory software comparison"

*Commercial:*
- "franchise management software UK"
- "multi-location restaurant software"
- "cafe inventory management system"
- "hospitality staff scheduling software"

**Linkable asset ideas:**
- Inventory counting template (spreadsheet)
- "Opening a second location" operations checklist
- Food cost calculator
- Staff scheduling template

**Communities:**
- r/restaurantowners
- r/kitchenconfidential
- r/smallbusiness
- Hospitality industry LinkedIn groups
- Franchise owner forums

**Podcast targets:**
- Restaurant business podcasts
- Hospitality industry shows
- Franchise/small business podcasts
- Food service operations podcasts

**Roundup targets:**
- "Best restaurant inventory software" articles
- "Staff scheduling apps for hospitality"
- "Franchise management tools" listicles

**Unique angles:**
- Specifically designed for UK hospitality context
- Hospital/institutional cafe expertise (niche within niche)
- All-in-one vs point solutions (inventory + scheduling + ledger)
- Independent operator vs enterprise-focused competitors

---

## Final Note

This playbook is a map, not a destination. Every product and market has nuances. Test, measure, adjust.

The fundamentals don't change: create genuinely useful content, build relationships that earn backlinks, show up consistently in communities where your customers gather.

The businesses that win at organic visibility aren't the ones with the best tactics. They're the ones who keep executing when it feels like nothing is working.

Start. Keep going. Compound.
