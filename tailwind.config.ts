import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Hintergrundfarbe
        foreground: "var(--foreground)", // Textfarbe
        primary: "#a64af7", // Lila (z. B. für Buttons oder Highlights)
        secondary: "#6abdf7", // Blau (für Hover oder Akzente)
        inputBg: "#262626", // Eingabefeld-Hintergrund
        borderColor: "#3a3a3a", // Rahmenfarbe
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Standardschriftarten
      },
      borderRadius: {
        md: "8px", // Abgerundete Kanten für Komponenten (z. B. Buttons, Inputs)
      },
    },
  },
  plugins: [],
};
export default config;
