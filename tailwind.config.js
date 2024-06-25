/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
}
