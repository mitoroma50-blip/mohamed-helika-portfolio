/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '4.5': '1.125rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#03060f',
          900: '#060b18',
          800: '#0a1226',
          700: '#0f1b35',
          600: '#16264a',
        },
        steel: {
          50: '#f0f6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#172554',
        },
        cyan: {
          glow: '#22d3ee',
        },
      },
      backgroundImage: {
        'grid-blueprint':
          'linear-gradient(to right, rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.08) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(37,99,235,0.25), transparent 60%)',
        'hero-sheen':
          'linear-gradient(180deg, rgba(3,6,15,0) 0%, rgba(3,6,15,0.6) 60%, rgba(3,6,15,1) 100%)',
      },
      backgroundSize: {
        'grid-lg': '64px 64px',
        'grid-sm': '32px 32px',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(56,189,248,0.45)',
        'glow-lg': '0 0 80px -20px rgba(59,130,246,0.55)',
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 50px -20px rgba(0,0,0,0.7)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'dash': {
          to: { strokeDashoffset: '-1000' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 28s linear infinite',
        shimmer: 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [],
};
