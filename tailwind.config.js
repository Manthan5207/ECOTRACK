/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38BDF8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ocean: {
          DEFAULT: '#1D4ED8',
          dark: '#030712',
          card: '#0F172A',
          border: '#1E293B',
          light: '#F0F9FF',
        },
        aqi: {
          good: '#10B981',
          moderate: '#F59E0B',
          sensitive: '#F97316',
          unhealthy: '#EF4444',
          veryUnhealthy: '#A855F7',
          hazardous: '#7F1D1D',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 14px 40px -10px rgba(37, 99, 235, 0.20)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.50)',
        'glow-blue': '0 0 25px -4px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.40)',
        'glow-sky': '0 0 25px -4px rgba(56, 189, 248, 0.35)',
        'glow-amber': '0 0 25px -4px rgba(245, 158, 11, 0.35)',
        'floating-hero': '0 20px 60px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(255, 255, 255, 0.8)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
