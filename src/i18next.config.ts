import i18next from 'i18next';

// Import all translation files
import commonEn from './locales/en/common.json';
import navigationEn from './locales/en/navigation.json';
import pagesEn from './locales/en/pages.json';
import seoEn from './locales/en/seo.json';

import commonEs from './locales/es/common.json';
import navigationEs from './locales/es/navigation.json';
import pagesEs from './locales/es/pages.json';
import seoEs from './locales/es/seo.json';

import commonFr from './locales/fr/common.json';
import navigationFr from './locales/fr/navigation.json';
import pagesFr from './locales/fr/pages.json';
import seoFr from './locales/fr/seo.json';

import commonPt from './locales/pt/common.json';
import navigationPt from './locales/pt/navigation.json';
import pagesPt from './locales/pt/pages.json';
import seoPt from './locales/pt/seo.json';

import commonDe from './locales/de/common.json';
import navigationDe from './locales/de/navigation.json';
import pagesDe from './locales/de/pages.json';
import seoDe from './locales/de/seo.json';

import commonAr from './locales/ar/common.json';
import navigationAr from './locales/ar/navigation.json';
import pagesAr from './locales/ar/pages.json';
import seoAr from './locales/ar/seo.json';

import commonZh from './locales/zh/common.json';
import navigationZh from './locales/zh/navigation.json';
import pagesZh from './locales/zh/pages.json';
import seoZh from './locales/zh/seo.json';

// Initialize i18next with all translations
await i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'navigation', 'pages', 'seo'],
  defaultNS: 'common',
  resources: {
    en: {
      common: commonEn,
      navigation: navigationEn,
      pages: pagesEn,
      seo: seoEn,
    },
    es: {
      common: commonEs,
      navigation: navigationEs,
      pages: pagesEs,
      seo: seoEs,
    },
    fr: {
      common: commonFr,
      navigation: navigationFr,
      pages: pagesFr,
      seo: seoFr,
    },
    pt: {
      common: commonPt,
      navigation: navigationPt,
      pages: pagesPt,
      seo: seoPt,
    },
    de: {
      common: commonDe,
      navigation: navigationDe,
      pages: pagesDe,
      seo: seoDe,
    },
    ar: {
      common: commonAr,
      navigation: navigationAr,
      pages: pagesAr,
      seo: seoAr,
    },
    zh: {
      common: commonZh,
      navigation: navigationZh,
      pages: pagesZh,
      seo: seoZh,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

