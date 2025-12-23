/**
 * Country Configuration
 * Maps countries to their language and currency settings
 */

export interface Country {
  code: string;              // ISO country code
  name: string;              // Display name
  nativeName: string;        // Native language name
  language: string;          // Primary language code
  languageRegion: string;    // Language-region code (for hreflang)
  currency: string;          // Currency code (ISO 4217)
  currencySymbol: string;    // Display symbol
  currencyPosition: 'before' | 'after'; // Symbol position
  domain?: string;           // Optional: custom domain
  flag: string;              // Flag emoji
}

export const countries: Country[] = [
  // English-speaking countries
  { 
    code: 'US', 
    name: 'United States', 
    nativeName: 'United States', 
    language: 'en', 
    languageRegion: 'en-US', 
    currency: 'USD', 
    currencySymbol: '$', 
    currencyPosition: 'before',
    flag: '🇺🇸' 
  },
  { 
    code: 'GB', 
    name: 'United Kingdom', 
    nativeName: 'United Kingdom',
    language: 'en', 
    languageRegion: 'en-GB',
    currency: 'GBP', 
    currencySymbol: '£', 
    currencyPosition: 'before',
    domain: 'digitalloyalty.co.uk',
    flag: '🇬🇧' 
  },
  { 
    code: 'CA', 
    name: 'Canada (English)', 
    nativeName: 'Canada',
    language: 'en', 
    languageRegion: 'en-CA',
    currency: 'CAD', 
    currencySymbol: '$', 
    currencyPosition: 'before',
    flag: '🇨🇦' 
  },
  { 
    code: 'AU', 
    name: 'Australia', 
    nativeName: 'Australia',
    language: 'en', 
    languageRegion: 'en-AU',
    currency: 'AUD', 
    currencySymbol: '$', 
    currencyPosition: 'before',
    flag: '🇦🇺' 
  },
  { 
    code: 'AE', 
    name: 'United Arab Emirates (English)', 
    nativeName: 'UAE',
    language: 'en', 
    languageRegion: 'en-AE',
    currency: 'AED', 
    currencySymbol: 'د.إ', 
    currencyPosition: 'after',
    flag: '🇦🇪' 
  },
  
  // Spanish-speaking countries
  { 
    code: 'ES', 
    name: 'Spain', 
    nativeName: 'España',
    language: 'es', 
    languageRegion: 'es-ES',
    currency: 'EUR', 
    currencySymbol: '€', 
    currencyPosition: 'after',
    domain: 'fidelizaciondigital.es',
    flag: '🇪🇸' 
  },
  { 
    code: 'MX', 
    name: 'Mexico', 
    nativeName: 'México',
    language: 'es', 
    languageRegion: 'es-MX',
    currency: 'MXN', 
    currencySymbol: '$', 
    currencyPosition: 'before',
    flag: '🇲🇽' 
  },
  { 
    code: 'AR', 
    name: 'Argentina', 
    nativeName: 'Argentina',
    language: 'es', 
    languageRegion: 'es-AR',
    currency: 'ARS', 
    currencySymbol: '$', 
    currencyPosition: 'before',
    flag: '🇦🇷' 
  },
  
  // French-speaking countries
  { 
    code: 'FR', 
    name: 'France', 
    nativeName: 'France',
    language: 'fr', 
    languageRegion: 'fr-FR',
    currency: 'EUR', 
    currencySymbol: '€', 
    currencyPosition: 'after',
    domain: 'fidelisationnumerique.fr',
    flag: '🇫🇷' 
  },
  { 
    code: 'BE', 
    name: 'Belgium (French)', 
    nativeName: 'Belgique',
    language: 'fr', 
    languageRegion: 'fr-BE',
    currency: 'EUR', 
    currencySymbol: '€', 
    currencyPosition: 'after',
    flag: '🇧🇪' 
  },
  { 
    code: 'CH', 
    name: 'Switzerland (French)', 
    nativeName: 'Suisse',
    language: 'fr', 
    languageRegion: 'fr-CH',
    currency: 'CHF', 
    currencySymbol: 'CHF', 
    currencyPosition: 'after',
    flag: '🇨🇭' 
  },
  
  // Portuguese-speaking countries
  { 
    code: 'PT', 
    name: 'Portugal', 
    nativeName: 'Portugal',
    language: 'pt', 
    languageRegion: 'pt-PT',
    currency: 'EUR', 
    currencySymbol: '€', 
    currencyPosition: 'after',
    flag: '🇵🇹' 
  },
  { 
    code: 'BR', 
    name: 'Brazil', 
    nativeName: 'Brasil',
    language: 'pt', 
    languageRegion: 'pt-BR',
    currency: 'BRL', 
    currencySymbol: 'R$', 
    currencyPosition: 'before',
    flag: '🇧🇷' 
  },
  
  // German-speaking countries
  { 
    code: 'DE', 
    name: 'Germany', 
    nativeName: 'Deutschland',
    language: 'de', 
    languageRegion: 'de-DE',
    currency: 'EUR', 
    currencySymbol: '€', 
    currencyPosition: 'after',
    flag: '🇩🇪' 
  },
  { 
    code: 'AT', 
    name: 'Austria', 
    nativeName: 'Österreich',
    language: 'de', 
    languageRegion: 'de-AT',
    currency: 'EUR', 
    currencySymbol: '€', 
    currencyPosition: 'after',
    flag: '🇦🇹' 
  },
  
  // Arabic-speaking countries
  { 
    code: 'SA', 
    name: 'Saudi Arabia', 
    nativeName: 'السعودية',
    language: 'ar', 
    languageRegion: 'ar-SA',
    currency: 'SAR', 
    currencySymbol: 'ر.س', 
    currencyPosition: 'after',
    flag: '🇸🇦' 
  },
  { 
    code: 'EG', 
    name: 'Egypt', 
    nativeName: 'مصر',
    language: 'ar', 
    languageRegion: 'ar-EG',
    currency: 'EGP', 
    currencySymbol: 'ج.م', 
    currencyPosition: 'after',
    flag: '🇪🇬' 
  },
  
  // Chinese-speaking countries
  { 
    code: 'CN', 
    name: 'China', 
    nativeName: '中国',
    language: 'zh', 
    languageRegion: 'zh-CN',
    currency: 'CNY', 
    currencySymbol: '¥', 
    currencyPosition: 'before',
    flag: '🇨🇳' 
  },
  { 
    code: 'TW', 
    name: 'Taiwan', 
    nativeName: '台灣',
    language: 'zh', 
    languageRegion: 'zh-TW',
    currency: 'TWD', 
    currencySymbol: 'NT$', 
    currencyPosition: 'before',
    flag: '🇹🇼' 
  },
];

// Group countries by region for UI display
export const countryRegions = {
  'Americas': countries.filter(c => ['US', 'CA', 'MX', 'BR', 'AR'].includes(c.code)),
  'Europe': countries.filter(c => ['GB', 'ES', 'FR', 'PT', 'DE', 'AT', 'BE', 'CH'].includes(c.code)),
  'Middle East & Africa': countries.filter(c => ['AE', 'SA', 'EG'].includes(c.code)),
  'Asia Pacific': countries.filter(c => ['CN', 'TW', 'AU'].includes(c.code))
};

// Helper functions
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

export function getCountriesByLanguage(lang: string): Country[] {
  return countries.filter(c => c.language === lang);
}

export function getDefaultCountryForLanguage(lang: string): Country {
  const languageDefaults: Record<string, string> = {
    'en': 'US', 
    'es': 'ES', 
    'fr': 'FR', 
    'pt': 'PT', 
    'de': 'DE', 
    'ar': 'AE', 
    'zh': 'CN'
  };
  return getCountryByCode(languageDefaults[lang]) || countries[0];
}

export function getCountryByCurrency(currency: string): Country | undefined {
  return countries.find(c => c.currency === currency);
}

