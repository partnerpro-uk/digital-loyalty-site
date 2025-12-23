// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import astroI18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://digitalloyalty.com",
  server: { port: 5173 },
  integrations: [
    astroI18next(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
          fr: "fr",
          pt: "pt",
          de: "de",
          ar: "ar",
          zh: "zh",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});