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
        // Ultra-minimal palette - only what's needed
        bg: '#080808',
        card: '#0F0F0F',
        muted: '#1A1A1A',
        border: '#262626',
        
        fg: '#FFFFFF',
        fgMuted: '#A3A3A3',
        fgSubtle: '#737373',
        
        accent: '#10B981',      // Single accent - emerald
        accentHover: '#059669',
        accentSoft: 'rgba(16, 185, 129, 0.12)',
        accentRing: 'rgba(16, 185, 129, 0.3)',
        
        destructive: '#EF4444',
        destructiveSoft: 'rgba(239, 68, 68, 0.12)',
        
        // Chain colors (for badges only, minimal usage)
        chain: {
          ton: '#0088CC',
          sol: '#9945FF',
          eth: '#627EEA',
          trx: '#EF0027',
          bsc: '#F3BA2F',
          base: '#0052FF',
          arb: '#28A0F0',
          op: '#FF0420',
          poly: '#8247E5',
          avax: '#E84142',
          zksync: '#8C8DFC',
          sui: '#4DA2FF',
          aptos: '#202020',
          linea: '#61DFFF',
          blast: '#FCFC03',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.7rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'sm': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['0.875rem', { lineHeight: '1.55', letterSpacing: '0' }],
        'lg': ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'xl': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '2xl': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '3xl': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',   // 6px
        'DEFAULT': '0.5rem', // 8px
        'md': '0.625rem',   // 10px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        'full': '9999px',
      },
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        'DEFAULT': '0 4px 8px -2px rgb(0 0 0 / 0.4)',
        'md': '0 12px 24px -4px rgb(0 0 0 / 0.5)',
        'lg': '0 20px 40px -8px rgb(0 0 0 / 0.6)',
      },
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}