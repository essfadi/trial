/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#F59E0B",
        "brand-yellow": "#FBBF24",
        "brand-dark": "#1E293B",
        "brand-gray": "#64748B",
      },
    },
  },
  plugins: [],
};
