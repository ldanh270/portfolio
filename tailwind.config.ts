import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        brand: {
          black: "#0a0a0a",
          white: "#fafaf8",
          gray: "#888888",
          border: "rgba(10, 10, 10, 0.12)",
        },
      },
      letterSpacing: {
        tighter2: "-0.04em",
        tighter3: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
