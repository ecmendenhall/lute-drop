const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "bg-blue-300",
      "text-blue-800",
      "hover:bg-blue-400",
      "bg-red-300",
      "text-red-800",
      "hover:bg-red-400",
    ],
  },
  darkMode: false,
  theme: {
    extend: {},
    fontFamily: {
      mono: [...defaultTheme.fontFamily.mono],
      display: ["Almendra SC"],
      body: ["Almendra"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
