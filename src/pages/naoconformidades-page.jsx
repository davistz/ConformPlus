import React from "react";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import { useTheme } from "../ThemeContext";

const NaoConformidadePage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex w-full ${isDarkMode ? "dark-mode " : "light-mode "}`}>
      <Header className="" />

      <Home />
    </div>
  );
};

export default NaoConformidadePage;
