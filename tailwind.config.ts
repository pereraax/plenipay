import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Habilita dark mode via classe
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          midnight: '#0D1B2A',
          royal: '#1B263B',
          aqua: '#00C2FF',
          white: '#FFFFFF',
          clean: '#E6E6E6',
        },
        primary: {
          DEFAULT: '#00C2FF',
          50: '#E6F7FF',
          100: '#B3E5FF',
          200: '#80D3FF',
          300: '#4DC1FF',
          400: '#1AAFFF',
          500: '#00C2FF',
          600: '#0099CC',
          700: '#007099',
          800: '#004D66',
          900: '#002A33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        display: '300', // Light como padrão para font-display (muito leve)
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

