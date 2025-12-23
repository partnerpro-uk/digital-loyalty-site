/**
 * Sanity Webhook for Auto-Translation of Page Content
 * Handles translation of pageContent, navigation, and footer documents
 */

import { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@sanity/client';
import * as deepl from 'deepl-node';

// Environment variables
const SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '';
const SANITY_DATASET = process.env.SANITY_STUDIO_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN || '';
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || '';
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';

// Initialize clients
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2025-01-16',
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const deeplTranslator = new deepl.Translator(DEEPL_API_KEY);

// Language mapping (Sanity code -> DeepL code)
const LANGUAGE_MAP: Record<string, deepl.TargetLanguageCode> = {
  'es': 'es',
  'fr': 'fr',
  'pt': 'pt-PT',
  'de': 'de',
  'ar': 'ar',
  'zh': 'zh',
};

const TARGET_LANGUAGES = ['es', 'fr', 'pt', 'de', 'ar', 'zh'];

// Fields that should NOT be translated (URLs, icons, etc.)
const NON_TRANSLATABLE_FIELDS = [
  '_type', '_key', '_ref', '_id',
  'href', 'url', 'videoUrl',
  'icon', 'variant', 'size',
  'asset', 'hotspot', 'crop',
  'isAnchor', 'openInNewTab', 'highlight',
  'showLanguageSwitcher', 'showThemeToggle',
  'showSocialLinks', 'showNewsletter',
  'noIndex'
];

/**
 * Translate text using DeepL
 */
async function translateText(
  text: string,
  targetLang: deepl.TargetLanguageCode
): Promise<string> {
  try {
    const result = await deeplTranslator.translateText(text, null, targetLang);
    return result.text;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error);
    return text; // Return original text if translation fails
  }
}

/**
 * Recursively translate all string fields in an object
 */
async function translateObject(
  obj: any,
  targetLang: deepl.TargetLanguageCode
): Promise<any> {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle strings
  if (typeof obj === 'string') {
    // Don't translate empty strings or very short strings that might be codes
    if (obj.length < 2 || obj.startsWith('#') || obj.startsWith('http')) {
      return obj;
    }
    return translateText(obj, targetLang);
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, targetLang)));
  }

  // Handle objects
  if (typeof obj === 'object') {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      // Skip non-translatable fields
      if (NON_TRANSLATABLE_FIELDS.includes(key)) {
        result[key] = value;
      } else {
        result[key] = await translateObject(value, targetLang);
      }
    }

    return result;
  }

  // Return primitives as-is
  return obj;
}

/**
 * Translate pageContent document
 */
async function translatePageContent(
  sourceDoc: any,
  targetLang: string
): Promise<void> {
  const deeplLang = LANGUAGE_MAP[targetLang];
  if (!deeplLang) {
    console.warn(`No DeepL mapping for language: ${targetLang}`);
    return;
  }

  try {
    console.log(`Translating pageContent (${sourceDoc.pageId}) to ${targetLang}...`);

    // Check if translation exists and was manually edited
    const existingDoc = await sanityClient.fetch(
      `*[_type == "pageContent" && pageId == $pageId && language == $lang][0]`,
      { pageId: sourceDoc.pageId, lang: targetLang }
    );

    // Skip if manually edited (autoTranslated = false means user edited it)
    if (existingDoc && existingDoc.autoTranslated === false) {
      console.log(`Skipping ${targetLang}: manually edited`);
      return;
    }

    // Translate each section
    const translatedDoc = {
      _type: 'pageContent',
      _id: `${sourceDoc.pageId}-${targetLang}`,
      pageId: sourceDoc.pageId,
      language: targetLang,
      seo: await translateObject(sourceDoc.seo, deeplLang),
      hero: await translateObject(sourceDoc.hero, deeplLang),
      socialProof: await translateObject(sourceDoc.socialProof, deeplLang),
      problemSolution: await translateObject(sourceDoc.problemSolution, deeplLang),
      features: await translateObject(sourceDoc.features, deeplLang),
      video: await translateObject(sourceDoc.video, deeplLang),
      testimonials: await translateObject(sourceDoc.testimonials, deeplLang),
      faq: await translateObject(sourceDoc.faq, deeplLang),
      finalCta: await translateObject(sourceDoc.finalCta, deeplLang),
      translationStatus: 'needs_review',
      autoTranslated: true,
      lastTranslated: new Date().toISOString(),
      sourceDocument: {
        _type: 'reference',
        _ref: sourceDoc._id,
      },
    };

    // Create or update document
    await sanityClient.createOrReplace(translatedDoc);
    console.log(`✅ Created translated pageContent: ${sourceDoc.pageId}-${targetLang}`);
  } catch (error) {
    console.error(`❌ Error translating pageContent to ${targetLang}:`, error);
    throw error;
  }
}

/**
 * Translate navigation document
 */
async function translateNavigation(
  sourceDoc: any,
  targetLang: string
): Promise<void> {
  const deeplLang = LANGUAGE_MAP[targetLang];
  if (!deeplLang) {
    console.warn(`No DeepL mapping for language: ${targetLang}`);
    return;
  }

  try {
    console.log(`Translating navigation to ${targetLang}...`);

    // Check if translation exists and was manually edited
    const existingDoc = await sanityClient.fetch(
      `*[_type == "navigation" && language == $lang][0]`,
      { lang: targetLang }
    );

    if (existingDoc && existingDoc.autoTranslated === false) {
      console.log(`Skipping navigation ${targetLang}: manually edited`);
      return;
    }

    // Translate navigation items and CTA
    const translatedItems = await Promise.all(
      (sourceDoc.items || []).map(async (item: any) => ({
        ...item,
        label: await translateText(item.label, deeplLang),
      }))
    );

    const translatedCtaButton = sourceDoc.ctaButton
      ? {
          ...sourceDoc.ctaButton,
          text: await translateText(sourceDoc.ctaButton.text, deeplLang),
        }
      : undefined;

    const translatedDoc = {
      _type: 'navigation',
      _id: `navigation-${targetLang}`,
      language: targetLang,
      items: translatedItems,
      ctaButton: translatedCtaButton,
      showLanguageSwitcher: sourceDoc.showLanguageSwitcher,
      showThemeToggle: sourceDoc.showThemeToggle,
      autoTranslated: true,
      lastTranslated: new Date().toISOString(),
    };

    await sanityClient.createOrReplace(translatedDoc);
    console.log(`✅ Created translated navigation: ${targetLang}`);
  } catch (error) {
    console.error(`❌ Error translating navigation to ${targetLang}:`, error);
    throw error;
  }
}

/**
 * Translate footer document
 */
async function translateFooter(
  sourceDoc: any,
  targetLang: string
): Promise<void> {
  const deeplLang = LANGUAGE_MAP[targetLang];
  if (!deeplLang) {
    console.warn(`No DeepL mapping for language: ${targetLang}`);
    return;
  }

  try {
    console.log(`Translating footer to ${targetLang}...`);

    // Check if translation exists and was manually edited
    const existingDoc = await sanityClient.fetch(
      `*[_type == "footer" && language == $lang][0]`,
      { lang: targetLang }
    );

    if (existingDoc && existingDoc.autoTranslated === false) {
      console.log(`Skipping footer ${targetLang}: manually edited`);
      return;
    }

    // Translate tagline
    const translatedTagline = sourceDoc.tagline
      ? await translateText(sourceDoc.tagline, deeplLang)
      : undefined;

    // Translate columns (titles and link labels)
    const translatedColumns = await Promise.all(
      (sourceDoc.columns || []).map(async (column: any) => ({
        ...column,
        title: await translateText(column.title, deeplLang),
        links: await Promise.all(
          (column.links || []).map(async (link: any) => ({
            ...link,
            label: await translateText(link.label, deeplLang),
          }))
        ),
      }))
    );

    // Translate copyright
    const translatedCopyright = sourceDoc.copyright
      ? await translateText(sourceDoc.copyright, deeplLang)
      : undefined;

    // Translate legal links
    const translatedLegalLinks = await Promise.all(
      (sourceDoc.legalLinks || []).map(async (link: any) => ({
        ...link,
        label: await translateText(link.label, deeplLang),
      }))
    );

    // Translate newsletter fields
    const translatedNewsletterTitle = sourceDoc.newsletterTitle
      ? await translateText(sourceDoc.newsletterTitle, deeplLang)
      : undefined;
    const translatedNewsletterPlaceholder = sourceDoc.newsletterPlaceholder
      ? await translateText(sourceDoc.newsletterPlaceholder, deeplLang)
      : undefined;
    const translatedNewsletterButtonText = sourceDoc.newsletterButtonText
      ? await translateText(sourceDoc.newsletterButtonText, deeplLang)
      : undefined;

    const translatedDoc = {
      _type: 'footer',
      _id: `footer-${targetLang}`,
      language: targetLang,
      tagline: translatedTagline,
      columns: translatedColumns,
      copyright: translatedCopyright,
      legalLinks: translatedLegalLinks,
      showSocialLinks: sourceDoc.showSocialLinks,
      showNewsletter: sourceDoc.showNewsletter,
      newsletterTitle: translatedNewsletterTitle,
      newsletterPlaceholder: translatedNewsletterPlaceholder,
      newsletterButtonText: translatedNewsletterButtonText,
      autoTranslated: true,
      lastTranslated: new Date().toISOString(),
    };

    await sanityClient.createOrReplace(translatedDoc);
    console.log(`✅ Created translated footer: ${targetLang}`);
  } catch (error) {
    console.error(`❌ Error translating footer to ${targetLang}:`, error);
    throw error;
  }
}

/**
 * Main webhook handler
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Verify webhook signature (optional)
  const signature = event.headers['sanity-webhook-signature'];
  if (SANITY_WEBHOOK_SECRET && signature !== SANITY_WEBHOOK_SECRET) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid webhook signature' }),
    };
  }

  // Parse payload
  let payload: any;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON payload' }),
    };
  }

  console.log('Webhook received:', {
    type: payload._type,
    id: payload._id,
    language: payload.language,
    pageId: payload.pageId,
  });

  // Only process English source documents
  if (payload.language !== 'en') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Skipping non-English document' }),
    };
  }

  // Translate based on document type
  const translationPromises: Promise<void>[] = [];

  try {
    if (payload._type === 'pageContent') {
      for (const lang of TARGET_LANGUAGES) {
        translationPromises.push(translatePageContent(payload, lang));
      }
    } else if (payload._type === 'navigation') {
      for (const lang of TARGET_LANGUAGES) {
        translationPromises.push(translateNavigation(payload, lang));
      }
    } else if (payload._type === 'footer') {
      for (const lang of TARGET_LANGUAGES) {
        translationPromises.push(translateFooter(payload, lang));
      }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Unsupported document type: ${payload._type}` }),
      };
    }

    // Wait for all translations
    await Promise.all(translationPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully translated ${payload._type} to ${TARGET_LANGUAGES.length} languages`,
        languages: TARGET_LANGUAGES,
      }),
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Translation failed', details: String(error) }),
    };
  }
};
