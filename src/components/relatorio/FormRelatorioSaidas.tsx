import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../../assets/svg/Loading";
import {
  getBuscarDistribuicao,
  RelatorioDistribuicao,
} from "../../services/fetchBuscarDistribuicao";
import { Relatorio } from "../../types/relatorio";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectableInput from "../common/SelectableInput";

export default function FormRelatorioSaidas({
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
  const { data, refetch, isRefetching } = useQuery(
    ["distribuicao"],
    () => getBuscarDistribuicao(getValues()),
    { enabled: false }
  );

  useEffect(() => {
    handleDistReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefetching]);

  function handleDistReport() {
    if (data && data?.result && Array.isArray(data.result)) {
      setData(data.result);
    } else {
      setInfoMessage(data?.message);
    }
    setTimeout(() => {
      setInfoMessage("");
    }, 4000);
  }

  function onSubmit() {
    refetch();

    if (!data?.result) {
      setInfoMessage(data?.message);
    }
    setTimeout(() => {
      setInfoMessage("");
    }, 4000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
      <div className="grid md:grid-cols-3 gap-2 shadow-md  sm:p-4 p-2 rounded-sm">
        <Input id="dataInicio" label="Data Inicio" type="date" {...register("dataInicio")} />
        <Input id="dataFim" label="Data Fim" type="date" {...register("dataFim")} />
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
