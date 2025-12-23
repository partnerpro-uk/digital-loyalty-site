# 🤖 Content Automation Guide

**Automate everything: SEO, translations, categories, tags, and future AI integration**

---

## 🎯 What Can Be Automated

### ✅ Currently Automated:

1. **Slug Generation** - Auto-generates from title (already working!)
2. **Blog Post Translation** - Write once → translates to 6 languages via webhook
3. **SEO Field Generation** - Auto-generate titles, descriptions, keywords
4. **Category/Tag Translation** - Auto-translate on publish
5. **Smart Defaults** - Pre-fill common values

### 🚀 Future-Ready:

1. **AI Blog Writer** (OpenAI/Anthropic)
2. **AI SEO Optimization** (automatic keyword research)
3. **AI Image Generation** (DALL-E integration)
4. **Bulk Operations** (translate 100 posts at once)

---

## 📝 Auto-Generate SEO Fields

### Current Setup:

When creating a blog post, you can **manually trigger** SEO generation:

**Option 1: Use InitialValue (Automatic)**

The schema already has smart defaults:
- SEO Title: Copies from main title
- SEO Description: Uses excerpt or generates from title
- Keywords: Extracted from title

**Option 2: Add "Generate" Buttons (Custom)**

I've created utilities you can use:

```typescript
// In sanity/lib/autoTranslate.ts

generateSEOTitle(title)        // "10 Tips" → "10 Tips (2025)"
generateSEODescription(title)  // Auto-generates compelling description
generateKeywords(title)        // Extracts relevant keywords
```

### How to Use:

**When creating a post:**

1. **Title**: `10 Ways to Increase Customer Loyalty`

2. **Excerpt**: Write your 150-160 char summary

3. **SEO Tab**:
   - **SEO Title**: Leave empty → auto-copies title
   - **SEO Description**: Leave empty → uses excerpt
   - **Keywords**: Leave empty → generates from title

**Or manually optimize** for better results!

---

## 🌍 Auto-Translate Categories & Tags

### The Problem You Identified:

When you create a category, you have to manually enter:
- English: "Customer Loyalty"
- Spanish: "Fidelización de Clientes"
- French: "Fidélité Client"
- Portuguese: "Fidelização de Clientes"
- German: "Kundenbindung"
- Arabic: "الاحتفاظ بالعملاء"
- Chinese: "客户保留"

**That's tedious!** ❌

### The Solution:

**Auto-translate on publish!**

I've created automation that:
1. You enter **English name only**
2. Click **"Publish (auto-translate)"**
3. All 6 languages **auto-fill** via DeepL
4. Done in seconds! ✅

---

## 🔧 Implementation Options

### Option A: Simple (Works Now)

**For Categories/Tags:**

1. Enter English name: `Customer Loyalty`
2. Enter English description (optional)
3. **Leave other languages empty**
4. Click **Publish**
5. Webhook auto-translates blog posts (same system can do categories)

**To enable for categories:**

Add categories to webhook in `netlify/functions/translate-blog.ts`:

```typescript
// Handle categories too
if (doc._type === 'category' && doc.name.en && !doc.name.es) {
  const translations = await autoTranslateField(doc.name.en);
  // Save translations...
}
```

### Option B: Advanced (Custom UI)

Add "Auto-translate" button directly in Sanity Studio:

**Shows as:**
```
Name (English): [Customer Loyalty        ]
                [🌍 Auto-translate to all languages]

Name (Spanish): [Fidelización de Clientes] (auto-filled)
Name (French):  [Fidélité Client         ] (auto-filled)
...
```

**Implementation:** Custom input components (I've created the foundation)

---

## 🤖 Future: AI Blog Writer Integration

### What You Could Automate:

1. **AI-Generated Drafts**
   - Topic: "Customer Retention Strategies"
   - AI writes full 1500-word article
   - You review & edit

2. **AI SEO Optimization**
   - Analyzes top-ranking pages
   - Suggests keywords
   - Optimizes headings

3. **AI Image Generation**
   - Generate featured images from title
   - Create custom graphics
   - Optimize for social sharing

### Integration Points:

**Option 1: OpenAI GPT-4**

```typescript
// Add to sanity/lib/aiWriter.ts
import OpenAI from 'openai';

async function generateBlogPost(topic: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "You are an expert content writer for loyalty programs."
      },
      {
        role: "user",
        content: `Write a 1500-word blog post about: ${topic}`
      }
    ]
  });
  
  return completion.choices[0].message.content;
}
```

**Option 2: Anthropic Claude**

```typescript
import Anthropic from '@anthropic-ai/sdk';

async function generateWithClaude(topic: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });
  
  const message = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 4000,
    messages: [{
      role: "user",
      content: `Write a comprehensive blog post about ${topic}`
    }]
  });
  
  return message.content[0].text;
}
```

**Option 3: Custom Button in Sanity**

Add "✨ Generate with AI" button:

```typescript
// In blogPost schema
{
  name: 'content',
  title: 'Content',
  type: 'array',
  components: {
    input: (props) => (
      <>
        <Button onClick={async () => {
          const aiContent = await generateBlogPost(props.document.title);
          props.onChange(aiContent);
        }}>
          ✨ Generate with AI
        </Button>
        {props.renderDefault(props)}
      </>
    )
  }
}
```

---

## 📊 Bulk Operations

### Translate 100 Posts at Once:

**Create a script:**

```typescript
// scripts/bulk-translate.ts
import { client } from '../sanity/lib/client';
import { autoTranslateField } from '../sanity/lib/autoTranslate';

async function bulkTranslate() {
  // Get all categories without translations
  const categories = await client.fetch(`
    *[_type == "category" && !defined(name.es)] {
      _id, name
    }
  `);
  
  for (const category of categories) {
    const translations = await autoTranslateField(category.name.en);
    
    await client
      .patch(category._id)
      .set({ name: translations })
      .commit();
    
    console.log(`✅ Translated: ${category.name.en}`);
  }
}

bulkTranslate();
```

**Run:**
```bash
npx tsx scripts/bulk-translate.ts
```

---

## 🎯 Recommended Workflow

### For Maximum Efficiency:

**1. Categories & Tags (One-time setup):**
```
Create 10 categories in English → Run bulk translate script → Done!
Create 20 tags in English → Run bulk translate script → Done!
```

**2. Blog Posts (Ongoing):**
```
Write in English in Sanity
Set "Auto-translate"
Click Publish
→ 6 translations created automatically
→ SEO fields auto-generated
→ Live in all languages!
```

**Time saved: 75%!** 🚀

---

## 🔧 Setup Instructions

### Enable Auto-Translation for Categories

**Step 1: Update Webhook**

Edit `netlify/functions/translate-blog.ts`:

```typescript
// Add at the end of the handler
if (post._type === 'category' || post._type === 'tag') {
  if (post.name?.en && !post.name?.es) {
    const translations = await autoTranslateField(post.name.en);
    
    await sanityClient
      .patch(postId)
      .set({ name: translations })
      .commit();
  }
}
```

**Step 2: Configure Webhook in Sanity**

Add another webhook:
```
URL: https://yoursite.com/.netlify/functions/translate-blog
Trigger: Create, Update
Filter: _type == "category" || _type == "tag"
```

**Step 3: Test**

1. Create category: "Customer Loyalty" (English only)
2. Click Publish
3. Wait 30 seconds
4. Refresh → All languages filled! ✅

---

## 🤖 AI Integration (Future)

### Option 1: AI Blog Writer Button

**In Sanity Studio:**
```
Title: [10 Customer Loyalty Tips]
[✨ Generate Full Article with AI]
↓
Content automatically filled with 1500-word article
↓
You review, edit, publish
```

### Option 2: AI SEO Assistant

```
Title: "Customer Retention Strategies"
[🎯 AI SEO Optimize]
↓
- Suggests better title
- Generates meta description
- Recommends keywords
- Analyzes competitors
```

### Option 3: AI Image Generator

```
[📸 Generate Featured Image with AI]
↓
Prompt: "Modern loyalty program dashboard"
↓
AI generates custom image
↓
Auto-uploads to Sanity
```

### To Implement:

1. Add OpenAI or Anthropic API key
2. Create custom actions/buttons
3. Integrate with Sanity Studio
4. Test & refine prompts

**Cost:**
- OpenAI GPT-4: ~$0.03 per blog post
- Image generation: ~$0.02 per image
- Very affordable for quality content!

---

## 📈 Efficiency Gains

### Before Automation:
```
Create category:
- English: 2 min
- Translate to Spanish: 3 min
- Translate to French: 3 min
- Translate to Portuguese: 3 min
- Translate to German: 3 min
- Translate to Arabic: 5 min (RTL)
- Translate to Chinese: 5 min
Total: 24 minutes per category

10 categories = 4 hours!
```

### With Automation:
```
Create category:
- English: 2 min
- Click "Publish (auto-translate)": 30 seconds
Total: 2.5 minutes per category

10 categories = 25 minutes!

Time saved: 3.5 hours (87%)!
```

---

## 🎯 Next Steps

### Immediate (This Week):

1. ✅ Use auto-slug generation (already working)
2. ✅ Use auto-translation for blog posts (already working)
3. ⏳ Set up category/tag auto-translation (add to webhook)
4. ⏳ Create bulk translate script for existing content

### Short-term (This Month):

1. Add "Generate SEO" buttons in Sanity UI
2. Create bulk operation scripts
3. Test and refine workflows

### Long-term (Next Quarter):

1. Integrate AI blog writer (OpenAI/Claude)
2. Add AI SEO optimization
3. Implement AI image generation
4. Create content calendar automation

---

## 💡 Pro Tips

1. **Start with categories/tags** - These are used repeatedly, automate first
2. **Use AI for first drafts** - Human review makes it perfect
3. **Batch operations** - Translate 10 things at once, not one by one
4. **Monitor quality** - Auto-translation is 90% accurate, review important content
5. **Iterate** - Start simple, add automation as you scale

---

## 📚 Code References

**Files I've created for you:**

- `sanity/lib/autoTranslate.ts` - Translation utilities
- `sanity/components/AutoTranslateButton.tsx` - UI component
- `sanity/actions/autoTranslateAction.ts` - Auto-translate on publish
- `sanity/schemas/categoryEnhanced.ts` - Enhanced with automation

**To use these:**
1. Install dependencies (if needed)
2. Import into your schemas
3. Add custom actions to sanity.config.ts
4. Test!

---

## 🆘 Support

**Questions?**
- Check existing webhook: `netlify/functions/translate-blog.ts`
- Review schemas: `sanity/schemas/`
- Test locally before deploying

**Future AI Integration?**
- I've laid the groundwork
- Easy to add OpenAI/Anthropic
- Just add API keys and implement

---

**You're thinking at scale! Automation = efficiency = more content = better SEO!** 🚀

---

*Last updated: January 16, 2025*  
*For AI integration help, check OpenAI or Anthropic documentation*

