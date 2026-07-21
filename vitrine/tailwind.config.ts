import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E1A",
        blue: "#1A4DFF",
        green: "#00C48C",
        gold: "#F5A000",
        surf: "#F2F5FB",
        muted: "#8B92A5",
        border: "#1E2440",
        card: "#111827",
      },
      fontFamily: {
        display: ["'Big Shoulders Display'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0A0E1A 0%, #0D1533 50%, #0A0E1A 100%)",
        "card-gradient": "linear-gradient(145deg, #111827 0%, #0D1533 100%)",
        "cta-gradient": "linear-gradient(135deg, #1A4DFF 0%, #0D3ACC 100%)",
        "green-gradient": "linear-gradient(135deg, #00C48C 0%, #009E72 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.4s ease-out both",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
