import { client } from './client';

// Type definitions
export interface CTAButton {
  text: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface HeroFloatingCard {
  title: string;
  subtitle: string;
  iconColor: 'green' | 'purple' | 'amber' | 'blue' | 'pink';
  icon: 'check' | 'currency' | 'star' | 'trophy' | 'heart' | 'lightning';
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroSection {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  primaryCta?: CTAButton;
  secondaryCta?: CTAButton;
  heroImage?: string;
  imageDisplayType?: 'phone' | 'image' | 'none';
  trustIndicators?: string[];
  stats?: HeroStat[];
  floatingCards?: HeroFloatingCard[];
}

export interface SocialProofSection {
  trustStatement?: string;
  stats?: Array<{ value: string; label: string }>;
}

export interface Problem {
  icon?: string;
  title?: string;
  description?: string;
}

export interface ProblemSolutionSection {
  sectionBadge?: string;
  title?: string;
  problems?: Problem[];
  solutionTitle?: string;
  solutionDescription?: string;
  solutionHighlights?: string[];
}

export interface FeatureItem {
  icon?: string;
  title?: string;
  description?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface FeaturesSection {
  sectionBadge?: string;
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
}

export interface VideoSection {
  sectionBadge?: string;
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnailImage?: string;
  ctaText?: string;
}

export interface SectionHeader {
  sectionBadge?: string;
  title?: string;
  subtitle?: string;
}

export interface FinalCTASection {
  title?: string;
  subtitle?: string;
  primaryCta?: CTAButton;
  secondaryCta?: CTAButton;
  trustIndicators?: string[];
}

export interface HowItWorksStep {
  title: string;
  description: string;
  visualType: 'qr' | 'wallet' | 'stamps';
  cardTitle?: string;
  cardSubtitle?: string;
  stampsCollected?: number;
  stampsTotal?: number;
  stampsLabel?: string;
}

export interface HowItWorksSection {
  sectionBadge?: string;
  title?: string;
  subtitle?: string;
  steps?: HowItWorksStep[];
}

export interface GalleryItem {
  title: string;
  image?: string;
  displayType: 'phone' | 'card' | 'image';
  gradientFrom?: string;
  gradientTo?: string;
}

export interface GallerySection {
  sectionBadge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  items?: GalleryItem[];
}

export interface PageContent {
  pageId: string;
  language: string;
  seo?: SEOData;
  hero?: HeroSection;
  socialProof?: SocialProofSection;
  problemSolution?: ProblemSolutionSection;
  features?: FeaturesSection;
  video?: VideoSection;
  testimonials?: SectionHeader;
  faq?: SectionHeader;
  howItWorks?: HowItWorksSection;
  gallery?: GallerySection;
  finalCta?: FinalCTASection;
  translationStatus?: 'draft' | 'needs_review' | 'published';
  autoTranslated?: boolean;
  lastTranslated?: string;
}

// GROQ query for page content
const pageContentQuery = `
  *[_type == "pageContent" && pageId == $pageId && language == $language][0]{
    pageId,
    language,
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url,
      noIndex
    },
    hero {
      badge,
      title,
      titleHighlight,
      subtitle,
      primaryCta {
        text,
        url,
        variant
      },
      secondaryCta {
        text,
        url,
        variant
      },
      "heroImage": heroImage.asset->url,
      imageDisplayType,
      trustIndicators,
      stats[] {
        value,
        label
      },
      floatingCards[] {
        title,
        subtitle,
        iconColor,
        icon
      }
    },
    socialProof {
      trustStatement,
      stats[] {
        value,
        label
      }
    },
    problemSolution {
      sectionBadge,
      title,
      problems[] {
        icon,
        title,
        description
      },
      solutionTitle,
      solutionDescription,
      solutionHighlights
    },
    features {
      sectionBadge,
      title,
      subtitle,
      items[] {
        icon,
        title,
        description,
        size
      }
    },
    video {
      sectionBadge,
      title,
      subtitle,
      videoUrl,
      "thumbnailImage": thumbnailImage.asset->url,
      ctaText
    },
    testimonials {
      sectionBadge,
      title,
      subtitle
    },
    faq {
      sectionBadge,
      title,
      subtitle
    },
    howItWorks {
      sectionBadge,
      title,
      subtitle,
      steps[] {
        title,
        description,
        visualType,
        cardTitle,
        cardSubtitle,
        stampsCollected,
        stampsTotal,
        stampsLabel
      }
    },
    gallery {
      sectionBadge,
      title,
      subtitle,
      ctaText,
      ctaUrl,
      items[] {
        title,
        "image": image.asset->url,
        displayType,
        gradientFrom,
        gradientTo
      }
    },
    finalCta {
      title,
      subtitle,
      primaryCta {
        text,
        url,
        variant
      },
      secondaryCta {
        text,
        url,
        variant
      },
      trustIndicators
    },
    translationStatus,
    autoTranslated,
    lastTranslated
  }
`;

/**
 * Fetch page content for a specific page and language
 */
export async function getPageContent(pageId: string, language: string): Promise<PageContent | null> {
  return client.fetch<PageContent | null>(pageContentQuery, { pageId, language });
}

/**
 * Fetch page content with fallback to English if translation not found
 */
export async function getPageContentWithFallback(pageId: string, language: string): Promise<PageContent | null> {
  // Try requested language first
  let content = await getPageContent(pageId, language);

  // Fall back to English if not found and not already English
  if (!content && language !== 'en') {
    content = await getPageContent(pageId, 'en');
  }

  return content;
}

/**
 * Fetch all page content documents (for static generation)
 */
export async function getAllPageContent(): Promise<Array<{ pageId: string; language: string }>> {
  return client.fetch<Array<{ pageId: string; language: string }>>(
    `*[_type == "pageContent"]{ pageId, language }`
  );
}

/**
 * Check if page content exists for a specific page/language combo
 */
export async function pageContentExists(pageId: string, language: string): Promise<boolean> {
  const count = await client.fetch<number>(
    `count(*[_type == "pageContent" && pageId == $pageId && language == $language])`,
    { pageId, language }
  );
  return count > 0;
}

/**
 * Helper to get section content with i18n fallback
 * Use this pattern in components:
 *
 * const heroTitle = pageContent?.hero?.title || t('pages:hero.title');
 */
export function getSectionWithFallback<T>(
  section: T | undefined,
  fallbackFn: () => T
): T {
  return section ?? fallbackFn();
}
