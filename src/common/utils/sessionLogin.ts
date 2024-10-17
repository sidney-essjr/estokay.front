import { postSessionLogin } from "../../data/fetchSessionLogin";
import { decodeToken } from "./decodeToken";
import Cookies from "js-cookie";

export async function sessionLogin() {
  const response = await postSessionLogin();

  if (response) {
    const token = Cookies.get("accessToken");
    let decoded: {
      id: string;
      nome: string;
      email: string;
    } | null;
    if (token) {
      decoded = decodeToken(token);
      return decoded;
    }
  }
  return null;
}
