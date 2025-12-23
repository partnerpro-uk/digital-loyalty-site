/**
 * SEO Utility Functions
 */

import type { Locale } from './i18n';
import { locales, localizeUrl } from './i18n';

export interface HreflangLink {
  hreflang: string;
  href: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  robots?: string;
}

/**
 * Generate hreflang links for all language versions
 */
export function generateHreflangLinks(
  pathname: string,
  siteUrl: string = 'https://digitalloyalty.com'
): HreflangLink[] {
  const links: HreflangLink[] = [];
  
  // Add x-default (points to English version)
  links.push({
    hreflang: 'x-default',
    href: `${siteUrl}${pathname}`,
  });
  
  // Add all language versions
  for (const locale of locales) {
    const localizedPath = localizeUrl(pathname, locale);
    const fullUrl = `${siteUrl}${localizedPath}`;
    
    // Map locale codes to proper hreflang values
    const hreflangCode = locale === 'zh' ? 'zh-CN' : locale;
    const hreflangPtCode = locale === 'pt' ? 'pt-PT' : hreflangCode;
    
    links.push({
      hreflang: hreflangPtCode,
      href: fullUrl,
    });
  }
  
  return links;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(
  pathname: string,
  locale: Locale,
  siteUrl: string = 'https://digitalloyalty.com'
): string {
  const localizedPath = localizeUrl(pathname, locale);
  return `${siteUrl}${localizedPath}`;
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationSchema(
  siteUrl: string = 'https://digitalloyalty.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digital Loyalty',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/digitalloyalty',
      'https://www.linkedin.com/company/digitalloyalty',
      'https://www.instagram.com/digitalloyalty',
    ],
  };
}

/**
 * Generate structured data for webpage
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    inLanguage: locale,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Sanitize text for meta tags (remove HTML, limit length)
 */
export function sanitizeMetaText(text: string, maxLength: number = 160): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .slice(0, maxLength);
}

/**
 * Generate Open Graph locale codes
 */
export function getOgLocale(locale: Locale): string {
  const ogLocaleMap: Record<Locale, string> = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    pt: 'pt_PT',
    de: 'de_DE',
    ar: 'ar_AR',
    zh: 'zh_CN',
  };
  
  return ogLocaleMap[locale] || 'en_US';
}

/**
 * Generate alternate OG locales (all except current)
 */
export function getOgAlternateLocales(currentLocale: Locale): string[] {
  return locales
    .filter(l => l !== currentLocale)
    .map(l => getOgLocale(l));
}

