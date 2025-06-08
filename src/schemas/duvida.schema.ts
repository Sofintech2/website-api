import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const DuvidaSchema = z
  .object({
    qualSuaRelacaoComAEmpresa: z.string({ required_error: "O campo Qual a Sua Relação Com a Empresa é obrigatório" }).trim().transform(capitalizeWords),
    duvida: z.string({ required_error: "O campo Dúvida é obrigatório" }).trim().transform(capitalizeWords),
  });