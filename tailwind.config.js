/** @type {import('tailwindcss').Config} */

import { heroui } from "@heroui/theme";

module.exports = {
  content: [
    "./**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "core", // prefix for themes variables
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          extend: "light",
          layout: {},
          colors: {},
        },
        dark: {
          extend: "dark",
          layout: {
            boxShadow: {
              small: "0px 1px 2px 0px #15151514",
              large: "",
              medium: "",
            },
            disabledOpacity: "0.3", // opacity-[0.3]
            radius: {
              small: "2px", // rounded-small
              medium: "0.5rem", // rounded-medium
              large: "6px", // rounded-large
            },
            borderWidth: {
              small: "1px", // border-small
              medium: "1px", // border-medium
              large: "2px", // border-large
            },
          },
          colors: {
            background: {
              DEFAULT: "#18181b",
              foreground: "#FAFAFA",
            },
          },
        },
      },
    }),
  ],
};
