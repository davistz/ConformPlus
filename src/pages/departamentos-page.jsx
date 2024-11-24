import DepartamentosPage from "../components/DepartamentoPage";
import Header from "../components/Header/Header";
import { useTheme } from "../ThemeContext";

const DepartamentoPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark-mode flex" : "light-mode flex"}>
      <Header />

      <DepartamentosPage />
    </div>
  );
};

export default DepartamentoPage;
