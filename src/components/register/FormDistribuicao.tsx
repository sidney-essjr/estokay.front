import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "../../assets/svg/Loading";
import {
  FormDistribuicaoFields,
  formDistribuicaoValidationSchema,
} from "../../common/validations/formDistribuicaoValidationSchema";
import { tipos } from "../../data/registerOptions";
import { postCriarDistribuicao } from "../../services/fetchCriarDistribuicao";
import { getLerItemPorTipo } from "../../services/fetchLerItemPorTipo";
import { ItemDoacao } from "../../types/ItemDoacao";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectableInput from "../common/SelectableInput";
import { ItemDistribuicao } from "./DistribuicaoContainer";

export default function FormDistribuicao({
  itens,
  setItens,
}: {
  itens: ItemDistribuicao[];
  setItens: Dispatch<SetStateAction<ItemDistribuicao[]>>;
}) {
  const [infoMessage, setInfoMessage] = useState("");
  const {
    register,
    reset,
    getValues,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDistribuicaoFields>({
    resolver: zodResolver(formDistribuicaoValidationSchema),
  });

  const tipo = useWatch<FormDistribuicaoFields>({ control, name: "tipo" });
  const [itensPorTipo, setItensPorTipo] = useState<ItemDoacao[]>([]);
  const queryClient = useQueryClient();
  const mutation = useMutation(postCriarDistribuicao, {
    onSuccess: () => {
      queryClient.invalidateQueries("itensDoacao");
    },
  });
  const [quantidadePorItem, setQuantidadePorItem] = useState<{ value: number; desc: string }[]>([]);
  useQuery(["itensDoacao", tipo], () => getLerItemPorTipo(String(tipo)), {
    enabled: !!tipo,
    onSuccess: (data) => {
      setItensPorTipo(
        typeof data.result === "object" ? data.result.filter((item) => item.quantidade > 0) : []
      );
    },
  });

  function changeQuantity(e: HTMLSelectElement["value"]) {
    const id = Number(e.split(" ")[0]);
    const quantidade = itensPorTipo.find((item) => item.id === id)?.quantidade;
    if (quantidade && !isNaN(quantidade)) {
      const options = [];
      for (let index = 1; index <= quantidade; index++) {
        options.push({ value: index, desc: String(index) });
      }
      setQuantidadePorItem(options);
    }
  }

  function addItem() {
    const { tipo, descricao, quantidade } = getValues();

    if (tipo && descricao && quantidade) {
      const id = Number(descricao.split(" ")[0]);
      if (!itens.find((item) => item.id === id)) {
        setItens((prev) => [...prev, { id, tipo, descricao, quantidade }]);
      } else {
        setInfoMessage(
          "Objeto ja consta na lista de itens, para alterar a quantidade remova e adicione novamente"
        );
        setTimeout(() => {
          setInfoMessage("");
        }, 4000);
      }
    }
  }

  async function onSubmit(data: FormDistribuicaoFields) {
    if (itens.length === 0) {
      setInfoMessage("Nenhum item selecionado");
      return;
    }
    const response = await mutation.mutateAsync({
      nome: data.nome,
      documento: data.documento,
      itemDistribuicao: itens.map((item) => ({
        itemDoacao: item.id,
        quantidade: Number(item.quantidade),
      })),
    });

    setInfoMessage(response.message);

    setTimeout(() => {
      setInfoMessage("");
      if (response.result) {
        reset();
        setItens([]);
      }
    }, 4000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm">
        <Input
          className="flex-1"
          id="nome"
          label="Nome beneficiário*"
          error={errors.nome?.message}
          {...register("nome")}
        />
        <Input
          id="documento"
          label="Documento*"
          error={errors.documento?.message}
          {...register("documento")}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 border border-logo-gray-color sm:p-4 p-2 rounded-sm">
        <SelectableInput
          id={"tipo"}
          label="Tipo*"
          options={tipos}
          error={errors.tipo?.message}
          {...register("tipo")}
        />
        <SelectableInput
          id={"descricao"}
          className="lg:col-span-2"
          label="Descrição*"
          options={itensPorTipo.map((item) => ({
            value: `${item.id} ${item.descricao}`,
            desc: item.descricao,
          }))}
          error={errors.descricao?.message}
          {...register("descricao")}
          onChange={(e) => changeQuantity(e.currentTarget.value)}
        />
        <SelectableInput
          id={"quantidade"}
          label="Quantidade*"
          options={quantidadePorItem}
          error={errors.quantidade?.message}
          {...register("quantidade")}
        />

        <Button
          className="w-full lg:col-span-1 lg:w-auto"
          variant="neutral"
          type="button"
          onClick={() => addItem()}
        >
          Add
        </Button>
      </div>
      <Button className="w-full" type="submit" variant="success" disabled={isSubmitting}>
        {isSubmitting ? <Loading /> : "Registrar"}
      </Button>
      {infoMessage !== "" ? (
        <p className="h-9 text-center text-sm text-detail-color">{infoMessage}</p>
      ) : (
        <p className="h-9 "></p>
      )}
    </form>
  );
}
