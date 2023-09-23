/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#020648",
        secondary: "#276221",
        orange: "#F24726",
        textcolor: "#55575F",
        orangehover: "#a12911",
        adminbg: "#FBFBFF",
        title: "#1E202B",
        dark: "#1B242F",
        lightdark: "#262F38",
      },
    },
  },
  plugins: [],
};
