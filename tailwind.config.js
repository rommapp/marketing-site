export default {
  darkMode: "class", // This enables dark mode based on the presence of the "dark" class in the HTML tag
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F4F2FC",
          100: "#E9E6FA",
          200: "#D3CCEE",
          300: "#BDB3E3",
          400: "#A494EB",
          500: "#8B74E8",
          DEFAULT: "#8B74E8",
          600: "#7259D1",
          700: "#5A41B8",
          800: "#432D9E",
          900: "#2D1D84",
          950: "#1A1066",
        },
        dark: {
          background: "#0D1117",
          surface: "#161B22",
          toplayer: "#1C2330",
        },
        light: {
          background: "#F2F4F8",
          surface: "#FFFFFF",
          toplayer: "#E4E9F0",
        },
      },
    },
  },
};
