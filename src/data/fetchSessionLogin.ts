import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";
import { AuthDataProps } from "../providers/context/authContext";

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
      result = (await response.json()) as AuthDataProps;
    }

    return await responseHandler<AuthDataProps>(response, { result: result });
  } catch (error) {
    return catchErrorHandler(error);
  }
}
