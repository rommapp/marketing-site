export type Theme = "light" | "dark";

// Light/dark toggle. The initial value follows the OS preference (via the
// pre-paint script in nuxt.config, mirrored here on init); once the user
// toggles, the explicit choice is persisted and wins on future loads.
// The palette flips via the `.light` class on <html>.
export function useTheme() {
  const theme = useState<Theme>("theme", () => "dark");

  function set(value: Theme) {
    theme.value = value;
    if (import.meta.client) {
      document.documentElement.classList.toggle("light", value === "light");
      localStorage.setItem("theme", value);
    }
  }

  function toggle() {
    set(theme.value === "light" ? "dark" : "light");
  }

  // Sync reactive state with the theme already applied pre-paint: the stored
  // choice if any, otherwise the OS preference.
  function init() {
    if (!import.meta.client) return;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      theme.value = stored;
    } else {
      theme.value = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
  }

  return { theme, set, toggle, init };
}
