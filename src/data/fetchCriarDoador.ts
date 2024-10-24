import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";
import { Doador } from "../types/doador";

export async function postCriarDoador(data: Doador) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/doadores`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await responseHandler(response, { message: "E-mail enviado com sucesso!" });
  } catch (error) {
    return catchErrorHandler(error);
  }
}
