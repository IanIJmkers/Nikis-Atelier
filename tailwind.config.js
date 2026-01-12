/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f0e8", // Soft cream
        secondary: "#d9cfc1", // Warm taupe
        accent: "#a68e74", // Rich caramel
        dark: "#4a453f", // Deep charcoal brown
        light: "#faf7f2", // Ivory
        gold: "#d4af37", // Accent gold
      },
      fontFamily: {
        main: ["Cormorant Garamond", "serif"],
        body: ["Nunito Sans", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.2" }],
        heading: ["2.5rem", { lineHeight: "1.3" }],
        subheading: ["1.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        section: "5rem",
      },
      boxShadow: {
        soft: "0 5px 20px rgba(0, 0, 0, 0.03)",
        card: "0 10px 30px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
