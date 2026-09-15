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
        // чуть светлее и теплее
        ink: "#26181f",
        plum: "#3a2832",
        mauve: "#4a3542",
        mauvelight: "#5e4654",
        rose: "#e8b9b4",
        blush: "#f2cdc7",
        champagne: "#dbb48a",
        champagnelight: "#efd6b2",
        cream: "#f8f0e8",
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
        soft: "0 20px 60px -20px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
