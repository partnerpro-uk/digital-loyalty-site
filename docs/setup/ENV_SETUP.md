# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# DeepL API for translations
DEEPL_API_KEY=your_deepl_api_key_here

# Public site URL for SEO
PUBLIC_SITE_URL=https://digitalloyalty.com

# Sanity CMS Configuration
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production

# Sanity Write Token (for webhooks)
SANITY_WRITE_TOKEN=your_sanity_write_token
```

## How to Get Each Value

### 1. DeepL API Key

1. Go to https://www.deepl.com/pro-api
2. Sign up for free tier (500k characters/month)
3. Create an API key
4. Copy and paste into `.env`

**You already have this:**
```
DEEPL_API_KEY=650bd9a1-7c65-4ae6-9333-de9e643dffdd:fx
```

### 2. Sanity Project ID & Dataset

**Run this command to create a new Sanity project:**

```bash
npx sanity init --project-plan free
```

Follow the prompts:
- **Create new project**: Yes
- **Project name**: Digital Loyalty CMS
- **Dataset**: production
- **Output path**: Leave default (current directory)

This will give you a **Project ID** - copy it to your `.env` file.

### 3. Sanity Write Token

1. Go to https://sanity.io/manage
2. Select your project
3. Go to **Settings** → **API** → **Tokens**
4. Click **Add API token**
5. Name: `Webhook Auto-Translation`
6. Permissions: **Editor**
7. Copy the token and paste into `.env`

## Complete .env File Example

```bash
# Your actual values
DEEPL_API_KEY=650bd9a1-7c65-4ae6-9333-de9e643dffdd:fx
PUBLIC_SITE_URL=https://digitalloyalty.com

# After running 'npx sanity init'
PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Replace with your project ID
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=abc123xyz  # Same as above
SANITY_STUDIO_DATASET=production

# After creating API token
SANITY_WRITE_TOKEN=skABC123...xyz  # Replace with your token
```

## Next Steps

After setting up `.env`:

1. **Deploy Sanity Studio:**
   ```bash
   npx sanity deploy
   ```

2. **Access Sanity Studio:**
   - Go to `https://your-project.sanity.studio`
   - Or run locally: `npx sanity dev`

3. **Configure Webhook:**
   - Go to Sanity dashboard → Settings → Webhooks
   - Add new webhook:
     - **URL**: `https://your-site.netlify.app/.netlify/functions/translate-blog`
     - **Trigger on**: Create, Update
     - **Filter**: `_type == "blogPost" && translationStrategy == "auto" && language == "en"`
     - **HTTP method**: POST

## Security Notes

⚠️ **Never commit `.env` to Git!**

The `.gitignore` file already excludes it, but double-check:

```bash
# Check if .env is ignored
git status
# .env should NOT appear
```

## Testing

Test that environment variables are loaded:

```bash
# In your terminal
echo $PUBLIC_SANITY_PROJECT_ID
# Should output your project ID
```

Or add this to any Astro page:

```astro
---
console.log('Sanity Project ID:', import.meta.env.PUBLIC_SANITY_PROJECT_ID);
---
```

