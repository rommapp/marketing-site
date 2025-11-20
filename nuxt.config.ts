import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@nuxt/image"],
  plugins: [{ src: "~/plugins/theme.ts", mode: "client" }],

  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      include: ["Button", "Tag", "Divider", "Menubar"],
    },
  },

  runtimeConfig: {
    theme: "dark",
  },

  build: {
    transpile: ["primevue"],
  },

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
      link: [
        {
          rel: "stylesheet",
          href: "/css/theme-light.css",
          id: "theme-link",
        },
      ],
      script: [
        {
          innerHTML:
            'let m=window.matchMedia("(prefers-color-scheme: dark)");if(m.matches){const e=document.getElementById("theme-link");e.href=e.href.replace("light","dark");document.documentElement.classList.add("dark")}',
        },
      ],
      meta: [
        { name: "author", content: "The RomM Team" },
        { name: "keywords", content: "romm, rom, manager, game, collection" },
        {
          name: "description",
          content:
            "RomM is a self-hosted rom manager for your game collection.",
        },
        { name: "og:title", content: "The RomM Project" },
        {
          name: "og:description",
          content:
            "RomM is a self-hosted rom manager for your game collection.",
        },
        {
          name: "og:image",
          content: "https://romm.app/images/og/winter-header.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "The RomM Project" },
        {
          name: "twitter:description",
          content:
            "RomM is a self-hosted rom manager for your game collection.",
        },
        {
          name: "twitter:image",
          content: "https://romm.app/images/og/winter-header.png",
        },
        { name: "theme-color", content: "#cf00fb" },
        {
          content:
            "default-src 'self'; img-src 'self' data: app.aikido.dev; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';connect-src 'self' api.github.com discord.com; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
          "http-equiv": "Content-Security-Policy",
        },
      ],
    },
  },

  compatibilityDate: "2025-01-31",
});
