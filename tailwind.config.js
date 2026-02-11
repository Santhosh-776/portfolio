/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#06283D',
        'pale-blue': '#DFF6FF',
        'vibrant-blue': '#1363DF',
        'sky-blue': '#47B5FF',
        'slate-light': '#8892b0', // Keeping existing slate colors for neutral text if needed, or can be adjusted later
        'slate-dark': '#495670',
      },
      fontFamily: {
        display: ['Calibre', 'Inter', 'San Francisco', 'SF Pro Text', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
