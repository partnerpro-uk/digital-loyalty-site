import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { media } from 'sanity-plugin-media';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { iconPicker } from 'sanity-plugin-icon-picker';

import { blogPost } from './sanity/schemas/blogPost';
import { category } from './sanity/schemas/category';
import { tag } from './sanity/schemas/tag';
import { author } from './sanity/schemas/author';
import { pricingPlan } from './sanity/schemas/pricingPlan';
import { blogTemplate } from './sanity/schemas/blogTemplate';
import { testimonial } from './sanity/schemas/testimonial';
import { clientLogo } from './sanity/schemas/clientLogo';
import { faqItem } from './sanity/schemas/faqItem';
import { siteSettings } from './sanity/schemas/siteSettings';
import { pageContent } from './sanity/schemas/pageContent';
import { navigation } from './sanity/schemas/navigation';
import { footer } from './sanity/schemas/footer';
import { leadForm } from './sanity/schemas/leadForm';
import { leadSubmission } from './sanity/schemas/leadSubmission';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'digital-loyalty',
  title: 'Digital Loyalty CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'zutnuftx',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure
    }),
    visionTool(),
    codeInput(),
    media(),
    unsplashImageAsset(),
    iconPicker()
  ],


  // Form configuration for better UX
  form: {
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources;
      }
    }
  },

  schema: {
    types: [
      // Core content
      siteSettings,
      pageContent,
      navigation,
      footer,
      // Lead capture
      leadForm,
      leadSubmission,
      // Dynamic content
      testimonial,
      faqItem,
      clientLogo,
      pricingPlan,
      // Blog
      blogPost,
      blogTemplate,
      category,
      tag,
      author
    ]
  }
});

