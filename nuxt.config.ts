import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  plugins: [{ src: "~/plugins/theme.ts", mode: "client" }],
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      include: ["Button", "Tag"],
    },
  },
  runtimeConfig: {
    theme: "dark",
  },
  build: {
    transpile: ["primevue"],
  },
  nitro: {
    preset: "github-pages"
  },
  css: ["primevue/resources/themes/aura-dark-purple/theme.css"],
});
