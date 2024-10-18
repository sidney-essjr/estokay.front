import { ReactNode } from "react";
import { Funcao } from "../common/enums/enumFuncao";
import AuthContextProvider from "../providers/context/authContext";
import ProtectedRoute from "../router/ProtectedRoute";

export default function ProtectedLayout({
  children,
  funcaoRequerida = Funcao.ADMIN,
}: {
  children: ReactNode;
  funcaoRequerida?: Funcao;
}) {
  return (
    <AuthContextProvider>
      <ProtectedRoute funcaoRequerida={funcaoRequerida}>{children}</ProtectedRoute>
    </AuthContextProvider>
  );
}
