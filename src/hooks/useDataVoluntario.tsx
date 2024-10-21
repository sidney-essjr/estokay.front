import { useContext } from "react";
import { DataVoluntarioContext } from "../providers/context/DataVolutarioContext";

export function useDataVoluntario() {
  const context = useContext(DataVoluntarioContext);

  if (!context) {
    console.error("DataVoluntarioContext deve envolver os filhos que o utilizam");
    return null; // ou um valor padrão apropriado
  }

  return context;
}
