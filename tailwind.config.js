module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'link-blue': '#3c62a8',
        'green-h3': '#75b88e',
      },
      fontSize: {
        'xs': '.75rem',
        'tiny': '.8rem',
      },
      borderWidth: {
        '6': '6px',
      },
      padding: {
        'tiny': '3.3px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
