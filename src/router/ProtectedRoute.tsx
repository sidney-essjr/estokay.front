import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Funcao } from "../common/enums/enumFuncao";
import { useAuthContext } from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
  funcaoRequerida = Funcao.ADMIN,
}: {
  children: ReactNode;
  funcaoRequerida?: Funcao;
}) {
  const { data } = useAuthContext();
  const navigate = useNavigate();

  if (data && data.funcao >= funcaoRequerida.valueOf()) {
    return children;
  }

  navigate("/nao-autorizado");
}
