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
        // VibeFarsi CSS variable tokens for dark/light themes
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",

        // Ultra-minimal palette - preserved for backward compatibility
        bg: '#080808',
        fg: '#FFFFFF',
        fgMuted: '#A3A3A3',
        fgSubtle: '#737373',
        accentHover: '#059669',
        accentSoft: 'rgba(16, 185, 129, 0.12)',
        accentRing: 'rgba(16, 185, 129, 0.3)',
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
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        'full': '9999px',
        'control': '9999px',
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
