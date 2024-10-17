import { createBrowserRouter } from "react-router-dom";
import AccessLayout from "../layouts/AccessLayout";
import EsqueceuSenhaPage from "../pages/EsqueceuSenhaPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RedefinirSenhaPage from "../pages/RedefinirSenhaPage";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "",
    children: [
      { index: true, element: <HomePage /> },
      { path: "cadastros", element: "cadastros" },
      { path: "perfil", element: "perfil" },
    ],
  },
  {
    path: "/access",
    element: <AccessLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "esqueceu-senha",
        element: <EsqueceuSenhaPage />,
      },
      {
        path: "redefinir-senha",
        element: <RedefinirSenhaPage />,
      },
    ],
  },
  {
    path: "/nao-autorizado",
    element: "",
  },
]);

export default router;
