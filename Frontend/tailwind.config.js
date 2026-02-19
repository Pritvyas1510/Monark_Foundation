import colors from "tailwindcss/colors";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      ...colors,   // ✅ force RGB colors (fixes OKLCH issue)
    },
    extend: {
      colors: {
        primary: "#f48c25",
        "primary-dark": "#d67112",
        "primary-light": "#fff0e0",
        "background-light": "#f8f7f5",
        "background-dark": "#221910",
        "surface-dark": "#2f2216",
        "text-main": "#1c140d",
        "text-light": "#fcfaf8",
      },

      fontFamily: {
        display: ["Public Sans", "sans-serif"],
      },

      animation: {
        fadeSlide: "fadeSlide 0.8s ease-in-out",
      },
      keyframes: {
        fadeSlide: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
