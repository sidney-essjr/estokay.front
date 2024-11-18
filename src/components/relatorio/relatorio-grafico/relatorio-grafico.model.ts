import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueries } from "react-query";
import { IGetDistribuicao, RelatorioDistribuicao } from "../../../services/fetchBuscarDistribuicao";
import { IGetDoacao, RelatorioDoacoes } from "../../../services/fetchBuscarDoacao";
import { Relatorio } from "../../../types/relatorio";
import calcRegistrosPorCategoriaEntrada from "./utils/registros-por-categoria-entrada";
import calcRegistrosPorCategoriaSaida from "./utils/registros-por-categoria-saida";
import calcRegistrosPorMes from "./utils/registros-por-mes";
import calcRegistrosPorUF from "./utils/registros-por-uf";

type RelatorioGraficoProps = {
  getDistribuicao: IGetDistribuicao;
  getDoacoes: IGetDoacao;
};

const useRelatorioGraficoModel = ({ getDistribuicao, getDoacoes }: RelatorioGraficoProps) => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { isSubmitting },
  } = useForm<Relatorio>();
  const [registrosPorMesEntrada, setRegistrosPorMesEntrada] = useState<Record<string, number>>();
  const [registrosPorCategoriaEntrada, setRegistrosPorCategoriaEntrada] =
    useState<Map<string, number>>();
  const [registrosPorUfEntrada, setRegistrosPorUfEntrada] = useState<Map<string, number>>();
  const [registrosTotaisEntrada, setRegistrosTotaisEntrada] = useState<number>(0);
  const [registrosPorMesSaida, setRegistrosPorMesSaida] = useState<Record<string, number>>();
  const [registrosPorCategoriaSaida, setRegistrosPorCategoriaSaida] =
    useState<Map<string, number>>();
  const [registrosTotaisSaida, setRegistrosTotaisSaida] = useState<number>(0);

  const [doacoes, distribuicoes] = useQueries([
    {
      queryKey: ["doador"],
      queryFn: () => getDoacoes.exec(getValues()),
      enabled: false,
      onSuccess: handleGraphDataEntrada,
    },
    {
      queryKey: ["itensDoacao"],
      queryFn: () => getDistribuicao.exec(getValues()),
      enabled: false,
      onSuccess: handleGraphDataSaida,
    },
  ]);

  function handleGraphDataEntrada(data: RelatorioDoacoes[]) {
    const dates = data?.map((d) => d.dataEntrada) || [];
    const itensDoacao = data?.map((m) => m.itens) || [];
    const registrosPorMes = calcRegistrosPorMes(dates);
    const registrosPorCategoria = calcRegistrosPorCategoriaEntrada(itensDoacao);
    const registrosPorUF = calcRegistrosPorUF(data || []);
    const itensTotal = data?.length;
    setRegistrosPorMesEntrada(registrosPorMes);
    setRegistrosTotaisEntrada(itensTotal);
    setRegistrosPorCategoriaEntrada(registrosPorCategoria);
    setRegistrosPorUfEntrada(registrosPorUF);
  }

  function handleGraphDataSaida(data: RelatorioDistribuicao[]) {
    const dates = data?.map((d) => d.criado) || [];
    const itensDistribuicao = data?.map((m) => m.itensDistribuicao) || [];
    const registrosPorMes = calcRegistrosPorMes(dates);
    const registrosPorCategoria = calcRegistrosPorCategoriaSaida(itensDistribuicao);
    const itensTotal = data?.length;
    setRegistrosPorMesSaida(registrosPorMes);
    setRegistrosTotaisSaida(itensTotal);
    setRegistrosPorCategoriaSaida(registrosPorCategoria);
  }

  function onSubmit() {
    doacoes.refetch();
    distribuicoes.refetch();
  }

  return {
    handleSubmit,
    register,
    isSubmitting,
    onSubmit,
    doacoes,
    distribuicoes,
    registrosPorMesEntrada,
    registrosPorCategoriaEntrada,
    registrosPorUfEntrada,
    registrosTotaisEntrada,
    registrosPorMesSaida,
    registrosPorCategoriaSaida,
    registrosTotaisSaida,
  };
};

export default useRelatorioGraficoModel;
