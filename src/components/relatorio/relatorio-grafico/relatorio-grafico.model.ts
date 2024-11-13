import { useForm } from "react-hook-form";
import { useQueries } from "react-query";
import { IGetDistribuicao } from "../../../services/fetchBuscarDistribuicao";
import { getDoacao } from "../../../services/fetchBuscarDoacao";
import { Relatorio } from "../../../types/relatorio";

type RelatorioGraficoProps = {
  getDistribuicao: IGetDistribuicao;
};

const useRelatorioGraficoModel = ({ getDistribuicao }: RelatorioGraficoProps) => {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { isSubmitting },
  } = useForm<Relatorio>();

  const [doacoes, distribuicoes] = useQueries([
    { queryKey: ["doador"], queryFn: () => getDoacao(getValues()), enabled: false },
    { queryKey: ["itensDoacao"], queryFn: () => getDistribuicao.exec(getValues()), enabled: false },
  ]);

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
  };
};

export default useRelatorioGraficoModel;
