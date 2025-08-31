/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          indigo: '#4f46e5', // indigo-600
          red: '#ef4444',    // red-500
          green: '#22c55e',  // green-500
        }
      }
    },
  },
  plugins: [],
}
