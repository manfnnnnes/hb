import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c1116",
        plum: "#2c1e26",
        mauve: "#3d2833",
        mauvelight: "#523646",
        rose: "#e6b3ae",
        blush: "#f0c9c2",
        champagne: "#d7ae82",
        champagnelight: "#ecd3ab",
        cream: "#f6ece3",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.025)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(0,0,0,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
