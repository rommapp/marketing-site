export default {
  theme: {
    extend: {
      colors: {
        // Glossy millennium aqua — the iMac/OS-X gel blue
        primary: {
          50: "#EBF9FF",
          100: "#D3F2FF",
          200: "#A6E4FF",
          300: "#6FD2FF",
          400: "#38BDF8",
          500: "#00A8E8",
          DEFAULT: "#00A8E8",
          600: "#0089C7",
          700: "#006C9E",
          800: "#005076",
          900: "#003852",
          950: "#062A3D",
        },
        lime: {
          300: "#D8F76E",
          400: "#C0EE3A",
          500: "#A5DB13",
          600: "#84B408",
        },
        magenta: {
          300: "#FF9BDD",
          400: "#FF66C8",
          500: "#FF3EB5",
          600: "#DB1F96",
        },
        violet2: {
          300: "#BDB3FF",
          400: "#9F90FF",
          500: "#8A7CFF",
          600: "#6C5BE8",
        },
        // Brushed chrome and frosted ice
        chrome: {
          50: "#F8FBFD",
          100: "#EDF3F8",
          200: "#DCE6EE",
          300: "#C2D2DE",
          400: "#9FB4C4",
          500: "#7C93A6",
        },
        ice: "#EAF2F9",
        ink: {
          DEFAULT: "#06263F",
          soft: "#3E6076",
          faint: "#7C97A8",
        },
      },
      fontFamily: {
        display: ["Michroma", "Eurostile", "sans-serif"],
        tech: ['"Exo 2 Variable"', '"Exo 2"', "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ['"Inter var"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gel: "0 6px 16px rgba(0, 137, 199, 0.35), inset 0 -4px 8px rgba(0, 60, 100, 0.3), inset 0 2px 2px rgba(255, 255, 255, 0.8)",
        glass:
          "0 10px 30px rgba(6, 38, 63, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        "glass-sm":
          "0 4px 14px rgba(6, 38, 63, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        screen: "inset 0 2px 10px rgba(0, 0, 0, 0.55)",
      },
    },
  },
};
