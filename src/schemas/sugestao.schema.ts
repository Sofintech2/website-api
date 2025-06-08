import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const SugestaoSchema = z
  .object({
    qualSuaRelacaoComAEmpresa: z.string({ required_error: "O campo Qual a Sua Relação Com a Empresa é obrigatório" }).trim().transform(capitalizeWords),
    sugestao: z.string({ required_error: "O campo Dúvida é obrigatório" }).trim().transform(capitalizeWords),
    pessoasParaImplementar: z.string({ required_error: "O campo Pessoas para implementar as alterações é obrigatório" }).trim().transform(capitalizeWords),
    tentouFazerDiretamenteAPessoa: z.string({ required_error: "O campo Tentou fazer essa sugestão diretamente é obrigatório" }).trim().transform(capitalizeWords),
  })