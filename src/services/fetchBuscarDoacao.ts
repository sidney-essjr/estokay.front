import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";

export type RelatorioDoacoes = {
  dataEntrada: Date;
  doador: {
    nome: string;
    cidade: string;
    estado: string;
  };
  itens: [{ quantidade: number; descricao: string; medida: string; tamanho: string }];
  voluntario: {
    nome: string;
  };
};

export async function getBuscarDoacao(params = {}) {
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/doacoes/buscar`);
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    let result;

    if (response.ok) {
      result = (await response.json()) as RelatorioDoacoes[];
    }

    return await responseHandler<RelatorioDoacoes[]>(response, { result: result });
  } catch (error) {
    return catchErrorHandler(error);
  }
}
