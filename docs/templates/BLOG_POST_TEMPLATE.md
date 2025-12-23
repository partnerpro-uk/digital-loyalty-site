---
# ⚠️ IMPORTANT: This is YAML, not Markdown!
# For arrays, use DASH (-) not ASTERISK (*)
# Example: 
#   seoKeywords:
#     - keyword one    ✅ CORRECT
#   NOT:
#   seoKeywords:
#     * keyword one    ❌ WRONG

# === CONTENT ===
title: "Your Amazing Blog Post Title"
slug: "your-amazing-blog-post-title"
excerpt: "A compelling summary of your post in 1-2 sentences. This shows in blog lists and search results."
language: "en"  # en, es, fr, pt, de, ar, zh

# === ORGANIZATION ===
# ⚠️ These fields must be filled MANUALLY in Sanity (select from dropdowns):
# - category: Select from "Content Category" dropdown
# - tags: Select from "Tags" dropdown
# - author: Select from "Author" dropdown

# === IMAGES ===
# ⚠️ These must be uploaded MANUALLY in Sanity (file uploads):
# - thumbnailImage: Upload in "Thumbnail Image" field
# - socialShareImage: (Optional) Upload in "Social Share Image" field

# === SEO ===
seoTitle: "Your SEO-Optimized Title (Max 60 chars)"
seoDescription: "Your meta description for search engines. Make it compelling and under 160 characters to avoid truncation."
seoKeywords:
  - keyword one
  - keyword two
  - keyword three

# === PUBLISHING ===
status: "draft"  # draft, published, archived
featured: false  # Set to true to pin this post to the top
publishedAt: "2025-10-18T10:00:00Z"  # ISO 8601 format, or leave empty for auto-set on publish

# === TRANSLATION SETTINGS ===
# Only applies to English posts (hidden for other languages)
languageSpecific: false  # Set to true if this should NOT be auto-translated
translateTo:  # Languages to auto-translate to (leave empty for all)
  - "es"
  - "fr"
  - "pt"
  - "de"

---

# Your Blog Post Title (H1)

Start with an engaging introduction that hooks your readers. Explain what they'll learn and why it matters.

## Section 1: Main Point (H2)

Write your first main section here. Use clear, concise language.

### Subsection 1.1 (H3)

Break down complex topics into smaller, digestible chunks.

**Bold text** for emphasis, *italic text* for subtle emphasis.

- Bullet point one
- Bullet point two
- Bullet point three

1. Numbered list item
2. Another numbered item
3. Final numbered item

> This is a blockquote. Great for highlighting important information or testimonials.

## Section 2: Supporting Details

Continue with your supporting arguments or details.

### Important Notes

> 💡 **Pro Tip:** Use emojis sparingly to add visual interest without overwhelming the content.

> ⚠️ **Warning:** Important information that readers should be aware of.

> ✅ **Best Practice:** Recommended approach for optimal results.

## Section 3: Real-World Examples

Share case studies, examples, or practical applications.

### Example 1: Success Story

Describe a real-world scenario or success story.

### Example 2: Common Mistakes

Highlight common pitfalls and how to avoid them.

## Key Takeaways

Summarize the main points:

- **Takeaway 1:** First key point
- **Takeaway 2:** Second key point
- **Takeaway 3:** Third key point

## Conclusion

Wrap up your post with:

1. Summary of what was covered
2. Next steps or action items
3. Call-to-action

### Call-to-Action

Ready to get started? [Start Your Free Trial](https://example.com/signup)

---

<!-- 
===========================================
USAGE INSTRUCTIONS
===========================================

HOW TO USE THIS TEMPLATE:

1. COPY this file and rename it (e.g., "my-blog-post.md")
2. FILL IN the frontmatter fields at the top
3. WRITE your content below the second "---"
4. SAVE the file

IMPORT TO SANITY:

1. Open Sanity Studio
2. Go to: Blog Posts → English → All Posts → Click "+"
3. SAVE the draft (Ctrl+S or Cmd+S) - IMPORTANT!
4. Click the "📄 Import Markdown Template" button at the top
5. PASTE your entire markdown file (including frontmatter)
6. Click "Import & Fill Fields"
7. Wait for success message
8. Scroll down and MANUALLY complete these fields:
   - Select "Category" from dropdown
   - Add "Tags" from dropdown
   - Select "Author" from dropdown
   - Upload "Thumbnail Image"
   - (Optional) Upload "Social Share Image"
9. Review all tabs and click "Publish"!

===========================================
AUTO-FILLED FIELDS
===========================================

These are automatically filled from frontmatter:

✅ Title
✅ Slug
✅ Excerpt
✅ Language
✅ Content (all markdown converted to blocks)
✅ SEO Title
✅ SEO Description
✅ SEO Keywords
✅ Status
✅ Featured
✅ Published Date
✅ Translation Settings

===========================================
MANUAL FIELDS (Cannot be auto-filled)
===========================================

These MUST be filled manually in Sanity:

⚠️ Category - Reference to category document
⚠️ Tags - References to tag documents
⚠️ Author - Reference to author document
⚠️ Thumbnail Image - File upload (1200x630px recommended)
⚠️ Social Share Image - File upload (optional, 1200x630px)

WHY MANUAL? Sanity references and file uploads can't be created 
from text alone - you need to select existing references or 
upload files through the Sanity Studio UI.

===========================================
FRONTMATTER FIELD REFERENCE
===========================================

title: (string, required, max 100 chars)
  - Main title of your blog post
  - Shows in lists, SEO, and social shares

slug: (string, required, URL-friendly)
  - URL path for the post
  - Example: "customer-retention-tips"

excerpt: (string, max 200 chars)
  - Short summary for blog lists
  - Shows in previews and search results

language: (string, required)
  - Options: "en", "es", "fr", "pt", "de", "ar", "zh"
  - Default: "en"

seoTitle: (string, max 60 chars)
  - Title for search engines
  - Falls back to main title if empty

seoDescription: (string, max 160 chars)
  - Meta description for search engines
  - Falls back to excerpt if empty

seoKeywords: (array of strings)
  - Keywords for SEO
  - Format: Use DASH (-) followed by space, one per line
  - Indent with 2 spaces after the field name
  - DO NOT use asterisks (*) - that's Markdown, not YAML!
  - DO NOT use quotes unless keyword contains special characters
  - Example:
    seoKeywords:
      - loyalty programs
      - customer retention
      - reward systems
  - WRONG examples:
    seoKeywords:
    * keyword one          ❌ Asterisk doesn't work in YAML
    seoKeywords: keyword   ❌ Not an array
    -keyword one           ❌ Missing indent

status: (string, required)
  - Options: "draft", "published", "archived"
  - Default: "draft"

featured: (boolean)
  - true = Pin to top of lists
  - false = Normal ordering
  - Default: false

publishedAt: (ISO 8601 date string)
  - Example: "2025-10-18T10:00:00Z"
  - Leave empty to auto-set on first publish
  - Use for scheduled publishing

languageSpecific: (boolean, English posts only)
  - false = Auto-translate to other languages
  - true = Keep English-only
  - Default: false

translateTo: (array of language codes, English posts only)
  - Specific languages to translate to
  - Example: ["es", "fr", "pt"]
  - Leave empty to translate to all languages

===========================================
MARKDOWN CONTENT TIPS
===========================================

HEADINGS:
# H1 - Use once for main title
## H2 - Main sections
### H3 - Subsections
#### H4 - Sub-subsections

TEXT FORMATTING:
**Bold text** - Strong emphasis
*Italic text* - Subtle emphasis
~~Strikethrough~~ - Crossed out text

LISTS:
- Unordered list item
- Another item

1. Ordered list item
2. Another item

BLOCKQUOTES:
> Quote or important note

SPECIAL CHARACTERS:
- Em dashes (—) are automatically converted to hyphens (-)
- Use regular hyphens (-) instead

CODE BLOCKS:
```javascript
const example = "code";
```

LINKS:
[Link text](https://example.com)

===========================================
IMAGE GUIDELINES
===========================================

THUMBNAIL IMAGE:
- Size: 1200x630px (16:9 ratio)
- Format: JPG or PNG
- File size: < 500KB
- Purpose: Blog lists, post header, fallback for social

SOCIAL SHARE IMAGE:
- Size: 1200x630px (16:9 ratio)
- Format: JPG or PNG
- File size: < 500KB
- Purpose: Facebook, Twitter, LinkedIn previews
- Optional: Falls back to thumbnail if not provided

ALT TEXT:
- Required for all images
- Describe the image content
- Important for accessibility and SEO

===========================================
SEO BEST PRACTICES
===========================================

TITLE:
- 50-60 characters ideal
- Include primary keyword
- Make it compelling and clickable

DESCRIPTION:
- 150-160 characters ideal
- Include primary keyword
- Summarize the value proposition

KEYWORDS:
- 3-5 keywords max
- Use naturally in content
- Don't stuff keywords

CONTENT:
- Use keywords in H2/H3 headings
- Alt text for all images
- Internal links to other blog posts
- External links to authoritative sources
- Clear, scannable structure

===========================================
CONTENT LENGTH GUIDELINES
===========================================

Short form: 800-1,200 words
- Quick tips, updates, announcements

Medium form: 1,500-2,500 words
- How-to guides, tutorials, comparisons

Long form: 3,000+ words
- Comprehensive guides, case studies, research

===========================================
READABILITY TIPS
===========================================

✅ Use short paragraphs (2-3 sentences)
✅ Break up text with headings every 300-400 words
✅ Use bullet points and numbered lists
✅ Include examples and real-world scenarios
✅ Use conversational tone
✅ Define technical terms
✅ Use active voice
✅ Avoid jargon unless necessary

===========================================
COMMON MISTAKES TO AVOID
===========================================

❌ Using em dashes (—) - use regular dashes (-) instead
❌ Forgetting to save draft before importing
❌ Not selecting category/tags/author after import
❌ Not uploading images after import
❌ Keyword stuffing in content
❌ Overly long sentences and paragraphs
❌ Missing H2/H3 structure
❌ No call-to-action at the end

===========================================
TROUBLESHOOTING
===========================================

"No frontmatter found" error:
→ Make sure your file starts with "---" and has a closing "---"

"Save draft first" error:
→ Press Ctrl+S (or Cmd+S) to save before importing

Import successful but fields empty:
→ Check browser console for errors
→ Refresh the page
→ Try creating a new post

Some fields didn't import:
→ Check the field names match exactly (case-sensitive)
→ Check YAML formatting (proper indentation)
→ Check for special characters or em dashes

Keywords didn't import:
→ Make sure they're in array format with dashes
→ DO NOT use asterisks (*) - use dashes (-)
→ DO NOT use quotes around keywords
→ Use this exact format:
  seoKeywords:
    - keyword one
    - keyword two
    - keyword three
→ Common mistakes:
  ❌ * keyword one (asterisk - this is Markdown, not YAML!)
  ❌ seoKeywords: ["keyword one", "keyword two"]
  ❌ seoKeywords: "keyword one, keyword two"
  ❌ - "keyword one" (with quotes)
  ❌ -keyword one (missing space after dash)
  ❌ Missing 2-space indent before dash
  ✅ - keyword one (dash + space, no quotes, 2-space indent)

===========================================

-->
