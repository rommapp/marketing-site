import { defineNuxtConfig } from "nuxt/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// Mirror the brand `primary` palette from tailwind.config.js so PrimeVue's
// primary color matches the rest of the site (Aura's default primary is green).
const RommPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#F4F2FC",
      100: "#E9E6FA",
      200: "#D3CCEE",
      300: "#BDB3E3",
      400: "#A494EB",
      500: "#8B74E8",
      600: "#7259D1",
      700: "#5A41B8",
      800: "#432D9E",
      900: "#2D1D84",
      950: "#1A1066",
    },
  },
});

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@nuxt/image"],
  plugins: [{ src: "~/plugins/theme.ts", mode: "client" }],

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: RommPreset,
        options: {
          darkModeSelector: ".dark",
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    },
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
      script: [
        {
          innerHTML:
            'if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.classList.add("dark")}',
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
