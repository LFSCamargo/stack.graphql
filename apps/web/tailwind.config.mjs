import animated from "tailwindcss-animated";
import svgToDataUri from "mini-svg-data-uri";

import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
  important: true,
  content: ["./**/*.html", "./**/*.vue"],
  theme: {
    extend: {
      colors: {
        mainGreen: "#BEF264",

        black: "#000000",
        white: "#FFFFFF",

        leftGradient: "#FEF1D2",
        rightGradient: "#D2FF85",

        background: "#202020",

        cardBackground: "#FFF7ED",
      },
    },
  },
  plugins: [
    animated,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
  ],
};
