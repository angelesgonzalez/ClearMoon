/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F9F8FC",
        customPurpleCards: "#13111F",
        customAccent: "#9E75F0",
      },
      fontFamily: {
        exceptional: ["Muttia", "serif"], // Para títulos destacados
        body: ["Poppins", "sans-serif"], // Fuente predeterminada
      },
    },
  },
  plugins: [],
};
