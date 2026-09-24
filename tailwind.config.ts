import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          dark: "var(--dark)",
          brown: "var(--brown)",
          bg: "var(--background)",
          surface: "var(--surface)",
          text: "var(--text)",
          "text-light": "var(--text-light)",
          white: "var(--white)",
        },
      },
    },
  },
};

export default config;
