/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eab308',
        secondary: '#60a5fa',
        text: '#0c0a09',
        text_sec: '#172554',
      },
    },
  },
  plugins: [],
}