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
        dark: {
          bg: '#080B11',
          card: '#0F1622',
          surface: '#151F30',
          border: '#1F2E45',
          hover: '#1E2C44',
        },
        accent: {
          emerald: '#10B981',
          gold: '#F59E0B',
          cyan: '#06B6D4',
        },
        chains: {
          eth: '#627EEA',
          sol: '#9945FF',
          trx: '#EF0027',
          ton: '#0088CC',
          stars: '#FBBF24',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glow-ton': '0 0 25px -5px rgba(0, 136, 204, 0.3)',
      }
    },
  },
  plugins: [],
}
