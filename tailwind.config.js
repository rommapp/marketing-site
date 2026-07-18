export default {
  // Dark is the default (no class); light mode adds `.light` on <html>. Point
  // the `dark:` variant at "not light" so dark: utilities work with that scheme.
  darkMode: ["selector", "html:not(.light)"],
  theme: {
    extend: {
      colors: {
        // Colors are backed by CSS variables (channels defined in
        // assets/css/tailwind.css) so the whole palette flips between the
        // dark default and the creamy `.light` theme with no markup changes.
        primary: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          DEFAULT: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          950: "rgb(var(--primary-950) / <alpha-value>)",
        },
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          850: "rgb(var(--ink-850) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        grid: "rgb(var(--grid) / <alpha-value>)",
        cream: "rgb(var(--cream) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        pixel: ["Silkscreen", "monospace"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ['"Inter var"', "Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
