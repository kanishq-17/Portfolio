/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
  extend: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      sansation: ["Sansation", "sans-serif"],
    },
  },
};
export const plugins = [];
