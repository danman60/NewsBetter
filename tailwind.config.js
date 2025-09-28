/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sgc-green': '#2c5f41',
        'sgc-blue': '#4472C4',
        'sgc-orange': '#f0ad4e',
        'sgc-red': '#d32f2f',
        'sgc-gold': '#FFD700',
      },
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
        'impact': ['Impact', 'Arial Black', 'sans-serif'],
      },
      fontSize: {
        'newsletter-title': '72px',
        'newsletter-subtitle': '28px',
      }
    },
  },
  plugins: [],
}