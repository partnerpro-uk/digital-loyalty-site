# ✅ Sanity CMS Setup Checklist

## Quick Setup Guide (30-60 minutes)

---

## Step 1: Initialize Sanity Project (5 minutes)

```bash
npx sanity init --project-plan free
```

**Prompts:**
- Create new project? **Yes**
- Project name: **Digital Loyalty CMS**
- Dataset: **production**
- Output path: **[Press Enter]**

✅ **Save your Project ID!**

---

## Step 2: Configure Environment Variables (2 minutes)

Create `.env` file in project root:

```bash
# DeepL (you already have this)
DEEPL_API_KEY=650bd9a1-7c65-4ae6-9333-de9e643dffdd:fx

# Public URL
PUBLIC_SITE_URL=https://digitalloyalty.com

# Sanity (replace with YOUR project ID)
PUBLIC_SANITY_PROJECT_ID=your_project_id_here
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

---

## Step 3: Create API Token (3 minutes)

1. Go to https://sanity.io/manage
2. Select your project
3. Settings → API → Tokens
4. Add API token
   - Name: `Webhook Auto-Translation`
   - Permissions: **Editor**
5. Copy token
6. Add to `.env`:

```bash
SANITY_WRITE_TOKEN=your_token_here
```

---

## Step 4: Deploy Sanity Studio (2 minutes)

```bash
npx sanity deploy
```

**Choose hostname:**
- Example: `digital-loyalty`
- Access: `https://digital-loyalty.sanity.studio`

✅ **Bookmark this URL!**

---

## Step 5: Create Initial Content (10 minutes)

### 5.1 Create Author

1. Open Sanity Studio
2. Click **Author** → **Create new**
3. Fill in:
   - Name: Your Name
   - Slug: auto-generated
   - Upload profile image
   - Write bio (English at minimum)
4. **Publish**

### 5.2 Create Category

1. Click **Category** → **Create new**
2. Fill in:
   - Name (English): `Customer Loyalty`
   - Slug: auto-generated
   - Description: Brief description
   - Color: `#8b5cf6`
3. **Publish**

### 5.3 Create Tags (Optional)

1. Click **Tag** → **Create new**
2. Create 3-5 tags:
   - `Loyalty Programs`
   - `Customer Retention`
   - `Digital Marketing`
3. **Publish** each

---

## Step 6: Test with First Blog Post (15 minutes)

### Create Test Post

1. Click **Blog Post** → **Create new**
2. **Content Tab:**
   - Title: `Test Post - 10 Loyalty Tips`
   - Excerpt: `This is a test post to verify auto-translation works correctly.`
   - Content: Write a few paragraphs
   - Upload featured image
   - Select category
   - Add 2-3 tags
3. **Translation Tab:**
   - Language: **English**
   - Translation Strategy: **Manual translation only** (for now)
4. **SEO Tab:**
   - SEO Description: `Testing the new blog system`
   - Keywords: `test`, `loyalty`, `tips`
5. **Meta Tab:**
   - Author: Select yourself
   - Status: **Published** ✅
6. **Publish**

### Verify

1. Run `npm run dev`
2. Go to `http://localhost:5173/blog`
3. See your post? ✅

---

## Step 7: Deploy to Production (10 minutes)

### 7.1 Deploy Site

```bash
# Build
npm run build

# Deploy to Netlify
netlify deploy --prod

# Or Vercel
vercel --prod
```

✅ **Note your site URL!**

### 7.2 Add Environment Variables to Hosting

**On Netlify:**
1. Site settings → Environment variables
2. Add all variables from `.env`

**On Vercel:**
1. Project Settings → Environment Variables
2. Add all variables from `.env`

---

## Step 8: Configure Webhook (5 minutes)

1. Go to https://sanity.io/manage
2. Select project → Settings → Webhooks
3. **Add Webhook**
4. Configure:
   ```
   Name: Auto-translate blog posts
   URL: https://yoursite.com/.netlify/functions/translate-blog
   Dataset: production
   Trigger on: Create, Update
   Filter: _type == "blogPost" && translationStrategy == "auto" && language == "en"
   HTTP method: POST
   ```
5. **Save**

---

## Step 9: Test Auto-Translation (10 minutes)

### Create Auto-Translated Post

1. Open Sanity Studio
2. **Blog Post** → **Create new**
3. Write content in English
4. **Translation Tab:**
   - Translation Strategy: **Auto-translate to all languages** ✅
5. Set Status: **Published**
6. **Publish**

### Verify Translations

Wait 30-60 seconds, then:

1. Refresh Sanity Studio
2. Look for 6 new posts with `-es`, `-fr`, etc. suffixes
3. Check your site:
   - `yoursite.com/es/blog/` (Spanish)
   - `yoursite.com/fr/blog/` (French)
   - etc.

**✅ Translations created?** Success!

---

## Troubleshooting

### Webhook Not Triggering?

**Check:**
- [ ] Webhook URL correct?
- [ ] Environment variables set in hosting?
- [ ] `SANITY_WRITE_TOKEN` has Editor permissions?
- [ ] Post language is "English"?
- [ ] Translation strategy is "Auto-translate"?
- [ ] Post status is "Published"?

**View logs:**
- Netlify: Functions → translate-blog
- Vercel: Deployments → Function logs

### Images Not Showing?

**Check:**
- [ ] `PUBLIC_SANITY_PROJECT_ID` in `.env`?
- [ ] Image uploaded to Sanity (not external URL)?
- [ ] Alt text provided?

### Build Errors?

```bash
# Clear cache and rebuild
rm -rf .astro dist node_modules/.vite
npm install
npm run build
```

---

## ✅ Setup Complete!

You now have:
- ✅ Sanity CMS running
- ✅ Content created
- ✅ Blog pages working
- ✅ Auto-translation configured
- ✅ Production deployed

---

## 📚 Next Steps

1. **Read full guide**: `/docs/guides/SANITY_CMS_USAGE.md`
2. **Create content calendar**: Plan 10-20 blog topics
3. **Start publishing**: 2-4 posts per month
4. **Monitor SEO**: Google Search Console

---

## 🆘 Need Help?

Check documentation:
- **Full CMS Guide**: `/docs/guides/SANITY_CMS_USAGE.md`
- **CMS Solution**: `/docs/guides/BLOG_CMS_SOLUTION.md`
- **CMS Comparison**: `/docs/reference/CMS_COMPARISON.md`
- **Env Setup**: `/docs/setup/ENV_SETUP.md`

---

## 🎯 Quick Commands

```bash
# Run Sanity Studio locally
npx sanity dev

# Deploy Sanity Studio
npx sanity deploy

# Run Astro dev server
npm run dev

# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod

# Deploy to Vercel
vercel --prod
```

---

**Ready to create amazing content!** 🚀

