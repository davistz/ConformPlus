import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./pages/login-page.jsx";
import RegisterPage from "./pages/register-page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./pages/users-page.jsx";
import DepartamentoPage from "./pages/departamentos-page.jsx";

import NaoConformidadePage from "./pages/naoconformidades-page.jsx";
import { ThemeProvider } from "./ThemeContext";
import CalendarPage from "./pages/calendar-page.jsx";
import { NotificationProvider } from "./NotificationContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/departamentos",
    element: <DepartamentoPage />,
  },
  {
    path: "/conformidades",
    element: <NaoConformidadePage />,
  },
  {
    path: "/calendario",
    element: <CalendarPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>
);
