const { default: plugin } = require('tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif']
    },
    extend: {
      transitionProperty: {
        'width': 'width' 
      }
    },
  },
  plugins: [
    // plugin(function ({ addUtilities }) {
    //   addUtilities({
    //     '.hide-scrollbar': {
    //       '-ms-overflow-style': 'none',  // IE and Edge 
    //       'scrollbar-width': 'none',  // Firefox

    //       /* Chrome, Safari and Opera */
    //       '&::-webkit-scrollbar': {
    //         display: 'none'
    //       }
    //     }
    //   })
    // })
  ],
}