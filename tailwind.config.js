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
        health: {
          darkBg: '#090d16',
          darkCard: '#111827',
          darkSubtle: '#1e293b',
          clean: '#10b981',       // Emerald - Paid/Clean
          cleanGlow: 'rgba(16, 185, 129, 0.2)',
          pending: '#f59e0b',     // Amber - Pending/In-Process
          pendingGlow: 'rgba(245, 158, 11, 0.2)',
          denial: '#f43f5e',      // Coral Red - Denials/CO
          denialGlow: 'rgba(244, 63, 94, 0.2)',
          electric: '#0ea5e9',    // Electric Blue
          electricDark: '#0284c7',
          accent: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
