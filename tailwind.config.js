/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hugo_stats.json", "./layouts/**/*.{html,js}", "./content/**/*.md", "assets/js/**/*.js"],
  darkMode: ["class"],
  theme:{
    extend: {},
    fontFamily: {
      EduNSWACTFoundation:["EduNSWACTFoundation"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
