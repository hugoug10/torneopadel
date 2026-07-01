/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        court: {
          DEFAULT: '#0F6B3A',
          dark: '#0A4D2A',
          light: '#15914F',
        },
        lime: {
          accent: '#D4F547',
        },
        ink: {
          DEFAULT: '#0B0F0D',
          soft: '#141A17',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'court-lines': "radial-gradient(circle at 20% 20%, rgba(212,245,71,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(21,145,79,0.35), transparent 45%)",
        'hero-gradient': 'linear-gradient(135deg, #0A4D2A 0%, #0F6B3A 45%, #0B0F0D 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(212,245,71,0.25)',
        card: '0 10px 40px rgba(0,0,0,0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
};
