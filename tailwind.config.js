/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      // fontsFamily: {
      //   "Kumbh Sans": "Kumbh Sans", "serif"
      // },
      colors: {
        customOrange: "hsl(26, 100%, 55%)",
        PaleOrange: "hsl(25, 100%, 94%)",
        veryDarkBlue: "hsl(220, 13%, 13%)",
        darkGrayishBlue: "hsl(219, 9%, 45%)",
        grayishBlue: "hsl(220, 14%, 75%)",
        lightGrayishBlue: "hsl(223, 64%, 98%)",
        customwhite: "hsl(0, 0%, 100%)",
        blackOpacity: "hsl(0, 0%, 0%)",
      },
      // boxShadow: {},
    },
  },
  plugins: [],
};
