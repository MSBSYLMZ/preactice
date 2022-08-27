/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-black': "#04060E",
        "navy-blue": "#070D18",
        "brown": "#262420",
        "orange": "#FEBE58",
        "purple": "#EE94D6",
        "pink" : "#F6C9EA",
        "gray": "#ACACAC",
        "white" :"#FDFDFD",
        "red": "#AA0000"
      }
    },
  },
  plugins: [],
}

//FF6F61
