import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sessionLogin } from "../../common/utils/sessionLogin";

export type AuthDataProps = {
  ativo: boolean;
  documento: string;
  email: string;
  funcao: number;
  id: number;
  nome: string;
  telefone: string;
} | null;

export type AuthContextProviderProps = {
  data: AuthDataProps;
  setData: (data: AuthDataProps) => void;
};

export const AuthContext = createContext<AuthContextProviderProps>({
  data: null,
  setData: () => {},
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AuthDataProps>(null);
  const location = useLocation();

  useEffect(() => {
    async function handleSessionLogin() {
      const response = await sessionLogin();
      if (response?.result) setData(response?.result);
    }
    handleSessionLogin();
  }, [location.pathname]);

  return <AuthContext.Provider value={{ data, setData }}>{children}</AuthContext.Provider>;
}
