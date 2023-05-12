/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
      },
    },
  },
  plugins: [typography()],
};
