/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cipherra-primary': '#00ffaa',
        'cipherra-secondary': '#0126A0',
        'cipherra-blue': '#0126A0',
        'cipherra-blue-dark': '#011a7a',
        'cipherra-blue-light': '#e6edff',
        'cipherra-blue-lighter': '#f0f4ff',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

