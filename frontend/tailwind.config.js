
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveCCTV :{
          "0%": {
            transform: "rotate(-40deg)",
          },
          "50%":{
            transform: "rotate(5deg)",
          },
          "100%":{
            transform: "rotate(20deg)",
          }
        },
        ping: {
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        moveCCTV: "moveCCTV 10s linear infinite alternate  ",
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontFamily:{
        'poppins': ['Poppins', 'sans-serif'],
        'madimi': ['Madimi One', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'passion': ['Passion One', 'sans-serif'],
        'afacad': ['Afacad', 'sans-serif'],
        'belanosima': ['Belanosima', 'sans-serif'],
        'mukta':['Mukta', 'sans-serif'],
        'yatra':['Yatra One', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
