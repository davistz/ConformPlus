import MyCalendar from "../components/CalendarPage/CalendarPage";
import Header from "../components/Header/Header";
import { useTheme } from "../ThemeContext";

const CalendarPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark-mode flex" : "light-mode flex"}>
      <Header />

      <MyCalendar />
    </div>
  );
};

export default CalendarPage;
