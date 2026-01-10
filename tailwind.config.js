/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/theme";

module.exports = {
  content: [
    "./**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  //to use the all colors to the hero ui components dynamically
  //safelist is used to avoid purging of unused css classes during production build
  //best way to use dynamic classes with tailwindcss
  safelist: [
    {
      pattern:
        /(bg|text)-(primary|secondary|success|warning|danger)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      prefix: "core",
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          extend: "light",
          layout: {
            boxShadow: {
              small: "0px 1px 2px 0px #15151514",
            },
            disabledOpacity: "0.3",
            radius: {
              small: "2px",
              medium: "0.5rem",
              large: "6px",
            },
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "2px",
            },
          },
          colors: {
            background: {
              DEFAULT: "#edfbfb",
              foreground: "#18181b",
              50: "#f4f4f5",
              100: "#eeeef0",
              200: "#dadadd",
              300: "#b9bac0",
              400: "#93949d",
              500: "#767681",
              600: "#606169",
              700: "#4e4e56",
              800: "#434349",
              900: "#3b3c3f",
              950: "#27272a",
            },
            primary: {
              DeFAULT: "#00c5dc",
              foreFround: "#ffffff",
              50: "#ebfffe",
              100: "#cdfeff",
              200: "#a1faff",
              300: "#7cf5ff",
              400: "#1ae2f6",
              500: "#00c5dc",
              600: "#019cb9",
              700: "#097d95",
              800: "#116479",
              900: "#135266",
              950: "#063746",
              5070: "#edfbfb",
            },
          },
        },
      },
    }),
  ],
};
