import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const ContatoSchema = z
  .object({
    nome: z.string({ required_error: "O campo Nome é obrigatório" }).trim().transform(capitalizeWords),
    email: z.string().trim().email("O campo E-mail inválido"),
    telefone: z.string().trim().transform(onlyNumbers),
    mensagem: z.string({ required_error: "O campo Mensagem é obrigatório" }).trim(),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.telefone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O campo E-mail é obrigatório caso um telefone não seja informado",
        path: ["email"]
      })
    }
  });