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
          bg: '#0A0B0E',
          card: '#12141C',
          surface: '#171A24',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: '#1E2230',
        },
        accent: {
          emerald: '#10B981',
          gold: '#F59E0B',
          cyan: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
