import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const ContatoOuvidoriaSchema = z.object({
  nome: z.string().trim().transform(capitalizeWords).optional(),
  email: z.string().email("O campo E-mail inválido").trim().optional(),
  telefone: z.string().trim().transform(onlyNumbers).optional(),
  mensagem: z.string({required_error: "O campo Mensagem é obrigatório"}).trim(),
});