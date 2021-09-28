module.exports = {
  mode: 'jit',
  purge: [
    "./client/*.html",
    "./client/*.{js,jsx,ts,tsx,vue}",
    "./imports/ui/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // fontFamily: {
    //   display: ['Comfortaa', 'sans-serif'],
    //   body: ['Comfortaa', 'sans-serif'],
    // },
    // extend: {
    //   colors: {
    //     'light-blue': colors.lightBlue,
    //     cyan: colors.cyan,
    //   },
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};