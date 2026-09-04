/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        // prevent anything > 8px
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
        full: '9999px',
      },
      colors: {
        surface: {
          50: '#fbfcfd',
          100: '#f7f8fa',
          200: '#f1f3f5',
          300: '#e5e7eb',
        },
        border: {
          light: '#f0f1f3',
          DEFAULT: '#e5e7eb',
          dark: '#d1d5db',
        },
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          900: '#0f172a',
          950: '#090d16',
        }
      }
    },
  },
  plugins: [],
}
