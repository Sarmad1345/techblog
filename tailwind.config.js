/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-blue': '#2563eb',
        'premium-dark': '#1e293b',
      },
    },
  },
  plugins: [],
}

