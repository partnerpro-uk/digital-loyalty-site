/**
 * Sanity Webhook for Auto-Translation
 * Handles language-specific document creation for blog posts and pricing plans
 */

import { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@sanity/client';
import * as deepl from 'deepl-node';

// Environment variables
const SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || '';
const SANITY_DATASET = process.env.SANITY_STUDIO_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_WRITE_TOKEN || '';
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

interface WebhookPayload {
  _type: string;
  _id: string;
  _rev: string;
  language?: string;
  languageSettings?: {
    isLanguageSpecific?: boolean;
    publishToLanguages?: string[];
  };
  [key: string]: any;
}

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
 * Translate an array of strings
 */
async function translateArray(
  arr: string[],
  targetLang: deepl.TargetLanguageCode
): Promise<string[]> {
  return Promise.all(arr.map(item => translateText(item, targetLang)));
}

/**
 * Translate PortableText content
 */
async function translatePortableText(
  content: any[],
  targetLang: deepl.TargetLanguageCode
): Promise<any[]> {
  if (!content || !Array.isArray(content)) return content;

  return Promise.all(content.map(async (block) => {
    if (block._type === 'block' && block.children) {
      const translatedChildren = await Promise.all(
        block.children.map(async (child: any) => {
          if (child._type === 'span' && child.text) {
            return {
              ...child,
              text: await translateText(child.text, targetLang),
            };
          }
          return child;
        })
      );
      return { ...block, children: translatedChildren };
    }
    return block;
  }));
}

/**
 * Generate a unique masterBlogId or planId
 */
function generateMasterId(): string {
  return `master-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Translate and create blog post in target language
 */
async function translateBlogPost(
  sourceDoc: any,
  targetLang: string
): Promise<void> {
  const deeplLang = LANGUAGE_MAP[targetLang];
  if (!deeplLang) {
    console.warn(`No DeepL mapping for language: ${targetLang}`);
    return;
  }

  try {
    console.log(`Translating blog post to ${targetLang}...`);

    // Translate fields
    const translatedTitle = await translateText(sourceDoc.title, deeplLang);
    const translatedExcerpt = sourceDoc.excerpt 
      ? await translateText(sourceDoc.excerpt, deeplLang) 
      : undefined;
    const translatedContent = await translatePortableText(sourceDoc.content, deeplLang);
    const translatedSeoTitle = sourceDoc.seoTitle
      ? await translateText(sourceDoc.seoTitle, deeplLang)
      : undefined;
    const translatedSeoDescription = sourceDoc.seoDescription
      ? await translateText(sourceDoc.seoDescription, deeplLang)
      : undefined;

    // Generate slug from translated title
    const translatedSlug = translatedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Create new document
    const newDoc = {
      _type: 'blogPost',
      _id: `drafts.${sourceDoc.masterBlogId || sourceDoc._id}-${targetLang}`,
      masterBlogId: sourceDoc.masterBlogId || sourceDoc._id,
      language: targetLang,
      title: translatedTitle,
      slug: {
        _type: 'slug',
        current: translatedSlug,
      },
      excerpt: translatedExcerpt,
      content: translatedContent,
      featuredImage: sourceDoc.featuredImage, // Keep same image
      templateType: sourceDoc.templateType,
      category: sourceDoc.category,
      tags: sourceDoc.tags,
      relatedPosts: sourceDoc.relatedPosts,
      seoTitle: translatedSeoTitle,
      seoDescription: translatedSeoDescription,
      seoKeywords: sourceDoc.seoKeywords, // Keep same keywords
      ogImage: sourceDoc.ogImage,
      author: sourceDoc.author,
      publishedAt: sourceDoc.publishedAt,
      status: 'draft', // Create as draft for review
      featured: sourceDoc.featured,
      languageSettings: {
        sourceLanguage: sourceDoc.language,
        translationStatus: 'needs_review',
        autoTranslated: true,
        lastSyncedFrom: {
          _type: 'reference',
          _ref: sourceDoc._id,
        },
      },
    };

    // Create or update document
    await sanityClient.createOrReplace(newDoc);
    console.log(`✅ Created translated blog post: ${targetLang}`);
  } catch (error) {
    console.error(`❌ Error translating blog post to ${targetLang}:`, error);
  }
}

/**
 * Translate and create pricing plan in target language
 */
async function translatePricingPlan(
  sourceDoc: any,
  targetLang: string
): Promise<void> {
  const deeplLang = LANGUAGE_MAP[targetLang];
  if (!deeplLang) {
    console.warn(`No DeepL mapping for language: ${targetLang}`);
    return;
  }

  try {
    console.log(`Translating pricing plan to ${targetLang}...`);

    // Translate fields
    const translatedName = await translateText(sourceDoc.name, deeplLang);
    const translatedFeatures = await translateArray(sourceDoc.features, deeplLang);
    const translatedButtonText = sourceDoc.buttonText
      ? await translateText(sourceDoc.buttonText, deeplLang)
      : undefined;

    // Create new document
    const newDoc = {
      _type: 'pricingPlan',
      _id: `drafts.${sourceDoc.planId}-${targetLang}`,
      planId: sourceDoc.planId,
      language: targetLang,
      name: translatedName,
      prices: sourceDoc.prices, // Keep same prices
      features: translatedFeatures,
      popular: sourceDoc.popular,
      isEnterprise: sourceDoc.isEnterprise,
      buttonText: translatedButtonText,
      order: sourceDoc.order,
      stripePriceIds: sourceDoc.stripePriceIds,
      languageSettings: {
        sourceLanguage: sourceDoc.language,
        translationStatus: 'needs_review',
        autoTranslated: true,
        lastSyncedFrom: {
          _type: 'reference',
          _ref: sourceDoc._id,
        },
      },
    };

    // Create or update document
    await sanityClient.createOrReplace(newDoc);
    console.log(`✅ Created translated pricing plan: ${targetLang}`);
  } catch (error) {
    console.error(`❌ Error translating pricing plan to ${targetLang}:`, error);
  }
}

/**
 * Main webhook handler
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Verify webhook signature (optional but recommended)
  const signature = event.headers['sanity-webhook-signature'];
  if (SANITY_WEBHOOK_SECRET && signature !== SANITY_WEBHOOK_SECRET) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid webhook signature' }),
    };
  }

  // Parse payload
  let payload: WebhookPayload;
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
  });

  // Check if document is in English (source language)
  if (payload.language !== 'en') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Skipping non-English document' }),
    };
  }

  // Check if language-specific content (don't translate)
  if (payload.languageSettings?.isLanguageSpecific) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Skipping language-specific content' }),
    };
  }

  // Get target languages
  const targetLanguages = payload.languageSettings?.publishToLanguages || [
    'es', 'fr', 'pt', 'de', 'ar', 'zh'
  ];

  if (targetLanguages.length === 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'No target languages specified' }),
    };
  }

  // Generate masterBlogId if not exists (for blog posts)
  if (payload._type === 'blogPost' && !payload.masterBlogId) {
    const masterId = generateMasterId();
    await sanityClient
      .patch(payload._id)
      .set({ masterBlogId: masterId })
      .commit();
    payload.masterBlogId = masterId;
  }

  // Translate based on document type
  const translationPromises: Promise<void>[] = [];

  if (payload._type === 'blogPost') {
    for (const lang of targetLanguages) {
      translationPromises.push(translateBlogPost(payload, lang));
    }
  } else if (payload._type === 'pricingPlan') {
    for (const lang of targetLanguages) {
      translationPromises.push(translatePricingPlan(payload, lang));
    }
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Unsupported document type: ${payload._type}` }),
    };
  }

  // Wait for all translations to complete
  try {
    await Promise.all(translationPromises);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully translated to ${targetLanguages.length} languages`,
        languages: targetLanguages,
      }),
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Translation failed', details: error }),
    };
  }
};


