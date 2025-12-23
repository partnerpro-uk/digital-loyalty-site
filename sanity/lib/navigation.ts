import { client } from './client';

// Type definitions for navigation
export interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
  openInNewTab?: boolean;
  highlight?: boolean;
}

export interface CTAButton {
  text: string;
  url: string;
}

export interface Navigation {
  language: string;
  items: NavItem[];
  ctaButton?: CTAButton;
  showLanguageSwitcher?: boolean;
  showThemeToggle?: boolean;
  autoTranslated?: boolean;
}

// Type definitions for footer
export interface FooterLink {
  label: string;
  href: string;
  openInNewTab?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Footer {
  language: string;
  tagline?: string;
  columns: FooterColumn[];
  copyright?: string;
  legalLinks?: FooterLink[];
  showSocialLinks?: boolean;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  autoTranslated?: boolean;
}

// GROQ queries
const navigationQuery = `
  *[_type == "navigation" && language == $language][0]{
    language,
    items[] {
      label,
      href,
      isAnchor,
      openInNewTab,
      highlight
    },
    ctaButton {
      text,
      url
    },
    showLanguageSwitcher,
    showThemeToggle,
    autoTranslated
  }
`;

const footerQuery = `
  *[_type == "footer" && language == $language][0]{
    language,
    tagline,
    columns[] {
      title,
      links[] {
        label,
        href,
        openInNewTab
      }
    },
    copyright,
    legalLinks[] {
      label,
      href
    },
    showSocialLinks,
    showNewsletter,
    newsletterTitle,
    newsletterPlaceholder,
    newsletterButtonText,
    autoTranslated
  }
`;

/**
 * Fetch navigation for a specific language
 */
export async function getNavigation(language: string): Promise<Navigation | null> {
  return client.fetch<Navigation | null>(navigationQuery, { language });
}

/**
 * Fetch navigation with fallback to English
 */
export async function getNavigationWithFallback(language: string): Promise<Navigation | null> {
  let nav = await getNavigation(language);

  if (!nav && language !== 'en') {
    nav = await getNavigation('en');
  }

  return nav;
}

/**
 * Fetch footer for a specific language
 */
export async function getFooter(language: string): Promise<Footer | null> {
  return client.fetch<Footer | null>(footerQuery, { language });
}

/**
 * Fetch footer with fallback to English
 */
export async function getFooterWithFallback(language: string): Promise<Footer | null> {
  let footer = await getFooter(language);

  if (!footer && language !== 'en') {
    footer = await getFooter('en');
  }

  return footer;
}

/**
 * Process copyright string to replace {{year}} with current year
 */
export function processCopyright(copyright?: string): string {
  if (!copyright) {
    return `© ${new Date().getFullYear()} All rights reserved.`;
  }
  return copyright.replace('{{year}}', new Date().getFullYear().toString());
}

/**
 * Default navigation items (fallback when no Sanity content)
 */
export const defaultNavItems: NavItem[] = [
  { label: 'Features', href: '#features', isAnchor: true },
  { label: 'How it Works', href: '#how-it-works', isAnchor: true },
  { label: 'Pricing', href: '#pricing', isAnchor: true },
  { label: 'Blog', href: '/blog' }
];

/**
 * Default footer columns (fallback when no Sanity content)
 */
export const defaultFooterColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ]
  }
];
