/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        foreground: "rgb(var(--foreground))",
        background: "rgb(var(--background))",
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        accent: "rgb(var(--accent))",
      },
      dropShadow: {
        "foreground-glow": [
          "0 0px 25px rgb(var(--foreground))",
          "0 0px 50px rgb(var(--foreground))",
        ],
        "primary-glow": [
          "0 0px 25px rgb(var(--primary))",
          "0 0px 50px rgb(var(--primary))",
        ],
        "secondary-glow": [
          "0 0px 25px rgb(var(--secondary))",
          "0 0px 50px rgb(var(--secondary))",
        ],
        "accent-glow": [
          "0 0px 25px rgb(var(--accent))",
          "0 0px 50px rgb(var(--accent))",
        ],
      },
    },
  },
  plugins: [],
};
