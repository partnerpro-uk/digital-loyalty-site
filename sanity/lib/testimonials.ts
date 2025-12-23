import { client, urlFor } from './client';
import type { Image } from '@sanity/types';

// GROQ Queries
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && language == $language && translationStatus == "published"] | order(order asc) {
    _id,
    testimonialId,
    language,
    name,
    role,
    company,
    quote,
    image,
    companyLogo,
    rating,
    featured,
    order
  }
`;

export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && language == $language && translationStatus == "published" && featured == true] | order(order asc) {
    _id,
    testimonialId,
    language,
    name,
    role,
    company,
    quote,
    image,
    companyLogo,
    rating,
    featured,
    order
  }
`;

export const CLIENT_LOGOS_QUERY = `
  *[_type == "clientLogo" && active == true] | order(order asc) {
    _id,
    name,
    logo,
    url,
    order
  }
`;

// Type definitions
export interface Testimonial {
  _id: string;
  testimonialId: string;
  language: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: Image;
  companyLogo?: Image;
  rating?: number;
  featured: boolean;
  order: number;
}

export interface ClientLogo {
  _id: string;
  name: string;
  logo: Image;
  url?: string;
  order: number;
}

/**
 * Get all testimonials for a specific language
 */
export async function getTestimonials(language: string = 'en'): Promise<Testimonial[]> {
  try {
    return await client.fetch(TESTIMONIALS_QUERY, { language });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Get featured testimonials for a specific language
 */
export async function getFeaturedTestimonials(language: string = 'en'): Promise<Testimonial[]> {
  try {
    return await client.fetch(FEATURED_TESTIMONIALS_QUERY, { language });
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
}

/**
 * Get all active client logos (language-independent)
 */
export async function getClientLogos(): Promise<ClientLogo[]> {
  try {
    return await client.fetch(CLIENT_LOGOS_QUERY);
  } catch (error) {
    console.error('Error fetching client logos:', error);
    return [];
  }
}

/**
 * Get optimized image URL for a testimonial image
 */
export function getTestimonialImageUrl(image: Image, size: number = 100): string {
  return urlFor(image).width(size).height(size).auto('format').fit('crop').url();
}

/**
 * Get optimized logo URL
 */
export function getLogoUrl(logo: Image, width: number = 150): string {
  return urlFor(logo).width(width).auto('format').fit('max').url();
}

/**
 * Get all language versions of a specific testimonial
 */
export async function getTestimonialTranslations(testimonialId: string): Promise<Testimonial[]> {
  try {
    return await client.fetch<Testimonial[]>(`
      *[_type == "testimonial" && testimonialId == $testimonialId] | order(language asc)
    `, { testimonialId });
  } catch (error) {
    console.error('Error fetching testimonial translations:', error);
    return [];
  }
}

/**
 * Render star rating as string
 */
export function renderStarRating(rating?: number): string {
  if (!rating) return '';
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
