import { z } from 'zod';

export const ContatoSchema = z
  .object({
    nome: z.string({ required_error: "O campo Nome é obrigatório" }),
    email: z.string().email("O campo E-mail inválido"),
    telefone: z.string(),
    mensagem: z.string({ required_error: "O campo Mensagem é obrigatório" }),
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