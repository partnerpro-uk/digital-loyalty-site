/**
 * i18n Utility Functions
 */

export const locales = ['en', 'es', 'fr', 'pt', 'de', 'ar', 'zh'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

// Language names for UI
export const languageNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  de: 'Deutsch',
  ar: 'العربية',
  zh: '中文',
};

/**
 * Check if a language uses RTL
 */
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

/**
 * Get text direction for a locale
 */
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

/**
 * Get language name
 */
export function getLanguageName(locale: Locale): string {
  return languageNames[locale] || locale;
}

/**
 * Validate if string is a valid locale
 */
export function isValidLocale(str: string): str is Locale {
  return locales.includes(str as Locale);
}

/**
 * Get locale from URL pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return defaultLocale;
}

/**
 * Get pathname without locale prefix
 */
export function getPathnameWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  
  if (locale === defaultLocale) {
    return pathname;
  }
  
  return pathname.replace(`/${locale}`, '') || '/';
}

/**
 * Build localized URL
 */
export function localizeUrl(pathname: string, locale: Locale): string {
  // Remove existing locale if present
  const cleanPath = getPathnameWithoutLocale(pathname);
  
  // Don't add locale prefix for default locale
  if (locale === defaultLocale) {
    return cleanPath;
  }
  
  // Add locale prefix
  return `/${locale}${cleanPath}`;
}

