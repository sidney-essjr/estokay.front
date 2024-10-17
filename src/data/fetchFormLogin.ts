/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormLoginFields } from "../common/validations/formLoginValidationSchema";

export async function postLogin(data: FormLoginFields) {
  try {
    await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return { result: true, message: "" };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Failed to fetch") {
        return {
          result: false,
          message:
            "Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.",
        };
      }

      return {
        result: false,
        message: error.message,
      };
    }
    return {
      result: false,
      message:
        "Tivemos um problema para completar sua solicitação, estamos verificando a situação!",
    };
  }
}
