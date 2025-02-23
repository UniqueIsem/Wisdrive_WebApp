/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Colores del tema de Flutter
        blackPurple: "#150016",
        deepPurple: "#29104A",
        purple: "#522C5D",
        whiteCream: "#FFE3D8",
        grayCream: "#e0c7bc",
        royalPurple: "#76007C",
        violet: "#9747FF",

        // Colores del gradiente
        darkPurple: "#281845",
        mediumPurple: "#512A80",
        lightPurple: "#8A52C3",
      },

      backgroundImage: {
        'gradient-bg': 'linear-gradient(to bottom, #281845, #512A80, #8A52C3)',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
