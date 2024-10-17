import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";

export async function postSessionLogin() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/session-login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await responseHandler(response);
  } catch (error) {
    return catchErrorHandler(error);
  }
}