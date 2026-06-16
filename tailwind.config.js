/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "obsidian": "#000000",
        "silver": "#C6C6C6",
        "intense-red": "#E41E2A",
        "surface-glass": "rgba(255, 255, 255, 0.02)",
        "surface-glass-hover": "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        "display": ["Anton", "sans-serif"],
        "body": ["Hanken Grotesk", "sans-serif"],
        "mono": ["Space Mono", "monospace"]
      },
      fontSize: {
        "mega": ["clamp(6rem, 15vw, 16rem)", { "lineHeight": "0.85", "letterSpacing": "-0.04em" }],
        "archive-label": ["10px", { "lineHeight": "1.5", "letterSpacing": "0.2em", "fontWeight": "700" }],
        "body-editorial": ["clamp(1rem, 2vw, 1.5rem)", { "lineHeight": "1.6", "letterSpacing": "0.02em" }]
      }
    }
  },
  plugins: [],
}
