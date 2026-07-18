export default {
  theme: {
    extend: {
      colors: {
        // Oxford lapis — the encyclopedia-spine blue
        primary: {
          50: "#F2F5FA",
          100: "#E3EAF4",
          200: "#C5D2E6",
          300: "#9AB2D1",
          400: "#6C8DB8",
          500: "#47699D",
          DEFAULT: "#35538A",
          600: "#35538A",
          700: "#2B4472",
          800: "#23375C",
          900: "#1D2C49",
          950: "#121C2F",
        },
        // Deep printer's red, for figure labels and active marks
        vermilion: {
          100: "#F5DFD8",
          400: "#C96A50",
          500: "#B04A30",
          600: "#93381F",
          700: "#772C18",
        },
        // Old gold, for gilt rules and museum accents
        gold: {
          100: "#F5EBD0",
          300: "#DFC47E",
          400: "#CDAA52",
          500: "#B79233",
          600: "#957526",
          700: "#755C1E",
        },
        // Bookplate green
        forest: {
          100: "#E3EEE7",
          400: "#4E8B68",
          500: "#356F4E",
          600: "#2A5A3F",
          700: "#204832",
        },
        // Aubergine, sparingly
        plum: {
          400: "#8A6AA8",
          500: "#6F4E8E",
          600: "#593D74",
        },
        // White stock and print ink
        paper: {
          DEFAULT: "#FAF8F2",
          warm: "#F3EFE3",
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#211F1B",
          soft: "#54514A",
          faint: "#8B877C",
        },
        rule: "#E0DCCF",
      },
      fontFamily: {
        display: [
          '"EB Garamond Variable"',
          "Garamond",
          '"Times New Roman"',
          "serif",
        ],
        serif: ["Gelasio", "Georgia", "serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ['"Inter var"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // A mounted print, resting on the page
        card: "0 1px 2px rgba(33, 31, 27, 0.05), 0 10px 28px -14px rgba(33, 31, 27, 0.25)",
        // A window floating above the page, Compton's-ad style
        float:
          "0 28px 56px -24px rgba(33, 31, 27, 0.38), 0 8px 20px -10px rgba(33, 31, 27, 0.16)",
        // A photographic cutout with its soft catalogue shadow
        cutout: "0 16px 26px -14px rgba(33, 31, 27, 0.4)",
      },
    },
  },
};
