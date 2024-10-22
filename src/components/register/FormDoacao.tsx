import { useFieldArray, useForm } from "react-hook-form";
import Button from "../common/Button";
import Input from "../common/Input";
import SelectableInput from "../common/SelectableInput";
import { medida, tamanhos, tipos } from "./registerOptions";

export default function FormDoacao() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      doador: {},
      dataEntrada: "",
      doacao: [{ item: "", quantidade: 1, tipo: "", tamanho: "", medida: "", validade: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "doacao",
  });

  return (
    <form noValidate className="flex flex-col space-y-2">
      <div className="grid sm:grid-cols-4 gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm">
        <SelectableInput
          id="doador"
          label="Doador*"
          options={[]}
          className="col-span-2"
          {...register("doador")}
        />
        <Input id="data-entrada" label="Data entrada*" type="date" {...register("dataEntrada")} />
        <Button type="button" variant="neutral">
          Novo
        </Button>
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-logo-gray-color sm:p-4 p-2 rounded-sm"
        >
          <Input
            id={`doacao.${index}.item`}
            label="Item*"
            className="col-span-2"
            {...register(`doacao.${index}.item`)}
          />
          <Input
            id={`doacao.${index}.quantidade`}
            label="Quantidade*"
            type="number"
            min={1}
            max={1000}
            step={1}
            {...register(`doacao.${index}.quantidade`)}
          />
          <SelectableInput
            id={`doacao.${index}.tipo`}
            label="Tipo*"
            options={tipos}
            {...register(`doacao.${index}.tipo`)}
          />
          <SelectableInput
            id={`doacao.${index}.tamanho`}
            label="Tamanho"
            options={tamanhos}
            {...register(`doacao.${index}.tamanho`)}
          />
          <SelectableInput
            id={`doacao.${index}.medida`}
            label="Medida*"
            options={medida}
            {...register(`doacao.${index}.medida`)}
          />
          <Input
            id={`doacao.${index}.validade`}
            label="Validade"
            type="date"
            {...register(`doacao.${index}.validade`)}
          />
          <Button onClick={() => remove(index)}>Remover</Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="neutral"
          onClick={() =>
            append({ item: "", quantidade: 1, tipo: "", tamanho: "", medida: "", validade: "" })
          }
        >
          + item
        </Button>
        <Button type="submit" variant="success">
          Registrar
        </Button>
      </div>
    </form>
  );
}
