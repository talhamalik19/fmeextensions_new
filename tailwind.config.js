/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#E47143',
        secondaryColor: '#fff',
        titleColor: '#141414',
        textColor: '#686868',
        primaryBg: '#e4eef6',
        highlightedColor: '#EC6737',
        sectionBg: '#FFF7F2',
      },
      fontFamily:{
        titleFont:['Sarabun', 'sans-serif'],
        textFont:['Roboto', 'sans-serif']
      },
      screens:{
        '2xl':'1400'
      }
    },
  },
  plugins: [],
}