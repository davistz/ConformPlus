import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./pages/login-page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./pages/users-page.jsx";
import DepartamentoPage from "./pages/departamentos-page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
