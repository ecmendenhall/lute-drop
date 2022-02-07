const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "bg-blue-500",
      "text-blue-100",
      "hover:bg-blue-600",
      "bg-red-500",
      "text-red-100",
      "hover:bg-red-600",
    ],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "rgb(253 240 221)",
          100: "rgb(250 220 176)",
        },
      },
    },
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
