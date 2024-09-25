/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sfpro: ["SF Pro Display", "sans-serif"],
      },
      vcolors: {
        "amigo-primary": {
          100: "#ff5500",
          200: "#ff6c29",
        },
        "dark-bg": "#121212",
        "amigo-black": {
          100: "#121212",
          200: "#282828",
          600: "#8b8b8b",
        },
        "amigo-grey": "#2a2a2a",
      },
      colors: {
        primaryAmigo: "#FC5800", // Orange
        primaryHover: "#ff6c29", // Darker Blue
        textDark: "040404",
        textLight: "#fff",
        secondarySubtitleLight: "#AAAAAA",
        secondarySubtitleDark: "#878787",
        accentIconLight: "#F6E5DC",
        accentIconDark: "#2a2a2ae8",
        cardColorLight: "#F8F8FA",
        cardColorDark: "#212121",
        accent: "#6B7280",
      },
    },
  },
  plugins: [],
};
