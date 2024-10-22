import { z } from "zod";

const itemDoacaoValidationSchema = z.object({
  descricao: z.string().trim().min(1, "Campo obrigatório!"),
  tipo: z.string().trim().min(1, "Campo obrigatório!"),
  quantidade: z
    .string()
    .trim()
    .refine((val) => !isNaN(parseInt(val, 10)), { message: "Deve ser um número válido" })
    .transform((val) => parseInt(val, 10)) //Transforma a string em um número.
    .refine((val) => val >= 1 && val <= 1000, { message: "Deve ser entre 1 e 1000" }),
  tamanho: z.string().trim().optional(),
  medida: z.string().trim().min(1, "Campo obrigatório!"),
  validade: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? new Date(val) : null))
    .refine((val) => !val || val >= new Date(), { message: "Produto vencido" })
    .refine((val) => !val || !isNaN(val.getTime()), { message: "Data inválida" }),
});

export const formDoacaoValidationSchema = z.object({
  doador: z.string().trim().min(1, "Campo obrigatório!"),
  dataEntrada: z
    .string()
    .trim()
    .transform((val) => new Date(val))
    .refine((val) => val <= new Date(), { message: "Data inválida" })
    .refine((val) => !isNaN(val.getTime()), { message: "Data inválida" }),
  itens: z.array(itemDoacaoValidationSchema).min(1, "Nenhum item vinculado"),
});

export type FormDoacaoFields = z.infer<typeof formDoacaoValidationSchema>;
