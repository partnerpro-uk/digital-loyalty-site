/**
 * Content Collections Configuration
 * Defines schemas for blog posts and other content types
 */

import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string().max(160, 'Description should be 160 characters or less for SEO'),
    lang: z.enum(['en', 'es', 'fr', 'pt', 'de', 'ar', 'zh']),
    translationKey: z.string(), // Links related translations
    publishDate: z.date(),
    
    // Optional fields
    keywords: z.string().optional(),
    author: z.string().default('Digital Loyalty Team'),
    ogImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
    
    // SEO
    robots: z.string().default('index, follow'),
  }),
});

export const collections = {
  'blog': blogCollection,
};

