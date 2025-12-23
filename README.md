# Digital Loyalty Platform 🎯

A modern, multilingual digital loyalty platform built with Astro and Sanity CMS. Designed for businesses to manage loyalty programs across multiple countries and languages.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run Sanity Studio (CMS)
npm run sanity
# → http://localhost:3333

# Run Astro (Frontend) in another terminal
npm run dev
# → http://localhost:4321
```

**First time setup?** → See [Documentation](./docs/README.md)

---

## ✨ Features

### Content Management
- 🌍 **Multilingual** - 7 languages supported (EN, ES, FR, PT, DE, AR, ZH)
- 📝 **Markdown Import** - Write blog posts in markdown, import to Sanity
- 🔄 **Auto-Translation** - Automatic translation with DeepL API
- 🎨 **Custom Studio UI** - Language-first navigation in Sanity

### Pricing System
- 💰 **Multi-Currency** - Region-specific pricing and currencies
- 🌐 **Global Reach** - 280+ countries supported
- 🔗 **Linked Translations** - Consistent pricing across languages
- 📊 **Flexible Plans** - Easy to manage and update

### Technical
- ⚡ **Astro** - Fast, modern static site generation
- 🎯 **Sanity CMS** - Powerful headless CMS
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 🔍 **SEO Optimized** - Meta tags, sitemaps, structured data
- 📱 **Mobile First** - Responsive across all devices

---

## 📁 Project Structure

```
digital-loyalty-site/
├── src/
│   ├── pages/              # Astro pages (routes)
│   ├── components/         # React/Astro components
│   ├── layouts/            # Page layouts
│   ├── config/             # Config files (countries, currencies)
│   └── styles/             # Global styles
├── sanity/
│   ├── schemas/            # Sanity content schemas
│   ├── components/         # Custom Studio UI components
│   ├── structure/          # Custom Studio navigation
│   └── lib/                # Sanity client & utilities
└── docs/                   # Documentation
    ├── templates/          # Blog post templates
    ├── setup/              # Setup guides
    └── guides/             # Usage guides
```

---

## 📚 Documentation

- **[Full Documentation](./docs/README.md)** - Complete guide

### Blog Templates
- **[Manual Template](./docs/templates/BLOG_POST_TEMPLATE.md)** ⭐ - For writing posts manually
- **[AI Generation Prompt](./docs/templates/AI_BLOG_GENERATION_PROMPT.md)** 🤖 - For generating posts with AI

### Setup Guides
- [Environment Setup](./docs/setup/ENV_SETUP.md)
- [Sanity CMS Setup](./docs/setup/SANITY_SETUP.md)

### Usage Guides
- [Sanity CMS Usage](./docs/guides/SANITY_CMS_USAGE.md) - Managing content
- [Automation Guide](./docs/guides/AUTOMATION_GUIDE.md) - Auto-translation
- [Future AI Pipeline](./docs/guides/FUTURE_AI_PIPELINE.md) - Planned features

---

## 🎯 Common Tasks

### Create a Blog Post

**Option 1: Manual (Copy Template)**
1. Copy `docs/templates/BLOG_POST_TEMPLATE.md` and edit it
2. Open Sanity Studio → Blog Posts → English → All Posts → +
3. Save draft (Ctrl+S)
4. Click "📄 Import Markdown Template" button
5. Paste your markdown, click "Import & Fill Fields"
6. Add category, tags, author, and images manually
7. Publish! 🎉

**Option 2: AI Generated**
1. Use `docs/templates/AI_BLOG_GENERATION_PROMPT.md` with ChatGPT/Claude
2. Provide topic and requirements to AI
3. Copy the generated markdown
4. Import to Sanity Studio (steps 2-7 above)

### Update Pricing
1. Open Sanity Studio → Pricing Plans
2. Select language (e.g., English)
3. Edit or create pricing plans
4. Save & publish

### Deploy Changes
```bash
# Build for production
npm run build

# Deploy (Netlify/Vercel will auto-deploy on push)
git push origin main
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Astro, React, TypeScript |
| **CMS** | Sanity.io |
| **Styling** | Tailwind CSS |
| **i18n** | Custom (country configs) |
| **Translation** | DeepL API |
| **Deployment** | Netlify / Vercel |

---

## 🌍 Supported Languages

- 🇺🇸 English (en)
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)
- 🇵🇹 Portuguese (pt)
- 🇩🇪 German (de)
- 🇸🇦 Arabic (ar)
- 🇨🇳 Chinese (zh)

---

## 📦 NPM Scripts

```bash
# Development
npm run dev           # Start Astro dev server
npm run sanity        # Start Sanity Studio

# Production
npm run build         # Build for production
npm run preview       # Preview production build

# Utilities
npm run astro:check   # Check Astro setup
npm run sanity:deploy # Deploy Sanity Studio
```

---

## 🔧 Environment Variables

Create a `.env` file:

```env
# Sanity
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# DeepL (for auto-translation)
DEEPL_API_KEY=your_deepl_key

# Site
PUBLIC_SITE_URL=https://yourdomain.com
```

See: [Environment Setup Guide](./docs/setup/ENV_SETUP.md)

---

## 🎨 Content Structure

### Blog Posts (Language-First)
Each language is a separate document:

```
"Customer Retention Tips"
├── EN: blog-post-abc123
├── ES: blog-post-def456
├── FR: blog-post-ghi789
└── PT: blog-post-jkl012
```

Linked by `masterBlogId` for translations.

### Pricing Plans (Region-Specific)
Each language/region has its own pricing:

```
"Starter Plan"
├── EN (USD): $29/month
├── ES (EUR): €25/month
├── FR (EUR): €25/month
└── PT (BRL): R$150/month
```

Linked by `planId` for consistency.

---

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test locally
4. Update documentation if needed
5. Submit a pull request

---

## 📄 License

[Your License Here]

---

## 🆘 Need Help?

- **Documentation**: [./docs/README.md](./docs/README.md)
- **Blog Templates**: [./docs/templates/](./docs/templates/)
  - Manual: [BLOG_POST_TEMPLATE.md](./docs/templates/BLOG_POST_TEMPLATE.md)
  - AI: [AI_BLOG_GENERATION_PROMPT.md](./docs/templates/AI_BLOG_GENERATION_PROMPT.md)
- **Sanity Docs**: https://www.sanity.io/docs
- **Astro Docs**: https://docs.astro.build

---

Built with ❤️ using Astro and Sanity
