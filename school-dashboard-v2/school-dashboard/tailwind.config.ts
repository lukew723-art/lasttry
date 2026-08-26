import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        board: "#0F1A16",
        boardline: "#24352E",
        ink: "#12211C",
        page: "#F3F5F0",
        line: "#CDD6CD",
        muted: "#5B6B60",
        accent: "#FF7A29",
        accentSoft: "#FFD9B3",
        examRed: "#C6432B",
        quizBlue: "#2B5C8A",
        projectGreen: "#2F6B4F",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
