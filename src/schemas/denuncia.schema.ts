import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const DenunciaSchema = z.object({
  email: z.string().trim(),
  tipoReporte: z.string({required_error: "O campo Tipo de Reporte é obrigatório" }).trim(),
  categoriaAssunto: z.string({ required_error: 'O campo Categoria do Assunto é obrigatório' }).trim().transform(capitalizeWords),
  politicaInterna: z.string({ required_error: 'O campo Política interna é obrigatório' }).trim().transform(capitalizeWords),
  descricao: z.string({ required_error: "O campo Descrição do Incidente/Dúvida é obrigatório" }).trim(),
  data: z.string({ required_error: "O campo Data do Incidente é obrigatório" }).trim(),
  local: z.string({ required_error: "O campo Local do Incidente é obrigatório" }).trim().transform(capitalizeWords),
  medidaResolverProblema: z.string().trim().transform(capitalizeWords),
  arquivos: z.array(z.object({
    originalName: z.string(),
    downloadUrl: z.string()
  })).optional()
});