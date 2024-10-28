import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";
import { ItemDoacao } from "../types/ItemDoacao";

export async function getLerItemPorTipo(tipo: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/doacoes/buscar-item-por-tipo/${tipo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    let result;

    if (response.ok) {
      result = (await response.json()) as ItemDoacao[];
    }

    return await responseHandler<ItemDoacao[]>(response, { result: result });
  } catch (error) {
    return catchErrorHandler(error);
  }
}
