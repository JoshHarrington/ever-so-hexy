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
    extend: {
      colors: {
        red: colors.rose,
        green: colors.emerald,
        blueGray: colors.blueGray,
        coolGray: colors.coolGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
