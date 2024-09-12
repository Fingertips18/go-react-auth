/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        foreground: "#06231F",
        background: "#F2FDFB",
        primary: "#26DCD4",
        secondary: "#EB9E84",
        accent: "#BBE660",

        "dark-foreground": "#DCF9F5",
        "dark-background": "#020D0B",
        "dark-primary": "#23D7CE",
        "dark-secondary": "#7B2E14",
        "dark-accent": "#749F19",
      },
    },
  },
  plugins: [],
};
