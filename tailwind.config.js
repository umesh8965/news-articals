/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        primary: '#4A90E2',
        secondary: '#FFD700',
        // Add more colors as needed
      },
      fontFamily: {
        // Define your custom fonts here
        sans: ['Roboto', 'sans-serif'],
        // Add more fonts as needed
      },
      spacing: {
        // Define your custom spacing here
        '72': '18rem',
        // Add more spacing as needed
      },
    },
  },
  plugins: [],
}

