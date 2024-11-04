import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../../assets/svg/Loading";
import { movimentacao } from "../../data/registerOptions";
import {
  getBuscarDistribuicao,
  RelatorioDistribuicao,
} from "../../services/fetchBuscarDistribuicao";
import { Relatorio } from "../../types/relatorio";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectableInput from "../common/SelectableInput";

export default function FormRelatorio({
  setData,
}: {
  setData: Dispatch<SetStateAction<RelatorioDistribuicao[]>>;
}) {
  const {
    handleSubmit,
    getValues,
    register,
    formState: { isSubmitting },
  } = useForm<Relatorio>();
  const [infoMessage, setInfoMessage] = useState("");
  const {
    data: dataDist,
    refetch: refetchDist,
    isRefetching,
  } = useQuery(["distribuicao"], () => getBuscarDistribuicao(getValues()), {
    enabled: false,
  });

  useEffect(() => {
    handleDistReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDist]);

  function handleDistReport() {
    if (dataDist && dataDist?.result && Array.isArray(dataDist.result)) {
      setData(dataDist.result);
    } else {
      setInfoMessage(dataDist?.message);
    }
    setTimeout(() => {
      setInfoMessage("");
    }, 4000);
  }

  function onSubmit(formData: Relatorio) {
    switch (formData.movimentacao.toUpperCase()) {
      case "ENTRADA":
        break;
      case "SAIDA":
        refetchDist();
        break;
      default:
        setInfoMessage("Selecione a movimentação");
        setTimeout(() => {
          setInfoMessage("");
        }, 4000);
        break;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm">
        <Input id="dataInicio" label="Data Inicio" type="date" {...register("dataInicio")} />
        <Input id="dataFim" label="Data Fim" type="date" {...register("dataFim")} />
        <SelectableInput
          id="movimentacao"
          label="Movimentação"
          options={movimentacao}
          {...register("movimentacao")}
        />
        <SelectableInput
          id="voluntario"
          label="Voluntário"
          options={[]}
          {...register("voluntario")}
        />
      </div>
      <div className="md:col-span-2 lg:col-span-4 flex flex-col-reverse md:flex-row">
        {infoMessage !== "" ? (
          <p className="h-9 md:flex-1 pt-3 text-center text-sm text-detail-color">{infoMessage}</p>
        ) : (
          <p className="h-9 md:flex-1"></p>
        )}
        <Button
          className="w-full md:w-[118px]"
          type="submit"
          variant="neutral"
          disabled={isSubmitting}
        >
          {isSubmitting || isRefetching ? <Loading /> : "Consultar"}
        </Button>
      </div>
    </form>
  );
}
