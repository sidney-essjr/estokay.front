import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult } from "react-query";
import Loading from "../../assets/svg/Loading";
import {
  FormDoacaoFields,
  formDoacaoValidationSchema,
} from "../../common/validations/formDoacaoValidationSchema";
import { Doador } from "../../types/doador";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectableInput from "../common/SelectableInput";
import { medida, tamanhos, tipos } from "./registerOptions";

export default function FormDoacao({
  query,
  openModal,
}: {
  query: UseQueryResult<{
    result: boolean | Doador[];
    message: string;
  }>;
  openModal: (open: boolean) => void;
}) {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormDoacaoFields>({
    resolver: zodResolver(formDoacaoValidationSchema),
    defaultValues: {
      doador: undefined,
      dataEntrada: undefined,
      itens: [
        {
          descricao: undefined,
          quantidade: undefined,
          tipo: undefined,
          tamanho: "N/A",
          medida: undefined,
          validade: undefined,
        },
      ],
    },
  });
  const data = typeof query.data?.result === "object" ? query.data?.result : [];
  const [fetchInfo, setFetchInfo] = useState("");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  async function onSubmit() {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col space-y-2 ">
      <div className="grid sm:grid-cols-4 gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm">
        <SelectableInput
          id="doador"
          label="Doador*"
          options={data.map((doador) => ({ value: doador.id, desc: doador.nome }))}
          className="col-span-2"
          error={errors.doador?.message}
          {...register("doador")}
        />
        <Input
          id="data-entrada"
          label="Data entrada*"
          type="date"
          error={errors.dataEntrada?.message}
          {...register("dataEntrada")}
        />
        <Button onClick={() => openModal(true)} type="button" variant="neutral">
          Novo
        </Button>
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm"
        >
          <Input
            id={`itens.${index}.descricao`}
            label="Descricao*"
            className="col-span-2"
            error={errors?.itens?.[index]?.descricao?.message}
            {...register(`itens.${index}.descricao`)}
          />
          <Input
            id={`itens.${index}.quantidade`}
            label="Quantidade*"
            type="number"
            min={1}
            max={1000}
            error={errors?.itens?.[index]?.quantidade?.message}
            {...register(`itens.${index}.quantidade`)}
          />
          <SelectableInput
            id={`itens.${index}.tipo`}
            label="Tipo*"
            options={tipos}
            error={errors?.itens?.[index]?.tipo?.message}
            {...register(`itens.${index}.tipo`)}
          />
          <SelectableInput
            id={`itens.${index}.tamanho`}
            label="Tamanho"
            options={tamanhos}
            error={errors?.itens?.[index]?.tamanho?.message}
            {...register(`itens.${index}.tamanho`)}
          />
          <SelectableInput
            id={`itens.${index}.medida`}
            label="Medida*"
            options={medida}
            error={errors?.itens?.[index]?.medida?.message}
            {...register(`itens.${index}.medida`)}
          />
          <Input
            id={`itens.${index}.validade`}
            label="Validade"
            type="date"
            error={errors?.itens?.[index]?.validade?.message}
            {...register(`itens.${index}.validade`)}
          />
          <Button onClick={() => remove(index)}>Remover</Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="neutral"
          onClick={() =>
            append({
              descricao: "",
              quantidade: "1",
              tipo: "",
              tamanho: undefined,
              medida: "",
              validade: undefined,
            })
          }
        >
          + item
        </Button>
        <Button type="submit" variant="success" disabled={isSubmitting}>
          {isSubmitting ? <Loading /> : "Registrar"}
        </Button>
      </div>
      {fetchInfo !== "" ? (
        <p className="h-9 pt-9 text-center text-sm text-detail-color">{fetchInfo}</p>
      ) : errors.itens?.message ? (
        <p className="h-9 pt-9 text-center text-sm text-detail-color">{errors.itens?.message}</p>
      ) : (
        <p className="h-9 pt-9"></p>
      )}
    </form>
  );
}
