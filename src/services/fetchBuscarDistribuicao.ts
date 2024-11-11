import { catchErrorHandler } from "../common/utils/errorHandler";
import { responseHandler } from "../common/utils/responseHandler";

export type RelatorioDistribuicao = {
  criado: Date;
  documento: string;
  nomeBeneficiario: string;
  itensDistribuicao: [
    {
      itemEstoque: { descricao: string; categoria: string; tamanho: string; medida: string };
      quantidade: number;
    }
  ];
  voluntario: { nome: string };
};

export async function getDistribuicao(params = {}) {
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/distribuicoes/buscar`);
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
      result = (await response.json()) as RelatorioDistribuicao[];
    }

    return await responseHandler<RelatorioDistribuicao[]>(response, { result: result });
  } catch (error) {
    return catchErrorHandler(error);
  }
}
