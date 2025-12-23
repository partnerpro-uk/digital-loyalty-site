/**
 * Blog Utility Functions
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Get all blog posts for a specific language
 */
export async function getPostsByLanguage(lang: Locale): Promise<BlogPost[]> {
  const allPosts = await getCollection('blog', ({ data }) => {
    return data.lang === lang && !data.draft;
  });
  
  // Sort by publish date (newest first)
  return allPosts.sort((a, b) => 
    b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

/**
 * Get a single post by slug and language
 */
export async function getPostBySlug(slug: string, lang: Locale): Promise<BlogPost | undefined> {
  const allPosts = await getCollection('blog');
  return allPosts.find(post => post.slug === `${slug}.${lang}` && !post.data.draft);
}

/**
 * Get related translations of a blog post
 * Returns all language versions of the same post
 */
export async function getPostTranslations(translationKey: string): Promise<BlogPost[]> {
  const allPosts = await getCollection('blog', ({ data }) => {
    return data.translationKey === translationKey && !data.draft;
  });
  
  return allPosts;
}

/**
 * Get available translations for a specific post
 * Returns array of language codes that have translations
 */
export async function getAvailableTranslations(translationKey: string): Promise<Locale[]> {
  const translations = await getPostTranslations(translationKey);
  return translations.map(post => post.data.lang);
}

/**
 * Check if a post has a translation in a specific language
 */
export async function hasTranslation(translationKey: string, lang: Locale): Promise<boolean> {
  const translations = await getAvailableTranslations(translationKey);
  return translations.includes(lang);
}

/**
 * Get featured posts for a language
 */
export async function getFeaturedPosts(lang: Locale, limit?: number): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.lang === lang && data.featured && !data.draft;
  });
  
  const sorted = posts.sort((a, b) => 
    b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
  
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get posts by category for a language
 */
export async function getPostsByCategory(category: string, lang: Locale): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.lang === lang && data.category === category && !data.draft;
  });
  
  return posts.sort((a, b) => 
    b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

/**
 * Get posts by tag for a language
 */
export async function getPostsByTag(tag: string, lang: Locale): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.lang === lang && data.tags.includes(tag) && !data.draft;
  });
  
  return posts.sort((a, b) => 
    b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}

/**
 * Get all unique categories for a language
 */
export async function getCategories(lang: Locale): Promise<string[]> {
  const posts = await getPostsByLanguage(lang);
  const categories = posts
    .map(post => post.data.category)
    .filter((category): category is string => !!category);
  
  return Array.from(new Set(categories));
}

/**
 * Get all unique tags for a language
 */
export async function getTags(lang: Locale): Promise<string[]> {
  const posts = await getPostsByLanguage(lang);
  const tags = posts.flatMap(post => post.data.tags);
  
  return Array.from(new Set(tags));
}

/**
 * Get related posts (same category or tags)
 */
export async function getRelatedPosts(
  post: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getPostsByLanguage(post.data.lang);
  
  // Exclude current post
  const otherPosts = allPosts.filter(p => p.slug !== post.slug);
  
  // Score posts by relevance
  const scoredPosts = otherPosts.map(p => {
    let score = 0;
    
    // Same category = +3 points
    if (p.data.category === post.data.category) {
      score += 3;
    }
    
    // Shared tags = +1 point per tag
    const sharedTags = p.data.tags.filter(tag => post.data.tags.includes(tag));
    score += sharedTags.length;
    
    return { post: p, score };
  });
  
  // Sort by score and recency
  return scoredPosts
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (a.score === b.score) {
        return b.post.data.publishDate.getTime() - a.post.data.publishDate.getTime();
      }
      return b.score - a.score;
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    pt: 'pt-PT',
    de: 'de-DE',
    ar: 'ar-SA',
    zh: 'zh-CN',
  };
  
  return new Intl.DateTimeFormat(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Generate blog post URL
 */
export function getBlogPostUrl(slug: string, lang: Locale): string {
  // Remove language suffix from slug
  const cleanSlug = slug.replace(/\.(en|es|fr|pt|de|ar|zh)$/, '');
  
  if (lang === 'en') {
    return `/blog/${cleanSlug}/`;
  }
  
  return `/${lang}/blog/${cleanSlug}/`;
}

/**
 * Get reading time estimate (words per minute)
 */
export function getReadingTime(content: string, wpm: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

