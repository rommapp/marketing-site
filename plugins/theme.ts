import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const { $primevue } = nuxtApp.vueApp.config.globalProperties;
    $primevue.config.ripple = true;

    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");
    function handleColorSchemeChange(matches: boolean) {
      // Set the theme in the runtime config
      nuxtApp.$config.theme = matches ? "dark" : "light";

      if (matches) {
        $primevue.changeTheme(
          "aura-light-purple",
          "aura-dark-purple",
          "theme-link",
        );
        document.documentElement.classList.add("dark");
      } else {
        $primevue.changeTheme(
          "aura-dark-purple",
          "aura-light-purple",
          "theme-link",
        );
        document.documentElement.classList.remove("dark");
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
