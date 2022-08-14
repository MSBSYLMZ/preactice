/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#001125',
        'main-black': "#04060E",
        "yellow": "#7EF300",
        "white" :"#FDFDFD",
        "grey": "#ACACAC",
        "blue": "#42A0F8",
        "navy-blue": "#001125",
        "dark-grey" : "#070D18",
        "red": "#AA0000"
      }
    },
  },
  plugins: [],
}
