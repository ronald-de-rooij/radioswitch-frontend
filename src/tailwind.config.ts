/** @type {import("tailwindcss").Config} */
import tailwindForms from '@tailwindcss/forms'
import primeui from 'tailwindcss-primeui'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': '#0ea5e9',
          'inverse': '#FFFFFF',
          'hover': '#0284c7',
          'emphasis': '#0284c7',
          'active-color': '#38bdf8',
          'contrast': '#FFFFFF',
          '50': '#f0f9ff',
          '100': '#e0f2fe',
          '200': '#bae6fd',
          '300': '#7dd3fc',
          '400': '#38bdf8',
          '500': '#0ea5e9',
          '600': '#0284c7',
          '700': '#0369a1',
          '800': '#075985',
          '900': '#0c4a6e',
          '950': '#082f49',
        },
        surface: {
          DEFAULT: '#52525B',
          ground: '#121826',
          card: '#212936',
          0: '#FFFFFF',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      animation: {
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md',
    'presets/**/*.{js,vue,ts}', // for PrimeVue
  ],
  plugins: [primeui, tailwindForms],
  safelist: ['p-2', 'text-sm'],
}
