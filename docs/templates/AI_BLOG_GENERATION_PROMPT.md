# AI Blog Post Generation Template

## 🤖 Instructions for AI

When asked to write a blog post using this template, generate a **complete markdown file** with:

1. **Valid YAML frontmatter** (between `---` markers)
2. **Full blog post content** in markdown format
3. **All required fields** filled with appropriate content
4. **Proper YAML syntax** (especially for keywords - use dashes, not asterisks!)

### 🎯 **Blog Formula (Easy & Reasonable)**

**Structure:**
1. **Frontmatter** (YAML) - All metadata
2. **H1 Title** - Matches frontmatter title
3. **Introduction** (2-3 sentences) - Hook + value + benefit
4. **3-5 H2 Sections** - Main content (auto-generates Table of Contents)
5. **Key Takeaways** - Bullet summary
6. **Conclusion** - Wrap up + next steps
7. **CTA in H3** - Call-to-action (auto-renders as button)

**What Makes This Easy:**
- ✅ Clear structure every time
- ✅ H2 headings auto-generate TOC
- ✅ CTAs auto-render as buttons
- ✅ Markdown imports directly to Sanity
- ✅ Auto-translation ready

---

## 📋 Output Format

Your output should look **exactly** like this structure:

```markdown
---
title: "[Generate compelling title, max 100 chars]"
slug: "[url-friendly-version-of-title]"
excerpt: "[1-2 sentence summary, max 200 chars]"
language: "en"

seoTitle: "[SEO-optimized title, max 60 chars]"
seoDescription: "[Compelling meta description, max 160 chars]"
seoKeywords:
  - [keyword 1]
  - [keyword 2]
  - [keyword 3]
  - [keyword 4]
  - [keyword 5]

status: "draft"
featured: false
publishedAt: "[YYYY-MM-DDTHH:MM:SSZ]"

languageSpecific: false
translateTo:
  - "es"
  - "fr"
  - "pt"
  - "de"
---

# [Blog Post Title]

[Engaging introduction paragraph that hooks the reader and explains what they'll learn. 2-3 sentences.]

## [First Major Section H2]

[Content for this section. Use clear, conversational language. 2-3 paragraphs.]

### [Subsection H3 if needed]

[More detailed content. Use examples where appropriate.]

**Key points:**
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]

## [Second Major Section H2]

[Continue with supporting content. Include practical information.]

> 💡 **Pro Tip:** [Helpful insider advice or best practice]

### [Subsection H3]

[Detailed explanation with examples.]

1. [Numbered step 1]
2. [Numbered step 2]
3. [Numbered step 3]

## [Third Major Section H2]

[Real-world examples, case studies, or practical applications.]

### [Example or Case Study H3]

[Describe scenario with concrete details.]

> ⚠️ **Warning:** [Important caveat or common mistake to avoid]

## Key Takeaways

- **[Takeaway 1]:** [Brief explanation]
- **[Takeaway 2]:** [Brief explanation]
- **[Takeaway 3]:** [Brief explanation]

## Conclusion

[Summarize the main points in 2-3 sentences. Reinforce the value delivered.]

[Next steps or action items in 1-2 sentences.]

### Ready to Get Started?

[Start Building Your Loyalty Program Today](https://digitalloyalty.com/demo)

**Note:** CTAs in H3 headings with keywords like "Start", "Get", "Book", "Demo", "Trial", or "Learn" automatically render as beautiful gradient buttons!
```

---

## ✅ Required Elements Checklist

When generating a blog post, ensure you include:

### Frontmatter (YAML)
- [ ] `title` - Compelling, specific, max 100 characters
- [ ] `slug` - URL-friendly (lowercase, hyphens, no special chars)
- [ ] `excerpt` - Enticing summary, 1-2 sentences, max 200 chars
- [ ] `language` - Set to `"en"`
- [ ] `seoTitle` - Keyword-rich, compelling, max 60 chars
- [ ] `seoDescription` - Value-focused, keyword-rich, max 160 chars
- [ ] `seoKeywords` - 5 relevant keywords in array format (dash + space)
- [ ] `status` - Set to `"draft"`
- [ ] `featured` - Set to `false`
- [ ] `publishedAt` - Current date in ISO 8601 format
- [ ] `languageSpecific` - Set to `false`
- [ ] `translateTo` - Array with `["es", "fr", "pt", "de"]`

### Content Structure
- [ ] H1 title (matches frontmatter title)
- [ ] Engaging introduction (2-3 sentences)
- [ ] 3-5 H2 major sections (## in markdown - these auto-generate the Table of Contents)
- [ ] 2-4 H3 subsections under each H2 (### in markdown)
- [ ] Mix of paragraphs, bullet points, and numbered lists
- [ ] At least 2 blockquote callouts (Pro Tips, Warnings, or Best Practices)
- [ ] "Key Takeaways" section with 3-5 points
- [ ] Conclusion with summary
- [ ] Call-to-action at the end

**Important:** H2 headings (##) automatically generate the Table of Contents sidebar. Make them descriptive and scannable!

### Writing Style
- [ ] Conversational but professional tone
- [ ] Short paragraphs (2-3 sentences)
- [ ] Active voice
- [ ] Specific examples and scenarios
- [ ] No jargon without explanation
- [ ] Scannable with clear headings

---

## ⚠️ Critical YAML Rules

### SEO Keywords Format
**ALWAYS use this exact format:**

```yaml
seoKeywords:
  - keyword phrase one
  - keyword phrase two
  - keyword phrase three
```

**NEVER do this:**
```yaml
seoKeywords:
  * keyword one              ❌ WRONG - No asterisks!
seoKeywords: ["one", "two"]  ❌ WRONG - Not this array format
- keyword one                ❌ WRONG - Missing proper indent
```

**Rules:**
- 2-space indent before each dash
- Dash + space + keyword
- No quotes around keywords
- No commas between keywords
- One keyword per line

### Other YAML Requirements
- Use double quotes for all string values
- Use lowercase `true`/`false` for booleans (not `True`/`False`)
- Arrays of strings use dash format (like keywords)
- Dates in ISO 8601 format: `"2025-10-18T10:00:00Z"`
- No tabs, only spaces for indentation

---

## 📏 Content Length Guidelines

| Post Type | Word Count | Sections |
|-----------|------------|----------|
| **Short** | 800-1,200 words | 3-4 H2 sections |
| **Medium** | 1,500-2,500 words | 4-5 H2 sections |
| **Long** | 3,000+ words | 6+ H2 sections |

**Default to Medium length (1,500-2,500 words) unless specified otherwise.**

---

## 🎯 SEO Optimization Requirements

### Title Optimization
- Include primary keyword near the beginning
- Make it compelling and specific
- Use numbers, questions, or "how to" when appropriate
- Examples:
  - ✅ "7 Proven Customer Retention Strategies for 2025"
  - ✅ "How to Build a Loyalty Program That Actually Works"
  - ❌ "Customer Retention" (too vague)

### Description Optimization
- Front-load the primary keyword
- Include a benefit or value proposition
- Make it compelling enough to click
- Examples:
  - ✅ "Discover 7 proven customer retention strategies that increase lifetime value by 30%. Learn how top brands build loyalty programs that drive repeat purchases."
  - ❌ "This article talks about customer retention and loyalty programs." (boring, no value)

### Keyword Selection
- Choose 5 relevant, specific keywords
- Mix of short-tail (2 words) and long-tail (3-4 words)
- Include primary keyword + variations
- Examples for a retention post:
  - `customer retention strategies`
  - `loyalty program design`
  - `increase customer lifetime value`
  - `repeat purchase rate`
  - `retention marketing tactics`

### Content Keyword Usage
- Use primary keyword in H1 title
- Use variations in 2-3 H2 headings
- Use naturally throughout content (don't stuff)
- Include related terms and synonyms

---

## ✍️ Content Writing Requirements

### Introduction (2-3 sentences)
1. Hook with a problem, statistic, or question
2. Explain what the reader will learn
3. State why it matters or the benefit

Example:
> "Customer acquisition costs have increased 60% in the past five years, making retention more critical than ever. In this guide, you'll learn seven proven strategies that top brands use to keep customers coming back. These tactics can increase your customer lifetime value by up to 30%."

### Main Sections (H2) - Table of Contents Generator
Each major section should:
- Start with a **clear, descriptive heading** (this appears in the TOC sidebar)
- Include 2-3 paragraphs of explanation
- Add at least one of: bullet list, numbered list, or blockquote callout
- Provide specific examples or scenarios
- Use H3 subsections for detailed breakdowns

**TOC Best Practices:**
- H2 headings should be **scannable** and **descriptive** (they appear in the sidebar)
- Keep H2 headings **concise** (3-8 words ideal)
- Use **action-oriented** language when possible
- Examples of good H2 headings:
  - ✅ "Build a Personalized Loyalty Program"
  - ✅ "Track Customer Behavior Effectively"
  - ✅ "Automate Rewards and Notifications"
  - ❌ "Introduction" (too vague)
  - ❌ "This is a very long heading that goes on and on" (too long)

### Blockquote Callouts
Use these strategically (2-3 per post):

```markdown
> 💡 **Pro Tip:** [Insider advice or best practice]

> ⚠️ **Warning:** [Common mistake or important caveat]

> ✅ **Best Practice:** [Recommended approach with brief explanation]
```

### Key Takeaways Section
- Summarize 3-5 main points from the article
- Use bold for the key phrase, then brief explanation
- Make each one actionable

Example:
```markdown
## Key Takeaways

- **Personalization increases retention:** Customers who receive personalized experiences are 40% more likely to make repeat purchases.
- **Reward timing matters:** Offer rewards immediately after purchase for maximum impact on behavior.
- **Segment your audience:** Different customer types need different retention strategies.
```

### Conclusion & CTA
- Summarize value delivered in 2-3 sentences
- Provide next steps or action items
- End with call-to-action in H3 heading

**CTA Button Magic:**
- Place CTA link in an H3 heading (###)
- Use trigger words: "Start", "Get", "Book", "Demo", "Trial", "Learn"
- System automatically renders as beautiful gradient button
- Example: `### Ready to Start? [Book Your Demo](https://example.com)`

---

## 🚫 Content to Avoid

**Do NOT include:**
- Em dashes (—) - use regular hyphens (-) instead
- Placeholder text like "[Insert content here]"
- Vague statements without examples
- Walls of text without breaks
- Technical jargon without explanation
- Multiple exclamation points!!!
- Sales-y language or excessive hype
- Unsubstantiated claims without context
- Long, complex sentences

**Do NOT mention:**
- "This blog post will cover..."
- "In this article, we'll discuss..."
- "Let's dive in..."
- Other meta-commentary about the post itself

---

## 📝 Example Output Structure

Here's what a properly formatted output looks like:

```markdown
---
title: "7 Customer Retention Strategies That Increase Lifetime Value by 30%"
slug: "customer-retention-strategies-increase-lifetime-value"
excerpt: "Discover proven retention strategies that top brands use to keep customers coming back and boost lifetime value by up to 30%."
language: "en"

seoTitle: "7 Customer Retention Strategies to Boost Lifetime Value (2025)"
seoDescription: "Learn 7 proven customer retention strategies that increase lifetime value by 30%. Discover how top brands build loyalty programs that drive repeat purchases."
seoKeywords:
  - customer retention strategies
  - increase customer lifetime value
  - loyalty program best practices
  - repeat purchase tactics
  - customer retention metrics

status: "draft"
featured: false
publishedAt: "2025-10-18T10:00:00Z"

languageSpecific: false
translateTo:
  - "es"
  - "fr"
  - "pt"
  - "de"
---

# 7 Customer Retention Strategies That Increase Lifetime Value by 30%

Customer acquisition costs have increased 60% over the past five years, making retention more critical than ever for sustainable growth. In this guide, you'll discover seven proven strategies that top brands use to keep customers coming back and increase lifetime value by up to 30%.

## Why Customer Retention Matters More Than Ever

The economics of retention are compelling. Acquiring a new customer costs 5-7 times more than retaining an existing one, and increasing retention rates by just 5% can boost profits by 25-95%.

[... continue with full content ...]

## Key Takeaways

- **Personalization drives retention:** Customers receiving personalized experiences are 40% more likely to make repeat purchases
- **Timing matters:** Immediate post-purchase engagement creates the strongest retention impact
- **Segmentation is essential:** Different customer segments require tailored retention strategies

## Conclusion

These seven strategies provide a comprehensive framework for building a retention-focused business. Start by implementing personalized communication and loyalty rewards, then expand to the other strategies as you see results.

### Ready to Boost Your Retention?

Start implementing these strategies today and watch your customer lifetime value grow. [Learn more about our retention platform](https://example.com)
```

---

## 🎯 Final Checklist Before Output

Before generating your response, verify:

- [ ] Frontmatter starts and ends with `---`
- [ ] All required YAML fields are present
- [ ] Keywords use dash format (not asterisks)
- [ ] Slug is URL-friendly (lowercase, hyphens only)
- [ ] Title and seoTitle are different but related
- [ ] Content has proper H1/H2/H3 hierarchy
- [ ] Introduction hooks the reader
- [ ] Each section has substance (not just headings)
- [ ] At least 2 blockquote callouts included
- [ ] Key Takeaways section present
- [ ] Conclusion with call-to-action
- [ ] No placeholder text like "[Insert here]"
- [ ] Word count matches requested length
- [ ] No em dashes used (use regular hyphens)
- [ ] Professional, conversational tone throughout

---

## 💬 How to Use This Template (For Humans)

**To generate a blog post with AI:**

1. **Provide topic/brief:** "Write a blog post about [topic] using the AI_BLOG_GENERATION_PROMPT format"
2. **Specify details (optional):**
   - Length: "Make it 2,000 words"
   - Target audience: "For small business owners"
   - Tone: "Keep it conversational but professional"
   - Keywords: "Focus on [specific keywords]"
3. **AI will generate:** Complete markdown file ready to import into Sanity

**Example prompt:**
> "Write a 1,500-word blog post about email marketing automation for e-commerce stores using the AI_BLOG_GENERATION_PROMPT format. Target audience is small online retailers. Focus on practical, actionable strategies."

The AI will generate a complete, properly formatted markdown file that you can copy and import directly into Sanity Studio.

---

**Ready to generate content? Provide your blog post topic and any specific requirements!**

