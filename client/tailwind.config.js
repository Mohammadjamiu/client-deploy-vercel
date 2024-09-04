/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sfpro: ["SF Pro Display", "sans-serif"],
        
      },
      colors: {
        "amigo-primary": {
          100:'#ff5500',
          200: '#ff6c29'
        },
        "dark-bg": "#121212",
        "amigo-black" : {
          100: '#121212',
          200: '#282828',
          600: '#8b8b8b'},
        "amigo-grey": "#2a2a2a"
       
      },
    },
  },
  plugins: [],
}