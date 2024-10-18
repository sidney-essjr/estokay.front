import { createBrowserRouter } from "react-router-dom";
import AccessLayout from "../layouts/AccessLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import RootLayout from "../layouts/RootLayout";
import EsqueceuSenhaPage from "../pages/EsqueceuSenhaPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RedefinirSenhaPage from "../pages/RedefinirSenhaPage";
import AuthContextProvider from "../providers/context/authContext";
import AcessoNaoAutorizadoPage from "../pages/AcessoNaoAutorizadoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <RootLayout />
      </AuthContextProvider>
    ),
    errorElement: "",
    children: [
      { index: true, element: <HomePage /> },
      { path: "cadastros", element: <ProtectedLayout>Cadastros</ProtectedLayout> },
      { path: "perfil", element: <ProtectedLayout>Perfil</ProtectedLayout> },
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
