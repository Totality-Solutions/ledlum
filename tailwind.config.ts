import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bai: ["var(--font-bai)", "sans-serif"],
        pop: ["var(--font-pop)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: "var(--text-txgray)",
        "bg-gray": "var(--bg-gray)",
      },
    },
  },
  plugins: [],
};

export default config;
