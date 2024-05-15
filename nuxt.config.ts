import { defineNuxtConfig } from "nuxt/config";

const baseUrl = "_nuxt/node_modules/primevue/resources/";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  plugins: [{ src: "~/plugins/theme.ts", mode: "client" }],
  primevue: {
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  runtimeConfig: {
    theme: "dark",
  },
  app: {
    head: {
      link: [
        {
          id: "theme-link",
          rel: "stylesheet",
          href: baseUrl + "themes/aura-dark-purple/theme.css",
        },
      ],
    },
  },
});
