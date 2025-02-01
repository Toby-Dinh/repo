import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        arrow: {
          '0%': { transform: 'translateY(33%) translateX(-50%) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(50%) translateX(-50%) scale(0.9)', opacity: '1' },
        },
      },
      animation: {
        arrow: 'arrow 0.6s cubic-bezier(0.37, 0, 0.63, 1) 4.5s infinite alternate',
      },
    },
  },
  plugins: [],
} satisfies Config;
