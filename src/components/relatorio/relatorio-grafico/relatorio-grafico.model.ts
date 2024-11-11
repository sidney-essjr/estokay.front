import { useForm } from "react-hook-form";
import { useQueries } from "react-query";
import { getDistribuicao } from "../../../services/fetchBuscarDistribuicao";
import { getDoacao } from "../../../services/fetchBuscarDoacao";
import { Relatorio } from "../../../types/relatorio";

const useRelatorioGraficoModel = () => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { isSubmitting },
  } = useForm<Relatorio>();

  const [doacoes,  distribuicoes] = useQueries([
    { queryKey: ["doador"], queryFn: () => getDoacao(getValues()), enabled: false },
    { queryKey: ["itensDoacao"], queryFn: () => getDistribuicao(getValues), enabled: false },
  ]);

  function onSubmit() {
    doacoes.refetch();
    distribuicoes.refetch();
  }

  return {
    handleSubmit,
    getValues,
    register,
    isSubmitting,
    onSubmit,
    doacoes,
    distribuicoes,
  };
};

export default useRelatorioGraficoModel;
