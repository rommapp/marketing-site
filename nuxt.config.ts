import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  plugins: [{ src: "~/plugins/theme.ts", mode: "client" }],
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      include: ["Button", "Tag", "Divider"],
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
  css: ["primevue/resources/themes/aura-dark-purple/theme.css"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "The RomM Project"
    },
  },
});
