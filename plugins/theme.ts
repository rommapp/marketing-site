import { defineNuxtPlugin } from "#app";


export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");
    const { $primevue } = nuxtApp.vueApp.config.globalProperties;
    
    function handleColorSchemeChange(matches: boolean) {
      if (matches) {
        $primevue.changeTheme(
          "aura-light-purple",
          "aura-dark-purple",
          "theme-link"
        );
      } else {
        $primevue.changeTheme(
          "aura-dark-purple",
          "aura-light-purple",
          "theme-link"
        );
      }
    }

    // Call the function initially to set the correct theme
    handleColorSchemeChange(mediaMatch.matches);

    // Listen for changes
    mediaMatch.addEventListener("change", (e: MediaQueryListEvent) => {
      handleColorSchemeChange(e.matches);
    });
  }
});
