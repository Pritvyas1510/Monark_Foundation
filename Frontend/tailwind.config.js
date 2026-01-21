export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
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
    },
  },
  plugins: [],
};
