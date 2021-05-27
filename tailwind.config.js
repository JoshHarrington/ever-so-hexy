const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './app/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.scss',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out'
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.625rem',
      '4xl': '1rem',
      '8xl': '1.5rem',
      '12xl': '2rem',
      '16xl': '2.5rem',
      '20xl': '3rem',
      'full': '9999px'
    },
    extend: {
      colors: {
        red: colors.rose,
        green: colors.emerald,
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        teal: {
          ...colors.teal,

          // this approach assumes that tailwind is using 6 letter hex codes
          // depends on tailwind no changing their colour implementation
          '500-a25': `${colors.teal[500]}40`,
          '500-a50': `${colors.teal[500]}80`
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
