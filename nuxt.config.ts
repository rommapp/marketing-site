import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  css: [
    "@fontsource/silkscreen/400.css",
    "@fontsource/silkscreen/700.css",
    "@fontsource/space-mono/400.css",
    "@fontsource/space-mono/700.css",
  ],

  nitro: {
    preset: "github-pages",
  },

  image: {
    quality: 80,
    format: ["webp"],
    provider: "ipx",
    presets: {
      responsive: {
        modifiers: {
          format: "webp",
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        dir: "ltr",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "The RomM Project",
      meta: [
        { name: "author", content: "The RomM Team" },
        { name: "keywords", content: "romm, rom, manager, game, collection" },
        {
          name: "description",
          content:
            "RomM is a self-hosted rom manager and player for your game collection.",
        },
        { name: "og:title", content: "The RomM Project" },
        {
          name: "og:description",
          content:
            "RomM is a self-hosted rom manager and player for your game collection.",
        },
        {
          name: "og:image",
          content: "https://romm.app/images/og/og-v5.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "The RomM Project" },
        {
          name: "twitter:description",
          content:
            "RomM is a self-hosted rom manager and player for your game collection.",
        },
        {
          name: "twitter:image",
          content: "https://romm.app/images/og/og-v5.png",
        },
        { name: "theme-color", content: "#8B74E8" },
        {
          content:
            "default-src 'self'; img-src 'self' data: app.aikido.dev; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';connect-src 'self' api.github.com discord.com; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
          "http-equiv": "Content-Security-Policy",
        },
      ],
    },
  },

  compatibilityDate: "2026-06-12",

  vite: {
    optimizeDeps: {
      include: [
        "@fortawesome/free-brands-svg-icons",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
      ],
    },
  },
});
