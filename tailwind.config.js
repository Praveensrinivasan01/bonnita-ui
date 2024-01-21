/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/theme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui(),
    require('flowbite/plugin')
  ],
}

