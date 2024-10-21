import { createBrowserRouter } from "react-router-dom";
import AccessLayout from "../layouts/AccessLayout";
import RootLayout from "../layouts/RootLayout";
import AcessoNaoAutorizadoPage from "../pages/AcessoNaoAutorizadoPage";
import CadastroPage from "../pages/CadastroPage";
import EsqueceuSenhaPage from "../pages/EsqueceuSenhaPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RedefinirSenhaPage from "../pages/RedefinirSenhaPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cadastros",
        element: (
          <ProtectedRoute>
            <CadastroPage />
          </ProtectedRoute>
        ),
      },
      { path: "perfil", element: <ProtectedRoute>Perfil</ProtectedRoute> },
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
    element: <AcessoNaoAutorizadoPage />,
  },
]);

export default router;
