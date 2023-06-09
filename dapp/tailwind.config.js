/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash')
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        darkBlue: '#060818'
      }
    }
  },

  plugins: [
    plugin(function ({ addComponents, theme }) {
      const components = {
        '.container': {
          maxWidth: theme('columns.7xl'), // max-w-7xl
          marginLeft: 'auto', //mx-auto
          marginRight: 'auto', //mx-auto
          paddingLeft: theme('spacing.4'), //px-4
          paddingRight: theme('spacing.4') //px-4
        }
      }
      addComponents(components)
    }),
    require('@tailwindcss/line-clamp')
  ]
}
