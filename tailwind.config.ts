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
        'pop-up': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'blob': {
          '0%': { transform: 'rotate(0.3deg) scale(1)' },
          '100%': { transform: 'rotate(-0.3deg) scale(0.99)' },
        },
        arrow: {
          '0%': { transform: 'translateY(10%) translateX(-50%) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(60%) translateX(-50%) scale(0.9)', opacity: '1' },
        },
        customBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'expansion': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'expandCircle': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        arrow: 'arrow 0.5s cubic-bezier(0.37, 0, 0.63, 1) 4.5s infinite alternate',
        'custom-bounce': 'customBounce 1.5s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)',
        'pop-up': 'pop-up 0.6s ease-out 1s forwards',
        'dialogue-top': 'blob 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
        'dialogue-bottom': 'blob 1s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)',
        'expansion': 'expansion 5s linear infinite'
      },
    },
  },
  plugins: [],
} satisfies Config;
