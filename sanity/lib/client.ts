import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from '@sanity/types';

// Create Sanity client
export const client: SanityClient = createClient({
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'zutnuftx',
  dataset: import.meta.env.SANITY_STUDIO_DATASET || import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-16',
  useCdn: import.meta.env.PROD, // Use CDN in production, fresh data in development
  perspective: 'published', // Only fetch published documents
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}

// Helper to get optimized image URL
export function getImageUrl(source: Image, width?: number, height?: number): string {
  let imageUrl = urlFor(source);
  
  if (width) {
    imageUrl = imageUrl.width(width);
  }
  
  if (height) {
    imageUrl = imageUrl.height(height);
  }
  
  return imageUrl.auto('format').fit('max').url();
}

// Type definitions for blog queries
export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  masterBlogId?: string;
  language: 'en' | 'es' | 'fr' | 'pt' | 'de' | 'ar' | 'zh';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content: any[]; // PortableText blocks
  thumbnailImage: {
    asset: Image;
    alt: string;
  };
  languageSettings?: {
    isLanguageSpecific?: boolean;
    publishToLanguages?: string[];
    sourceLanguage?: string;
    translationStatus?: 'published' | 'draft' | 'needs_review';
    autoTranslated?: boolean;
    lastSyncedFrom?: {
      _ref: string;
    };
  };
  category: {
    _id: string;
    name: {
      [key: string]: string;
    };
    slug: {
      current: string;
    };
    color?: string;
  };
  tags?: Array<{
    _id: string;
    name: {
      [key: string]: string;
    };
    slug: {
      current: string;
    };
  }>;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  socialShareImage?: {
    asset: Image;
    alt?: string;
  };
  author: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    image?: Image;
    bio?: {
      [key: string]: string;
    };
    social?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  publishedAt: string;
  updatedAt?: string;
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  translations?: Array<{
    language: string;
    slug: {
      current: string;
    };
    title: string;
    translationStatus?: string;
  }>;
}

// GROQ Queries

export const BLOG_POST_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && language == $lang && status == "published"][0] {
    _id,
    masterBlogId,
    language,
    title,
    slug,
    excerpt,
    content,
    thumbnailImage {
      asset->,
      alt
    },
    languageSettings,
    category->{
      _id,
      name,
      slug,
      color
    },
    tags[]->{
      _id,
      name,
      slug
    },
    seoTitle,
    seoDescription,
    seoKeywords,
    socialShareImage {
      asset->,
      alt
    },
    author->{
      _id,
      name,
      slug,
      image,
      bio,
      social
    },
    publishedAt,
    updatedAt,
    status,
    featured,
    
    "translations": *[_type == "blogPost" && masterBlogId == ^.masterBlogId && language != ^.language && status == "published"] {
      language,
      slug,
      title,
      "translationStatus": languageSettings.translationStatus
    }
  }
`;

export const BLOG_POSTS_LIST_QUERY = `
  *[_type == "blogPost" && language == $lang && status == "published"] | order(publishedAt desc) [$start...$end] {
    _id,
    masterBlogId,
    language,
    title,
    slug,
    excerpt,
    thumbnailImage {
      asset->,
      alt
    },
    category->{
      _id,
      name,
      slug,
      color
    },
    tags[]->{
      _id,
      name,
      slug
    },
    author->{
      _id,
      name,
      slug,
      image
    },
    publishedAt,
    featured,
    "translationStatus": languageSettings.translationStatus
  }
`;

export const BLOG_POSTS_BY_CATEGORY_QUERY = `
  *[_type == "blogPost" && category->slug.current == $categorySlug && language == $lang && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnailImage,
    language,
    category->{
      _id,
      name,
      slug,
      color
    },
    author->{
      _id,
      name,
      slug
    },
    publishedAt
  }
`;

export const BLOG_POSTS_BY_TAG_QUERY = `
  *[_type == "blogPost" && $tagSlug in tags[]->slug.current && language == $lang && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnailImage,
    language,
    category->{
      _id,
      name,
      slug
    },
    tags[]->{
      _id,
      name,
      slug
    },
    author->{
      _id,
      name,
      slug
    },
    publishedAt
  }
`;

export const FEATURED_POSTS_QUERY = `
  *[_type == "blogPost" && language == $lang && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      _id,
      name,
      slug,
      color
    },
    author->{
      _id,
      name,
      slug
    },
    publishedAt
  }
`;

export const TRANSLATIONS_QUERY = `
  *[_type == "blogPost" && masterBlogId == $masterBlogId && status == "published"] {
    _id,
    language,
    slug,
    title,
    "translationStatus": languageSettings.translationStatus
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(name.en asc) {
    _id,
    name,
    slug,
    description,
    color
  }
`;

export const TAGS_QUERY = `
  *[_type == "tag"] | order(name.en asc) {
    _id,
    name,
    slug,
    description
  }
`;

