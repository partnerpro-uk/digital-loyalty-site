# Digital Loyalty Platform - Documentation

Welcome to the Digital Loyalty Platform documentation. This guide will help you understand and work with the codebase.

---

## 📋 Quick Links

### Blog Post Templates
- **[Manual Template](./templates/BLOG_POST_TEMPLATE.md)** ⭐ - Copy and edit manually (includes YAML syntax guide)
- **[AI Generation Prompt](./templates/AI_BLOG_GENERATION_PROMPT.md)** 🤖 - Use with ChatGPT/Claude to generate complete posts

### Setup Guides
- **[Environment Setup](./setup/ENV_SETUP.md)** - Configure environment variables
- **[Sanity Setup](./setup/SANITY_SETUP.md)** - Initial Sanity CMS setup

### Usage Guides
- **[Sanity CMS Usage](./guides/SANITY_CMS_USAGE.md)** - Complete guide to using Sanity for content management
- **[Automation Guide](./guides/AUTOMATION_GUIDE.md)** - Auto-translation and webhooks setup
- **[Future AI Pipeline](./guides/FUTURE_AI_PIPELINE.md)** - Planned AI features and enhancements

---

## 🚀 Quick Start

### 1. First Time Setup
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Sanity project details
```

See: [Environment Setup](./setup/ENV_SETUP.md) | [Sanity Setup](./setup/SANITY_SETUP.md)

### 2. Start Development
```bash
# Run Sanity Studio (CMS)
npm run sanity

# Run Astro (Frontend) in another terminal
npm run dev
```

- Sanity Studio: http://localhost:3333
- Astro Site: http://localhost:4321

### 3. Create Your First Blog Post

**Option A: Manual Creation**
1. Copy [BLOG_POST_TEMPLATE.md](./templates/BLOG_POST_TEMPLATE.md) and edit
2. Open Sanity Studio → Blog Posts → English → All Posts → "+"
3. Save draft (Ctrl+S)
4. Click "📄 Import Markdown Template" button
5. Paste your markdown → Click "Import & Fill Fields"
6. Fill in manual fields (category, tags, author, images)
7. Publish!

**Option B: AI Generation**
1. Open [AI_BLOG_GENERATION_PROMPT.md](./templates/AI_BLOG_GENERATION_PROMPT.md)
2. Use with ChatGPT/Claude: "Write a blog post about [topic] using this format"
3. Copy generated markdown
4. Import to Sanity (steps 2-7 above)

See: [Sanity CMS Usage Guide](./guides/SANITY_CMS_USAGE.md)

---

## 📚 Documentation Structure

```
docs/
├── README.md (this file)
├── setup/
│   ├── ENV_SETUP.md       - Environment variables
│   └── SANITY_SETUP.md    - Sanity CMS initial setup
└── guides/
    ├── SANITY_CMS_USAGE.md    - Using Sanity (blog, pricing, content)
    ├── AUTOMATION_GUIDE.md    - Auto-translation setup
    └── FUTURE_AI_PIPELINE.md  - Future AI features
```

---

## 🎯 Common Tasks

### Creating Content

**Blog Posts:**
1. Use [BLOG_POST_TEMPLATE.md](../BLOG_POST_TEMPLATE.md) (includes YAML syntax guide)
2. Import markdown in Sanity Studio
3. Add category, tags, author, and images manually
4. Publish

**Pricing Plans:**
- Language-first navigation in Sanity
- Create plans per language/region
- Linked by `planId` for translations

See: [Sanity CMS Usage](./guides/SANITY_CMS_USAGE.md)

### Managing Translations

**Auto-Translation:**
- Configure webhooks in Sanity
- Set up DeepL API
- English posts auto-translate to other languages

**Manual Control:**
- Use `languageSpecific: true` to prevent auto-translation
- Use `translateTo: [es, fr]` to specify languages

See: [Automation Guide](./guides/AUTOMATION_GUIDE.md)

---

## 🏗️ Project Architecture

### Content Management (Sanity)
- **Blog Posts**: Language-specific documents linked by `masterBlogId`
- **Pricing Plans**: Language/region-specific documents linked by `planId`
- **Categories, Tags, Authors**: Multilingual reference data
- **Custom Studio UI**: Language-first navigation, markdown import

### Frontend (Astro)
- **Static Site Generation**: Pre-rendered pages for performance
- **I18n Routing**: `/` (en), `/es/`, `/fr/`, etc.
- **Dynamic Content**: Fetched from Sanity at build time
- **SEO Optimized**: Meta tags, sitemaps, structured data

### Automation
- **Webhooks**: Trigger auto-translation on publish
- **DeepL API**: High-quality machine translation
- **Scheduled Builds**: Netlify/Vercel rebuild on content changes

---

## 🔧 Tech Stack

- **Frontend**: Astro + React + TypeScript
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS
- **i18n**: Custom implementation with country configs
- **Deployment**: Netlify/Vercel
- **Translation**: DeepL API

---

## 📖 Key Concepts

### Language-First Content Structure

Instead of storing all languages in one document, each language version is a separate document:

```
Blog Post: "Customer Retention Tips"
├── EN: blog-post-abc123 (masterBlogId: master-xyz)
├── ES: blog-post-def456 (masterBlogId: master-xyz)
├── FR: blog-post-ghi789 (masterBlogId: master-xyz)
└── PT: blog-post-jkl012 (masterBlogId: master-xyz)
```

Benefits:
- ✅ Clean Sanity Studio UI
- ✅ Easy filtering by language
- ✅ Independent publishing workflow
- ✅ Automatic linking via masterBlogId

### Markdown Import Workflow

1. Write blog post in markdown with YAML frontmatter
2. Import in Sanity Studio (auto-fills 12+ fields)
3. Manually add: category, tags, author, images
4. Publish → Auto-translation triggers (if enabled)

See: [BLOG_POST_TEMPLATE.md](../BLOG_POST_TEMPLATE.md)

### Multi-Currency Pricing

- Prices stored per language/region
- Automatic currency conversion
- Country-specific pricing strategies
- Linked by `planId` for consistency

---

## 🆘 Getting Help

### Common Issues

**"Save draft first" error when importing markdown:**
- Press Ctrl+S (or Cmd+S) to save before clicking import

**Keywords didn't import:**
- Use dashes (`-`) not asterisks (`*`) in YAML arrays
- See YAML syntax guide in [BLOG_POST_TEMPLATE.md](../BLOG_POST_TEMPLATE.md)

**Sanity Studio not loading:**
- Check `SANITY_STUDIO_PROJECT_ID` in `.env`
- Run `npm run sanity` not `npm run dev`

**Content not showing on site:**
- Rebuild site after publishing in Sanity
- Check language filtering in GROQ queries

### Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [DeepL API](https://www.deepl.com/docs-api)

---

## 🎨 Project Status

### ✅ Completed
- Multilingual Astro site with i18n routing
- Sanity CMS with custom Studio UI
- Language-first content structure
- Markdown import for blog posts
- Multi-currency pricing system
- Auto-translation webhooks (setup guide provided)

### 🔄 In Progress
- Initial content creation
- Auto-translation integration
- Production deployment

### 📅 Planned
- AI-powered content optimization
- Advanced analytics integration
- A/B testing framework
- See: [Future AI Pipeline](./guides/FUTURE_AI_PIPELINE.md)

---

## 📝 Contributing

When adding new features or documentation:

1. **Keep it organized** - Add docs to appropriate folders
2. **Update this index** - Link new guides here
3. **Test changes** - Verify in both dev and prod
4. **Clean as you go** - Delete outdated docs

---

**Need more help?** Check the specific guide for your task above! 🚀
