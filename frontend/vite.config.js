/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#014d2f",
          green: "#16a34a",
          yellow: "#facc15",
          red: "#ef4444",
        },
      },
    },
  },
  plugins: [],
}