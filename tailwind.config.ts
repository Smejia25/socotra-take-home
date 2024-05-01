import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#406E8F",
        secondary: "#112C4D",
        "Primary/Normal": "#23B28E",
        "Socotra/Honesty": "#23476B",
        "White/Darkest": "#C5CAD1",
        "Socotra/Growth": "#26AEAF",
        "Socotra/Balance": "#406E8F",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        raleway: ["var(--font-raleway)"],
        roboto: ["var(--font-roboto)"],
        spaceGrotesk: ["var(--font-space-grotesk)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
