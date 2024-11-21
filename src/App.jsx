import { Toaster } from "sonner";
import Header from "./components/Header/Header";
import GraficosDetalhados from "./components/Graficos/Graficos";
import { useTheme } from "./ThemeContext";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <Toaster
          toastOptions={{
            style: {
              color: isDarkMode ? "white" : "black",
              background: isDarkMode ? "#333" : "#fff",
            },
          }}
        />
        <div className="flex">
          <Header />
          <GraficosDetalhados />
        </div>
      </div>
    </>
  );
}

export default App;
