import { postSessionLogin } from "../../data/fetchSessionLogin";
import { decodeToken } from "./decodeToken";
import Cookies from "js-cookie";

export async function sessionLogin() {
  let decoded: {
    id: string;
    nome: string;
    email: string;
  } | null;

  const token = Cookies.get("accessToken");

  if (token) {
    const response = await postSessionLogin();
    if (response) {
      decoded = decodeToken(token);
      return decoded;
    }
  }
  return null;
}
