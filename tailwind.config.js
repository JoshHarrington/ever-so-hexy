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
    extend: {
      colors: {
        red: colors.rose,
        green: colors.emerald
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
