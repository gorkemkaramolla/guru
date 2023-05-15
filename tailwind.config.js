/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(34,38,44)',
        dark2: 'rgb(10,10,10)',
        white: '#ffffff',
        whitebg: 'rgb(245,245,245)',

        transparent: 'transparent',
        current: 'currentColor',
        primary: colors.gray,
        phospor: 'rgba(230, 255, 7, 0.863)',
      },
    },
  },
  plugins: [],
};
