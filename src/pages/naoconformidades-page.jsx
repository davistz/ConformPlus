import React from "react";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import { useTheme } from "../ThemeContext";

const NaoConformidadePage = () => {
  const { isDarkMode } = useTheme(); // Obtém o estado do tema

  return (
    <div className={isDarkMode ? "dark-mode flex" : "light-mode flex"}>
      <Header className="" />
      <Home />
    </div>
  );
};

export default NaoConformidadePage;
