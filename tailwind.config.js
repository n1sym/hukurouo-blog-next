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
        'xs': '.7rem',
        'tiny': '.8rem',
      },
      borderWidth: {
        '6': '6px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
