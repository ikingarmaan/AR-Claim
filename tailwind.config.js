/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fffef7',
          100: '#fdf9ed',
          200: '#f9f0d9',
          300: '#f3e4be',
          400: '#e8d19a',
          500: '#d4b86e',
          600: '#b89848',
          700: '#9a7a3a',
          800: '#7a5e2e',
          900: '#5a4222',
        },
        leather: {
          50: '#f5ebe0',
          100: '#e8d5bf',
          200: '#c9a96e',
          300: '#a08850',
          400: '#8a7440',
          500: '#6d522e',
          600: '#5a3e28',
          700: '#4a3220',
          800: '#3d2a1a',
          900: '#2d1f14',
        },
        manila: {
          50: '#fdf6e3',
          100: '#f5e6c8',
          200: '#e8d5a8',
          300: '#dcc896',
          400: '#c4a96a',
          500: '#a08850',
        },
        stamp: {
          approved: '#2d6b3e',
          denied: '#9a2222',
          pending: '#8a6d20',
        },
        health: {
          dark: '#141210',
          darkCard: '#1e1a16',
          darkSubtle: '#2a231c',
          electric: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'skeuo-sm': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)',
        'skeuo': '0 2px 6px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)',
        'skeuo-lg': '0 4px 12px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)',
        'skeuo-inset': 'inset 0 2px 6px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.08)',
        'skeuo-pressed': 'inset 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(0,0,0,0.1)',
        'skeuo-emboss': '0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.85)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'stamp': 'stampIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        stampIn: {
          '0%': { transform: 'scale(2) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(-6deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-6deg)', opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
