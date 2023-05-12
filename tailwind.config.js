/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
      },
    },
  },
  plugins: [typography()],
};
