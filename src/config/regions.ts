/**
 * Region Configuration
 * Unified regions = Country + Language + Currency
 * Each region is a unique combination for the user to select
 */

export interface Region {
  id: string;                    // Unique ID (e.g., "us-en", "ca-fr")
  countryCode: string;           // ISO country code
  countryName: string;           // Display name
  nativeCountryName: string;     // Native name
  language: string;              // Language code (ISO 639-1)
  languageName: string;          // Language display name
  nativeLanguageName: string;    // Native language name
  languageRegion: string;        // Language-region code (for hreflang)
  currency: string;              // Currency code (ISO 4217)
  currencySymbol: string;        // Display symbol
  currencyPosition: 'before' | 'after'; // Symbol position
  flag: string;                  // Flag emoji
  domain?: string;               // Optional: custom domain
  isDefault?: boolean;           // Default for this country
}

export const regions: Region[] = [
  // ===== AMERICAS =====
  
  // United States
  {
    id: 'us-en',
    countryCode: 'US',
    countryName: 'United States',
    nativeCountryName: 'United States',
    language: 'en',
    languageName: 'English',
    nativeLanguageName: 'English',
    languageRegion: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    currencyPosition: 'before',
    flag: '🇺🇸',
    isDefault: true
  },
  
  // Canada (English)
  {
    id: 'ca-en',
    countryCode: 'CA',
    countryName: 'Canada',
    nativeCountryName: 'Canada',
    language: 'en',
    languageName: 'English',
    nativeLanguageName: 'English',
    languageRegion: 'en-CA',
    currency: 'CAD',
    currencySymbol: '$',
    currencyPosition: 'before',
    flag: '🇨🇦',
    isDefault: true
  },
  
  // Canada (French)
  {
    id: 'ca-fr',
    countryCode: 'CA',
    countryName: 'Canada',
    nativeCountryName: 'Canada',
    language: 'fr',
    languageName: 'French',
    nativeLanguageName: 'Français',
    languageRegion: 'fr-CA',
    currency: 'CAD',
    currencySymbol: '$',
    currencyPosition: 'before',
    flag: '🇨🇦'
  },
  
  // Mexico
  {
    id: 'mx-es',
    countryCode: 'MX',
    countryName: 'Mexico',
    nativeCountryName: 'México',
    language: 'es',
    languageName: 'Spanish',
    nativeLanguageName: 'Español',
    languageRegion: 'es-MX',
    currency: 'MXN',
    currencySymbol: '$',
    currencyPosition: 'before',
    flag: '🇲🇽',
    isDefault: true
  },
  
  // Brazil
  {
    id: 'br-pt',
    countryCode: 'BR',
    countryName: 'Brazil',
    nativeCountryName: 'Brasil',
    language: 'pt',
    languageName: 'Portuguese',
    nativeLanguageName: 'Português',
    languageRegion: 'pt-BR',
    currency: 'BRL',
    currencySymbol: 'R$',
    currencyPosition: 'before',
    flag: '🇧🇷',
    isDefault: true
  },
  
  // Argentina
  {
    id: 'ar-es',
    countryCode: 'AR',
    countryName: 'Argentina',
    nativeCountryName: 'Argentina',
    language: 'es',
    languageName: 'Spanish',
    nativeLanguageName: 'Español',
    languageRegion: 'es-AR',
    currency: 'ARS',
    currencySymbol: '$',
    currencyPosition: 'before',
    flag: '🇦🇷',
    isDefault: true
  },
  
  // ===== EUROPE =====
  
  // United Kingdom
  {
    id: 'gb-en',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    nativeCountryName: 'United Kingdom',
    language: 'en',
    languageName: 'English',
    nativeLanguageName: 'English',
    languageRegion: 'en-GB',
    currency: 'GBP',
    currencySymbol: '£',
    currencyPosition: 'before',
    flag: '🇬🇧',
    domain: 'digitalloyalty.co.uk',
    isDefault: true
  },
  
  // Spain
  {
    id: 'es-es',
    countryCode: 'ES',
    countryName: 'Spain',
    nativeCountryName: 'España',
    language: 'es',
    languageName: 'Spanish',
    nativeLanguageName: 'Español',
    languageRegion: 'es-ES',
    currency: 'EUR',
    currencySymbol: '€',
    currencyPosition: 'after',
    flag: '🇪🇸',
    domain: 'fidelizaciondigital.es',
    isDefault: true
  },
  
  // France
  {
    id: 'fr-fr',
    countryCode: 'FR',
    countryName: 'France',
    nativeCountryName: 'France',
    language: 'fr',
    languageName: 'French',
    nativeLanguageName: 'Français',
    languageRegion: 'fr-FR',
    currency: 'EUR',
    currencySymbol: '€',
    currencyPosition: 'after',
    flag: '🇫🇷',
    domain: 'fidelisationnumerique.fr',
    isDefault: true
  },
  
  // Belgium (French)
  {
    id: 'be-fr',
    countryCode: 'BE',
    countryName: 'Belgium',
    nativeCountryName: 'Belgique',
    language: 'fr',
    languageName: 'French',
    nativeLanguageName: 'Français',
    languageRegion: 'fr-BE',
    currency: 'EUR',
    currencySymbol: '€',
    currencyPosition: 'after',
    flag: '🇧🇪',
    isDefault: true
  },
  
  // Switzerland (French)
  {
    id: 'ch-fr',
    countryCode: 'CH',
    countryName: 'Switzerland',
    nativeCountryName: 'Suisse',
    language: 'fr',
    languageName: 'French',
    nativeLanguageName: 'Français',
    languageRegion: 'fr-CH',
    currency: 'CHF',
    currencySymbol: 'Fr.',
    currencyPosition: 'before',
    flag: '🇨🇭',
    isDefault: true
  },
  
  // Switzerland (German)
  {
    id: 'ch-de',
    countryCode: 'CH',
    countryName: 'Switzerland',
    nativeCountryName: 'Schweiz',
    language: 'de',
    languageName: 'German',
    nativeLanguageName: 'Deutsch',
    languageRegion: 'de-CH',
    currency: 'CHF',
    currencySymbol: 'Fr.',
    currencyPosition: 'before',
    flag: '🇨🇭'
  },
  
  // Portugal
  {
    id: 'pt-pt',
    countryCode: 'PT',
    countryName: 'Portugal',
    nativeCountryName: 'Portugal',
    language: 'pt',
    languageName: 'Portuguese',
    nativeLanguageName: 'Português',
    languageRegion: 'pt-PT',
    currency: 'EUR',
    currencySymbol: '€',
    currencyPosition: 'after',
    flag: '🇵🇹',
    isDefault: true
  },
  
  // Germany
  {
    id: 'de-de',
    countryCode: 'DE',
    countryName: 'Germany',
    nativeCountryName: 'Deutschland',
    language: 'de',
    languageName: 'German',
    nativeLanguageName: 'Deutsch',
    languageRegion: 'de-DE',
    currency: 'EUR',
    currencySymbol: '€',
    currencyPosition: 'after',
    flag: '🇩🇪',
    isDefault: true
  },
  
  // Austria
  {
    id: 'at-de',
    countryCode: 'AT',
    countryName: 'Austria',
    nativeCountryName: 'Österreich',
    language: 'de',
    languageName: 'German',
    nativeLanguageName: 'Deutsch',
    languageRegion: 'de-AT',
    currency: 'EUR',
    currencySymbol: '€',
    currencyPosition: 'after',
    flag: '🇦🇹',
    isDefault: true
  },
  
  // ===== MIDDLE EAST & AFRICA =====
  
  // United Arab Emirates (English)
  {
    id: 'ae-en',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    nativeCountryName: 'UAE',
    language: 'en',
    languageName: 'English',
    nativeLanguageName: 'English',
    languageRegion: 'en-AE',
    currency: 'AED',
    currencySymbol: 'د.إ',
    currencyPosition: 'after',
    flag: '🇦🇪',
    isDefault: true
  },
  
  // United Arab Emirates (Arabic)
  {
    id: 'ae-ar',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    nativeCountryName: 'الإمارات',
    language: 'ar',
    languageName: 'Arabic',
    nativeLanguageName: 'العربية',
    languageRegion: 'ar-AE',
    currency: 'AED',
    currencySymbol: 'د.إ',
    currencyPosition: 'after',
    flag: '🇦🇪'
  },
  
  // Saudi Arabia
  {
    id: 'sa-ar',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    nativeCountryName: 'السعودية',
    language: 'ar',
    languageName: 'Arabic',
    nativeLanguageName: 'العربية',
    languageRegion: 'ar-SA',
    currency: 'SAR',
    currencySymbol: 'ر.س',
    currencyPosition: 'after',
    flag: '🇸🇦',
    isDefault: true
  },
  
  // Egypt
  {
    id: 'eg-ar',
    countryCode: 'EG',
    countryName: 'Egypt',
    nativeCountryName: 'مصر',
    language: 'ar',
    languageName: 'Arabic',
    nativeLanguageName: 'العربية',
    languageRegion: 'ar-EG',
    currency: 'EGP',
    currencySymbol: 'ج.م',
    currencyPosition: 'after',
    flag: '🇪🇬',
    isDefault: true
  },
  
  // ===== ASIA PACIFIC =====
  
  // Australia
  {
    id: 'au-en',
    countryCode: 'AU',
    countryName: 'Australia',
    nativeCountryName: 'Australia',
    language: 'en',
    languageName: 'English',
    nativeLanguageName: 'English',
    languageRegion: 'en-AU',
    currency: 'AUD',
    currencySymbol: '$',
    currencyPosition: 'before',
    flag: '🇦🇺',
    isDefault: true
  },
  
  // China
  {
    id: 'cn-zh',
    countryCode: 'CN',
    countryName: 'China',
    nativeCountryName: '中国',
    language: 'zh',
    languageName: 'Chinese',
    nativeLanguageName: '简体中文',
    languageRegion: 'zh-CN',
    currency: 'CNY',
    currencySymbol: '¥',
    currencyPosition: 'before',
    flag: '🇨🇳',
    isDefault: true
  },
  
  // Taiwan
  {
    id: 'tw-zh',
    countryCode: 'TW',
    countryName: 'Taiwan',
    nativeCountryName: '台灣',
    language: 'zh',
    languageName: 'Chinese',
    nativeLanguageName: '繁體中文',
    languageRegion: 'zh-TW',
    currency: 'TWD',
    currencySymbol: 'NT$',
    currencyPosition: 'before',
    flag: '🇹🇼',
    isDefault: true
  }
];

// Group regions by geographic area
export const regionGroups = {
  'Americas': regions.filter(r => ['US', 'CA', 'MX', 'BR', 'AR'].includes(r.countryCode)),
  'Europe': regions.filter(r => ['GB', 'ES', 'FR', 'BE', 'CH', 'PT', 'DE', 'AT'].includes(r.countryCode)),
  'Middle East & Africa': regions.filter(r => ['AE', 'SA', 'EG'].includes(r.countryCode)),
  'Asia Pacific': regions.filter(r => ['AU', 'CN', 'TW'].includes(r.countryCode))
};

// Helper functions
export function getRegionById(id: string): Region | undefined {
  return regions.find(r => r.id === id);
}

export function getRegionsByCountry(countryCode: string): Region[] {
  return regions.filter(r => r.countryCode === countryCode);
}

export function getDefaultRegionForCountry(countryCode: string): Region | undefined {
  return regions.find(r => r.countryCode === countryCode && r.isDefault);
}

export function getRegionByLanguage(language: string): Region | undefined {
  return regions.find(r => r.language === language && r.isDefault);
}

export function getRegionByCountryAndLanguage(countryCode: string, language: string): Region | undefined {
  return regions.find(r => r.countryCode === countryCode && r.language === language);
}

// Detect region from country code (with fallback to default)
export function detectRegionFromCountry(countryCode: string): Region {
  const defaultRegion = getDefaultRegionForCountry(countryCode);
  if (defaultRegion) return defaultRegion;
  
  // Fallback to US English
  return regions[0];
}

