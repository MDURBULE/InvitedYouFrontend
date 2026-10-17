import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          ruby: "#8B1E2E",
          crimson: "#A12C2F",
          gold: "#D4AF37",
          champagne: "#E5C378",
          emerald: "#1B4D3E",
          marigold: "#F4A226",
          dark: "#0F1117",
          ivory: "#FDFBF7",
          parchment: "#F7F4EE",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel Decorative", "Playfair Display", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(212, 175, 55, 0.25)",
        "gold-lg": "0 10px 30px -4px rgba(212, 175, 55, 0.4)",
        ruby: "0 4px 20px -2px rgba(139, 30, 46, 0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
