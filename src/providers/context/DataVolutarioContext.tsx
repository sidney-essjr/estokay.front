import { createContext, ReactNode, useState } from "react";

export type DataVonlutario = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  ativo: boolean;
  funcao: string;
};

type DataVoluntarioContextProps =
  | {
      dataVoluntario: DataVonlutario | object;
      setDataVoluntario: (data: DataVonlutario) => void;
    }
  | object;

export const DataVoluntarioContext = createContext<DataVoluntarioContextProps>({});

export default function DataVoluntarioContextProvider({ children }: { children: ReactNode }) {
  const [dataVoluntario, setDataVoluntario] = useState<DataVonlutario | object>({});

  return (
    <DataVoluntarioContext.Provider value={{ dataVoluntario, setDataVoluntario }}>
      {children}
    </DataVoluntarioContext.Provider>
  );
}
