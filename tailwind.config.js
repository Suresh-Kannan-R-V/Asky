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
              DEFAULT: "#FFFFFF",
              foreground: "#000000",
            },
            primary: {
              DEFAULT: "#7735f2",
              foreground: "#f5f3ff",
              50: "#f5f3ff",
              100: "#ede8ff",
              200: "#dbd5ff",
              300: "#c1b3ff",
              400: "#a488fd",
              500: "#8658fa",
              600: "#7735f2",
              700: "#6823de",
              800: "#571dba",
              900: "#481a98",
              950: "#2b0e67",
            },
            secondary: {
              DEFAULT: "#00e4ac",
              foreground: "#e8fff8",
              50: "#e8fff8",
              100: "#c6ffec",
              200: "#94ffdf",
              300: "#4fffd3",
              400: "#20fcc7",
              500: "#00e4ac",
              600: "#00bb8e",
              700: "#009677",
              800: "#00765f",
              900: "#006050",
              950: "#00372f",
            },
            success: {
              DEFAULT: "#11cd48",
              foreground: "#effef2",
              50: "#effef2",
              100: "#d9ffe3",
              200: "#b5fdc9",
              300: "#7bfa9f",
              400: "#3bed6f",
              500: "#11cd48",
              600: "#08b139",
              700: "#0a8b30",
              800: "#0e6d2b",
              900: "#0e5926",
              950: "#013211",
            },
          },
        },
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
  ],
};
