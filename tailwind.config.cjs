/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        "fade-up": "fade-in-up 0.3s ease-in-out forwards",
        "fade-down": "fade-in-down 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
