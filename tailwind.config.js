export default {
  theme: {
    extend: {
      colors: {
        // Royal "encyclopedia spine" blue — the workhorse primary
        primary: {
          50: "#EEF3FE",
          100: "#DCE6FD",
          200: "#B7CBFA",
          300: "#8DAAF3",
          400: "#5F84E7",
          500: "#3B63D8",
          DEFAULT: "#3B63D8",
          600: "#2B50C8",
          700: "#2242A8",
          800: "#1C3585",
          900: "#182B69",
          950: "#101C46",
        },
        // Bright cerulean, for skies and links
        cerulean: {
          300: "#9BD7FA",
          400: "#5FBCF2",
          500: "#3FA9F5",
          600: "#1F8FDE",
        },
        sun: {
          300: "#FFE08A",
          400: "#FFD24D",
          500: "#FFC629",
          600: "#F0A800",
          700: "#C78A00",
        },
        kelly: {
          400: "#48B85C",
          500: "#2E9E44",
          600: "#1F7F34",
        },
        tomato: {
          400: "#F26649",
          500: "#E8442E",
          600: "#C93321",
        },
        grape: {
          400: "#9B6FD0",
          500: "#7B4FBF",
          600: "#63399F",
        },
        // Warm paper stock and deep print ink
        paper: {
          DEFAULT: "#FAF6EC",
          warm: "#F4EDDC",
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1B2437",
          soft: "#4A5468",
          faint: "#8B92A3",
        },
        rule: "#D8D2C2",
      },
      fontFamily: {
        display: ['"Rokkitt Variable"', "Rockwell", "Georgia", "serif"],
        serif: ["Gelasio", "Georgia", "serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ['"Inter var"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Hard offset "sticker on the page" shadows
        plate: "6px 6px 0 0 rgba(27, 36, 55, 0.18)",
        "plate-sm": "3px 3px 0 0 rgba(27, 36, 55, 0.16)",
        "plate-primary": "6px 6px 0 0 #2242A8",
      },
    },
  },
};
