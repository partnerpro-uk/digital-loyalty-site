import { client } from './client';

// GROQ Queries
export const FAQ_ITEMS_QUERY = `
  *[_type == "faqItem" && language == $language && translationStatus == "published"] | order(order asc) {
    _id,
    faqId,
    language,
    question,
    answer,
    category,
    order
  }
`;

export const FAQ_BY_CATEGORY_QUERY = `
  *[_type == "faqItem" && language == $language && category == $category && translationStatus == "published"] | order(order asc) {
    _id,
    faqId,
    language,
    question,
    answer,
    category,
    order
  }
`;

export const FAQ_CATEGORIES_QUERY = `
  *[_type == "faqItem" && language == $language && translationStatus == "published"] {
    category
  } | unique
`;

// Type definitions
export interface FaqItem {
  _id: string;
  faqId: string;
  language: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'technical' | 'getting_started' | 'security';
  order: number;
}

export type FaqCategory = 'general' | 'pricing' | 'technical' | 'getting_started' | 'security';

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  general: 'General',
  pricing: 'Pricing & Billing',
  technical: 'Technical',
  getting_started: 'Getting Started',
  security: 'Security & Privacy'
};

/**
 * Get all FAQ items for a specific language
 */
export async function getFaqItems(language: string = 'en'): Promise<FaqItem[]> {
  try {
    return await client.fetch(FAQ_ITEMS_QUERY, { language });
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    return [];
  }
}

/**
 * Get FAQ items filtered by category
 */
export async function getFaqByCategory(language: string = 'en', category: FaqCategory): Promise<FaqItem[]> {
  try {
    return await client.fetch(FAQ_BY_CATEGORY_QUERY, { language, category });
  } catch (error) {
    console.error('Error fetching FAQ by category:', error);
    return [];
  }
}

/**
 * Get FAQ items grouped by category
 */
export async function getFaqGroupedByCategory(language: string = 'en'): Promise<Record<FaqCategory, FaqItem[]>> {
  try {
    const allItems = await getFaqItems(language);

    return allItems.reduce((acc, item) => {
      const cat = item.category || 'general';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<FaqCategory, FaqItem[]>);
  } catch (error) {
    console.error('Error grouping FAQ items:', error);
    return {
      general: [],
      pricing: [],
      technical: [],
      getting_started: [],
      security: []
    };
  }
}

/**
 * Get all language versions of a specific FAQ item
 */
export async function getFaqTranslations(faqId: string): Promise<FaqItem[]> {
  try {
    return await client.fetch<FaqItem[]>(`
      *[_type == "faqItem" && faqId == $faqId] | order(language asc)
    `, { faqId });
  } catch (error) {
    console.error('Error fetching FAQ translations:', error);
    return [];
  }
}

/**
 * Generate FAQ schema.org JSON-LD for SEO
 */
export function generateFaqSchema(items: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

/**
 * Get category label for display
 */
export function getCategoryLabel(category: FaqCategory): string {
  return FAQ_CATEGORY_LABELS[category] || category;
}
