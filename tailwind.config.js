/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FBF3EE',
          100: '#F5E1D6',
          200: '#E8C0A8',
          300: '#D99A78',
          400: '#C97A4F',
          500: '#B85C33',
          600: '#A04A28',
          700: '#823A20',
          800: '#5F2C18',
          900: '#3D1D10',
        },
        charcoal: {
          50: '#F4F5F6',
          100: '#E5E7E9',
          200: '#C7CBD0',
          300: '#9BA1A9',
          400: '#6B727C',
          500: '#4A515B',
          600: '#363C44',
          700: '#272C33',
          800: '#1C2025',
          900: '#121519',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
