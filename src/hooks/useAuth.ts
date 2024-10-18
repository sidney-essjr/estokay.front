import { useContext } from "react";
import { AuthContext } from "../providers/context/authContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthContextProvider");
  }
  return context;
};
