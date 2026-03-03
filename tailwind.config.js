/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'gardenz-white': '#F5F5E9',
        'gardenz-green': '#38761D',
        'gardenz-terra': '#E0A96B',
        'gardenz-black': '#1A1A1A',
        'gardenz-dark': '#202020',
        'gardenz-magenta': '#FF00FF',
        'gardenz-cyan': '#00FFFF',
        'lab-pass': '#00FF41',
      }
    },
  },
  plugins: [],
}
