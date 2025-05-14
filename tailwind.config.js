// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        background: {
          light: "#FFFFFF",
          dark: "#121212",
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        ripple: "ripple 0.7s linear forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
