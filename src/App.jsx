import { Toaster } from "sonner";

import Header from "./components/Header/Header";
import GraficosDetalhados from "./components/Graficos/Graficos";
import { useTheme } from "./ThemeContext";
import { useEffect } from "react";

function App() {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark-bg", isDarkMode); // Adiciona ou remove a classe
  }, [isDarkMode]);

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            color: "black",
          },
        }}
      />
      <div className="flex">
        <Header />
        <GraficosDetalhados />
      </div>
    </>
  );
}

export default App;
