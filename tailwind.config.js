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
      boxShadow: {
        'spatial-sm': '0 4px 16px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'spatial': '0 8px 32px 0 rgba(15, 23, 42, 0.08), 0 1px 3px 0 rgba(15, 23, 42, 0.05)',
        'spatial-lg': '0 16px 48px -4px rgba(15, 23, 42, 0.12), 0 4px 12px 0 rgba(15, 23, 42, 0.06)',
        'spatial-glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
        'spatial-glow-cyan': '0 0 35px -5px rgba(14, 165, 233, 0.35)',
        'spatial-glow-crimson': '0 0 35px -5px rgba(244, 63, 94, 0.35)',
        'spatial-dock': '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(255, 255, 255, 0.8) inset',
        'spatial-dock-dark': '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.12) inset',
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'mesh-glow': 'meshGlow 12s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        meshGlow: {
          '0%': { transform: 'scale(1) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.1) translate(15px, -15px)' },
          '100%': { transform: 'scale(0.95) translate(-10px, 10px)' },
        }
      }
    },
  },
  plugins: [],
}
