# 🚀 Sanity CMS - Complete Usage Guide

## ✅ What's Been Implemented

You now have a fully functional CMS with:

- ✅ **Sanity CMS** - Headless CMS with beautiful UI
- ✅ **Auto-Translation** - Write once in English → auto-translates to 6 languages
- ✅ **i18n Integration** - Works with your existing path-based routing
- ✅ **Rich Content** - PortableText editor with images, code blocks
- ✅ **Categories & Tags** - Organized content with multilingual names
- ✅ **SEO Optimization** - Meta tags, Open Graph, keywords
- ✅ **Image Management** - Drag & drop with automatic optimization
- ✅ **Related Posts** - Internal linking for better SEO
- ✅ **Author Bios** - Team member profiles with social links
- ✅ **Translation Management** - Auto, manual, or language-specific posts

---

## 🎬 Getting Started

### Step 1: Create Sanity Project

```bash
# Initialize Sanity (you'll need to do this once)
npx sanity init --project-plan free

# Follow prompts:
# - Create new project? Yes
# - Project name: Digital Loyalty CMS
# - Dataset: production
# - Output path: [Press Enter - current directory]
```

This creates a Sanity project and gives you a **Project ID**.

### Step 2: Set Up Environment Variables

Create `.env` file in root:

```bash
# Copy your existing DeepL key
DEEPL_API_KEY=650bd9a1-7c65-4ae6-9333-de9e643dffdd:fx

# Add Sanity variables (from npx sanity init)
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

### Step 3: Create API Token

1. Go to https://sanity.io/manage
2. Select your project
3. **Settings** → **API** → **Tokens**
4. Click **Add API token**
5. Name: `Webhook Auto-Translation`
6. Permissions: **Editor**
7. Copy token and add to `.env`:

```bash
SANITY_WRITE_TOKEN=your_token_here
```

### Step 4: Deploy Sanity Studio

```bash
# Deploy studio to Sanity hosting
npx sanity deploy

# Choose studio hostname (e.g., digital-loyalty)
# Access at: https://digital-loyalty.sanity.studio
```

### Step 5: Run Locally (Optional)

```bash
# Run Sanity Studio locally
npx sanity dev

# Opens http://localhost:3333
# Login with your Sanity account
```

---

## 📝 Creating Your First Blog Post

### 1. Access Sanity Studio

Go to: `https://your-project.sanity.studio`

Or run locally: `npx sanity dev`

### 2. Create Author Profile

Before creating posts, create an author:

1. Click **Author** in sidebar
2. Click **Create new Author**
3. Fill in:
   - **Name**: Your Name
   - **Slug**: `your-name` (auto-generated)
   - **Profile Image**: Upload photo
   - **Bio**: Write bio in all languages (or just English)
   - **Social**: Add Twitter, LinkedIn, website
4. Click **Publish**

### 3. Create Category

1. Click **Category** in sidebar
2. Click **Create new Category**
3. Fill in:
   - **Name (English)**: `Customer Retention`
   - **Slug**: `customer-retention`
   - **Description**: Category description
   - **Color**: `#8b5cf6` (purple)
4. Optionally add other language names
5. Click **Publish**

### 4. Create Tags (Optional)

1. Click **Tag** in sidebar
2. Create tags like:
   - `Loyalty Programs`
   - `Digital Cards`
   - `Customer Engagement`
3. Click **Publish**

### 5. Create Blog Post

1. Click **Blog Post** in sidebar
2. Click **Create new Blog Post**

**Content Tab:**
- **Title**: `10 Ways to Increase Customer Loyalty`
- **Slug**: `increase-customer-loyalty` (auto-generated)
- **Excerpt**: Short description (150-160 chars)
- **Content**: Write your blog post
  - Use heading buttons (H2, H3)
  - Drag images into content
  - Add code blocks if needed
- **Featured Image**: Upload main image with alt text
- **Category**: Select category
- **Tags**: Select tags
- **Related Posts**: Select 2-3 related posts

**Translation Tab:**
- **Language**: `English` (default)
- **Translation Strategy**: 
  - ✅ **Auto-translate to all languages** ← Choose this!
  - Language-specific (no translation)
  - Manual translation only

**SEO Tab:**
- **SEO Title**: Custom title (optional)
- **SEO Description**: Meta description
- **Focus Keywords**: `loyalty`, `customer retention`, `tips`
- **Social Share Image**: Custom OG image (optional)

**Meta Tab:**
- **Author**: Select yourself
- **Published At**: Set date/time
- **Status**: **Published** ← Important!
- **Featured Post**: Check to feature on homepage

3. Click **Publish**

### 6. Auto-Translation Magic ✨

When you click "Publish":

1. **Webhook triggers** (you'll set this up next)
2. **DeepL translates** title, excerpt, content
3. **6 new documents created** (es, fr, pt, de, ar, zh)
4. **Blog live in 7 languages!**

---

## 🔗 Setting Up Auto-Translation Webhook

### Step 1: Deploy Your Site

First, deploy to Netlify or Vercel so you have a URL:

```bash
# Build your site
npm run build

# Deploy (example with Netlify)
netlify deploy --prod

# Or with Vercel
vercel --prod
```

### Step 2: Configure Webhook in Sanity

1. Go to https://sanity.io/manage
2. Select your project
3. **Settings** → **Webhooks**
4. Click **Add Webhook**
5. Configure:
   - **Name**: `Auto-translate blog posts`
   - **URL**: `https://yoursite.com/.netlify/functions/translate-blog`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update
   - **Filter**: 
     ```groq
     _type == "blogPost" && translationStrategy == "auto" && language == "en"
     ```
   - **HTTP method**: POST
   - **API version**: `2025-01-16`
6. Click **Save**

### Step 3: Add Environment Variables to Hosting

On Netlify/Vercel, add these environment variables:

```bash
DEEPL_API_KEY=650bd9a1-7c65-4ae6-9333-de9e643dffdd:fx
PUBLIC_SANITY_PROJECT_ID=your_project_id
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_WRITE_TOKEN=your_write_token
```

### Step 4: Test It!

1. Create a new blog post in Sanity
2. Set **Translation Strategy** = "Auto-translate"
3. Set **Status** = "Published"
4. Click **Publish**
5. Wait 30-60 seconds
6. Check Sanity - you should see 6 new translated documents!

---

## 🌍 Viewing Your Blog

### English:
```
https://yoursite.com/blog
https://yoursite.com/blog/your-post-slug
```

### Spanish:
```
https://yoursite.com/es/blog
https://yoursite.com/es/blog/your-post-slug-es
```

### Other Languages:
```
/fr/blog/your-post-slug-fr   (French)
/pt/blog/your-post-slug-pt   (Portuguese)
/de/blog/your-post-slug-de   (German)
/ar/blog/your-post-slug-ar   (Arabic)
/zh/blog/your-post-slug-zh   (Chinese)
```

---

## 📚 Content Workflow

### For General Articles (Most Common)

1. **Write in English** in Sanity Studio
2. **Set Translation Strategy** = "Auto-translate to all languages"
3. **Click Publish**
4. **Done!** Post appears in all 7 languages

**Use cases:**
- Tips & tricks articles
- How-to guides
- Industry insights
- Product updates
- General knowledge

### For Language-Specific Articles

Example: Article about French loyalty market

1. **Write in French** in Sanity Studio
2. **Set Language** = "French"
3. **Set Translation Strategy** = "Language-specific (no translation)"
4. **Select Languages** = "French" only
5. **Click Publish**
6. Post only appears on `/fr/blog/`

**Use cases:**
- Local market analysis
- Region-specific regulations
- Cultural content
- Local case studies

### For Sensitive Content (Manual Translation)

Example: Marketing copy, legal content

1. **Write in English** in Sanity Studio
2. **Set Translation Strategy** = "Manual translation only"
3. **Click Publish** (only English version created)
4. **Manually create translations:**
   - Create new blog post
   - Set language to "Spanish"
   - Set **Translation Key** = same as English post
   - Write Spanish version manually
   - Repeat for each language

**Use cases:**
- Marketing campaigns
- Legal disclaimers
- Brand messaging
- Precise copy

---

## 🖼️ Working with Images

### In Blog Content (Inline)

1. **While writing**, click image icon or drag image
2. **Add alt text** (important for SEO!)
3. **Add caption** (optional)
4. Image automatically:
   - Uploads to Sanity
   - Optimizes for web
   - Serves from CDN
   - Generates responsive sizes

### Featured Image

1. In **Content** tab, find **Featured Image**
2. **Drag & drop** or click to upload
3. **Add alt text** (required)
4. Image auto-optimizes:
   - 1200x630px for social sharing
   - WebP conversion
   - CDN delivery

### Social Share Image (Optional)

1. In **SEO** tab, find **Social Share Image**
2. Upload custom image for Facebook/Twitter
3. Recommended size: 1200x630px

**Auto-optimization includes:**
- Format conversion (WebP, AVIF)
- Responsive sizing
- Quality optimization
- CDN caching
- On-the-fly transformations

---

## 🏷️ Categories & Tags

### Best Practices

**Categories** (Choose one per post):
- Broad topics
- 5-10 categories max
- Examples:
  - Customer Retention
  - Loyalty Programs
  - Digital Marketing
  - Case Studies
  - Industry News

**Tags** (Choose 3-5 per post):
- Specific keywords
- Can have many tags
- Examples:
  - `loyalty-cards`
  - `mobile-wallet`
  - `rewards`
  - `gamification`
  - `customer-engagement`

### Translation

Categories and tags have **multilingual names**:

```typescript
{
  name: {
    en: "Customer Retention",
    es: "Retención de Clientes",
    fr: "Rétention Client",
    // ...
  }
}
```

When you create them, fill in English. Optionally add other languages manually, or they'll use English as fallback.

---

## 🔍 SEO Features

### Automatic SEO

Every blog post automatically gets:
- ✅ Meta title & description
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ hreflang tags (all language versions)
- ✅ JSON-LD structured data
- ✅ Sitemap inclusion

### Custom SEO Fields

In **SEO** tab:
- **SEO Title**: Override page title (50-60 chars)
- **SEO Description**: Meta description (150-160 chars)
- **Focus Keywords**: Target keywords (3-5 recommended)
- **Social Share Image**: Custom OG image

### SEO Best Practices

**Title:**
```
Bad:  "Blog Post"
Good: "10 Proven Ways to Increase Customer Loyalty in 2025"
```

**Description:**
```
Bad:  "Tips for loyalty"
Good: "Discover 10 data-backed strategies to boost customer retention and build lasting loyalty programs that drive repeat business."
```

**Keywords:**
```
customer loyalty, retention strategies, loyalty programs, repeat customers
```

---

## 📊 Content Management

### Drafts

- Save as **Draft** to work without publishing
- Preview in Sanity Studio
- Collaborate with team
- Publish when ready

### Updates

To update a published post:
1. Open post in Sanity
2. Make changes
3. Click **Publish** again
4. Translations auto-update (if auto-translate)

### Archiving

Set **Status** = "Archived" to:
- Hide from blog listings
- Keep for reference
- Unpublish without deleting

---

## 🔗 Internal Linking

### Related Posts

In **Content** tab:
1. Scroll to **Related Posts**
2. Click **Add item**
3. Search and select 2-3 related posts
4. These appear at bottom of post

**SEO benefit:**
- Increases time on site
- Distributes link equity
- Helps search engines understand relationships

### In-Content Links

While writing:
1. Select text
2. Click link icon
3. Enter URL (can be relative: `/blog/other-post`)
4. Choose "Open in new tab" if external

---

## 👥 Team Collaboration

### Multiple Authors

1. Create author profiles for each team member
2. Assign posts to different authors
3. Author bio appears on post

### Roles & Permissions

Sanity supports:
- **Administrator**: Full access
- **Editor**: Create & publish content
- **Contributor**: Create drafts only

Set in Sanity dashboard → Settings → Members

---

## 🌐 Multilingual Workflow

### Scenario 1: General Article

```
1. Write in English
2. Auto-translate ✅
3. Review translations (optional)
4. Edit if needed
```

### Scenario 2: French Market Article

```
1. Write in French
2. Set "Language-specific"
3. Only appears on French site
```

### Scenario 3: Manual Precision

```
1. Write English
2. Set "Manual only"
3. Hire translator
4. Create Spanish version manually
5. Link with Translation Key
```

### Editing Translations

Auto-translations are editable:
1. Find translated document in Sanity
2. Edit content
3. Publish changes

---

## 📈 Analytics & Insights

### Sanity Dashboard

Shows:
- Total posts
- Drafts vs published
- Recent activity
- Team member contributions

### Google Analytics

Track:
- Page views per language
- Time on page
- Bounce rate
- Conversions

(Setup Google Analytics in Layout.astro)

---

## 🐛 Troubleshooting

### Auto-Translation Not Working

**Check:**
1. Webhook configured in Sanity dashboard?
2. Webhook URL correct (`.netlify/functions/translate-blog`)?
3. Environment variables set in hosting?
4. `SANITY_WRITE_TOKEN` has Editor permissions?
5. Post language is "English"?
6. Translation Strategy is "Auto-translate"?
7. Post status is "Published"?

**View logs:**
- Netlify: Functions tab → translate-blog
- Vercel: Deployments → Function logs

### Images Not Loading

**Check:**
1. `PUBLIC_SANITY_PROJECT_ID` set?
2. Image uploaded to Sanity (not external URL)?
3. Alt text provided?

### Blog Page 404

**Check:**
1. Post status = "Published"?
2. Slug is correct?
3. Rebuilt site after creating post?
4. Language matches URL?

### Translation Key Missing

If related translations aren't linking:
1. Open English post
2. Note the `_id` (e.g., `abc123`)
3. Open each translation
4. Set **Translation Key** = `post-abc123`
5. Publish all

---

## 🚀 Next Steps

### 1. Create Content Calendar

Plan 10-20 blog topics:
- 2-4 posts per month
- Mix of general + language-specific
- Target different keywords per language

### 2. Optimize for SEO

- Add internal links between posts
- Use focus keywords in titles
- Write 1500+ word articles
- Add alt text to all images

### 3. Build Backlinks

- Share posts on social media
- Guest post with links back
- Submit to directories
- Engage in communities

### 4. Monitor Performance

- Google Search Console
- Google Analytics
- Track rankings
- Iterate based on data

---

## 📚 Additional Resources

### Sanity Documentation
- [Content Studio](https://www.sanity.io/docs/content-studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [PortableText](https://www.sanity.io/docs/presenting-block-text)

### Your Project Docs
- **Setup Guide**: `/docs/setup/ENV_SETUP.md`
- **CMS Comparison**: `/docs/reference/CMS_COMPARISON.md`
- **Full Solution**: `/docs/guides/BLOG_CMS_SOLUTION.md`

---

## 💡 Pro Tips

1. **Write long-form content** (1500+ words) → Better SEO
2. **Use H2/H3 headings** → Improves readability
3. **Add images every 300-500 words** → Breaks up text
4. **Internal linking** → Boosts all related pages
5. **Update old posts** → Keeps content fresh
6. **Track keywords** → Use Search Console
7. **Consistent publishing** → 2-4 posts/month ideal

---

## 🎉 You're Ready!

You now have:
- ✅ Enterprise CMS
- ✅ Auto-translation workflow
- ✅ Full multilingual support
- ✅ SEO optimization
- ✅ Image management
- ✅ Professional workflow

**Start creating content and watch your SEO grow!** 🚀

---

*Last updated: January 16, 2025*  
*Questions? Check `/docs/guides/` folder*

