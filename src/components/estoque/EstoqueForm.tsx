import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../../assets/svg/Loading";
import { categorias, tamanhos } from "../../data/registerOptions";
import { getBuscarItensEstoque } from "../../services/fetchBuscarItensEstoque";
import { ItemDoacao } from "../../types/ItemDoacao";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectableInput from "../common/SelectableInput";

type FormEstoque = {
  categoria: string;
  descricao: string;
  tamanho: string;
  validade: Date;
};

export default function EstoqueForm({
  setData,
}: {
  setData: Dispatch<SetStateAction<ItemDoacao[]>>;
}) {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormEstoque>();
  const [infoMessage, setInfoMessage] = useState("");

  const { data, refetch, isRefetching } = useQuery(
    ["itensDoacao"],
    () => getBuscarItensEstoque(getValues()),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (data && data?.result && Array.isArray(data.result) && data.result.length > 0) {
      setData(data.result);
      reset();
    } else {
      setInfoMessage(data?.message);
    }
    setTimeout(() => {
      setInfoMessage("");
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function onSubmit() {
    refetch();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid md:grid-cols-3 gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm">
        <SelectableInput
          id="categoria"
          label="Categoria"
          options={categorias}
          {...register("categoria")}
        />
        <Input
          className="md:col-span-2"
          id="descricao"
          label="Descricao"
          {...register("descricao")}
        />
        <SelectableInput id="tamanho" label="Tamanho" options={tamanhos} {...register("tamanho")} />
        <Input id="validade" label="Valido até" type="date" {...register("validade")} />
        <Button
          className="w-full md:w-auto"
          type="submit"
          variant="neutral"
          disabled={isSubmitting}
        >
          {isSubmitting || isRefetching ? <Loading /> : "Consultar"}
        </Button>
      </div>
      {infoMessage !== "" ? (
        <p className="h-9 pt-3 text-center text-sm text-detail-color">{infoMessage}</p>
      ) : (
        <p className="h-9"></p>
      )}
    </form>
  );
}
