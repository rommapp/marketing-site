import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

    function applyColorScheme(matches: boolean) {
      // Track the active theme in the runtime config
      nuxtApp.$config.theme = matches ? "dark" : "light";
      // PrimeVue 4 (darkModeSelector: ".dark") and Tailwind (darkMode: "class")
      // both key off the "dark" class on <html>.
      document.documentElement.classList.toggle("dark", matches);
    }

    // Set the correct theme initially, then react to OS changes
    applyColorScheme(mediaMatch.matches);
    mediaMatch.addEventListener("change", (e) => applyColorScheme(e.matches));
  }
});
