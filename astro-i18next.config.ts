import type { AstroI18nextConfig } from "astro-i18next";

export const locales = ["en", "es", "fr", "pt", "de", "ar", "zh"];
export const defaultLocale = "en";

const config: AstroI18nextConfig = {
  defaultLocale,
  locales,
  namespaces: ["common", "navigation", "pages", "seo"],
  defaultNamespace: "common",
  routes: {
    // English is at root, other languages have path prefix
    es: {
      // Spanish URLs
    },
    fr: {
      // French URLs  
    },
    pt: {
      // Portuguese URLs
    },
    de: {
      // German URLs
    },
    ar: {
      // Arabic URLs
    },
    zh: {
      // Chinese URLs
    },
  },
  showDefaultLocale: false, // English served at / not /en/
  i18nextServer: {
    debug: false,
  },
  i18nextClient: {
    debug: false,
  },
};

export default config;

