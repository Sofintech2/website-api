import { z } from 'zod';

export const ContatoOuvidoriaSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email("O campo E-mail inválido").optional(),
  telefone: z.string().optional(),
  mensagem: z.string({required_error: "O campo Mensagem é obrigatório"}),
});