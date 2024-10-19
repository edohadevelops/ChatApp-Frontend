/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,jsx}',
    './components/**/*.{html,jsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat-pattern': "url('/img/chat-bg.jpg')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

