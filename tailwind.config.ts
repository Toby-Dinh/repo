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
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'blob': {
          '0%': { transform: 'rotate(0.3deg) scale(1)' },
          '100%': { transform: 'rotate(-0.3deg) scale(0.99)' },
        },
        'options': {
          '0%': { transform: 'rotate(0.3deg) scale(1)' },
          '100%': { transform: 'rotate(-0.3deg) scale(0.96)' },
        },
        arrow: {
          '0%': { transform: 'translateY(10%) translateX(-50%) scale(1)' },
          '100%': { transform: 'translateY(60%) translateX(-50%) scale(0.9)' },
        },
        customBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'expansion': {
          '0%': { clipPath: 'circle(0% at 50% 50%)' },
          '100%': { clipPath: 'circle(150% at 50% 50%)' },
        },
        'zoomIn': {
          '0%': { clipPath: 'circle(150% at 50% 50%)' },
          '100%': { clipPath: 'circle(0% at 50% 50%)' },
        },
        'fade': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }, 
        }, 
        'wave': {
          '0%, 40%, 100%': {
            transform: 'translateY(0)',
          },
          '20%': {
            transform: 'translateY(-3px)',
          },
        }
      },
      animation: {
        arrow: 'arrow 0.5s cubic-bezier(0.37, 0, 0.63, 1) 4.5s infinite alternate',
        'custom-bounce': 'customBounce 1.5s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)',
        'pop-up': 'pop-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1 normal forwards',
        'dialogue-top': 'blob 1.5s cubic-bezier(0.37, 0, 0.63, 1) 0.3s infinite alternate',
        'dialogue-bottom': 'blob 1s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)',
        'option': 'options 1s infinite alternate cubic-bezier(0.37, 0, 0.63, 1)',
        'expansion': 'expansion 1.8s ease-out forwards',
        'zoomIn': 'zoomIn 1.8s ease-out forwards',
        'fade': 'fade 0.8s ease-in forwards',
        'wave': 'wave 1.2s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
