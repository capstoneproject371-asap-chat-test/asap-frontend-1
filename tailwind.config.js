/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  prefix: 'tw-',
  important: true,
  corePlugins: {
    preflight: false,
  },
}
