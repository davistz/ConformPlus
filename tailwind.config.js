// tailwind.config.js
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import forms from "@tailwindcss/forms"; // Importa o plugin usando a sintaxe ES6

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
    variants: {
      extend: {
        placeholder: ["responsive"], // Adicione isso se não estiver habilitado
      },
    },
  },
  plugins: [
    react(),
    svgr(),
    forms, // Adiciona o plugin à lista de plugins
  ],
};
