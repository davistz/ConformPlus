import Header from "../components/Header/Header";
import Users from "../components/UsersPage";
import { useTheme } from "../ThemeContext";

const UsersPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark-mode flex" : "light-mode flex"}>
      <Header />
      <Users />
    </div>
  );
};

export default UsersPage;
