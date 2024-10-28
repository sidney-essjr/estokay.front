import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";
import { DataVonlutario } from "../providers/context/DataVolutarioContext";

export async function postSessionLogin() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/session-login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result;

    if (response.ok) {
      result = (await response.json()) as DataVonlutario;
    }

    return await responseHandler<DataVonlutario>(response, { result: result });
  } catch (error) {
    return catchErrorHandler(error);
  }
}
