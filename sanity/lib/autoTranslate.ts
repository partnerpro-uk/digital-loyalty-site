/**
 * Auto-translation utilities for Sanity Studio
 * Translates text fields using DeepL API directly in the UI
 */

import * as deepl from 'deepl-node';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';

const DEEPL_LANG_MAP: Record<string, deepl.TargetLanguageCode> = {
  es: 'es',
  fr: 'fr',
  pt: 'pt-PT',
  de: 'de',
  ar: 'ar',
  zh: 'zh'
};

const translator = DEEPL_API_KEY ? new deepl.Translator(DEEPL_API_KEY) : null;

/**
 * Auto-translate a single field to all languages
 */
export async function autoTranslateField(
  englishText: string,
  targetLanguages: string[] = ['es', 'fr', 'pt', 'de', 'ar', 'zh']
): Promise<Record<string, string>> {
  if (!translator) {
    console.error('DeepL API key not configured');
    return {};
  }

  const translations: Record<string, string> = {
    en: englishText
  };

  for (const lang of targetLanguages) {
    try {
      const result = await translator.translateText(
        englishText,
        'en',
        DEEPL_LANG_MAP[lang]
      );
      translations[lang] = result.text;
    } catch (error) {
      console.error(`Failed to translate to ${lang}:`, error);
      translations[lang] = englishText; // Fallback to English
    }
  }

  return translations;
}

/**
 * Generate SEO title from blog post title
 */
export function generateSEOTitle(title: string, maxLength: number = 60): string {
  // Add year and make it compelling
  const year = new Date().getFullYear();
  let seoTitle = `${title} (${year})`;
  
  if (seoTitle.length > maxLength) {
    seoTitle = title;
  }
  
  return seoTitle.slice(0, maxLength);
}

/**
 * Generate SEO description from excerpt or title
 */
export function generateSEODescription(
  title: string,
  excerpt?: string,
  maxLength: number = 160
): string {
  if (excerpt && excerpt.length <= maxLength) {
    return excerpt;
  }
  
  // Generate from title
  const templates = [
    `Learn everything about ${title.toLowerCase()}. Expert tips, strategies, and best practices.`,
    `Discover ${title.toLowerCase()}. Complete guide with actionable insights and examples.`,
    `Master ${title.toLowerCase()}. Proven strategies to boost your results.`
  ];
  
  const description = templates[Math.floor(Math.random() * templates.length)];
  return description.slice(0, maxLength);
}

/**
 * Extract keywords from title
 */
export function generateKeywords(title: string, maxKeywords: number = 5): string[] {
  // Remove common words
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as'];
  
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3 && !commonWords.includes(word));
  
  // Add common loyalty-related keywords
  const industryKeywords = ['loyalty', 'customer retention', 'engagement'];
  
  return [...new Set([...words, ...industryKeywords])].slice(0, maxKeywords);
}

/**
 * Generate slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

