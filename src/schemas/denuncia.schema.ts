import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const DenunciaSchema = z.object({
  email: z.string().email("O campo E-mail inválido").trim().optional(),
  tipoReporte: z.enum(["Denúncia", "Dúvida", "Sugestão"], { required_error: "O campo Tipo de Reporte é obrigatório", message: "O campo Tipo de Reporte está inválido" }),
  categoriaAssunto: z.string({required_error: 'O campo Categoria do Assunto é obrigatório'}).trim().transform(capitalizeWords),
  politicaInterna: z.string({required_error: 'O campo Política interna é obrigatório'}).trim().transform(capitalizeWords),
  descricao: z.string({ required_error: "O campo Descrição do Incidente/Dúvida é obrigatório" }).trim(),
  data: z.string({ required_error: "O campo Data do Incidente é obrigatório"}).datetime({local: true, message: "O campo Data do Incidente está inválido"}),
  local: z.string({ required_error: "O campo Local do Incidente é obrigatório" }).trim().transform(capitalizeWords),
  medidaResolverProblema: z.string().trim().transform(capitalizeWords).optional(),
  arquivos: z.array(z.object({
    originalName: z.string(),
    downloadUrl: z.string()
})).optional()
});