import { z } from 'zod';
import { capitalizeWords, onlyNumbers } from '../utils/helpers';

export const DenunciaSchema = z.object({
  qualSuaRelacaoComAEmpresa: z.string({ required_error: "O campo Qual a sua relação com a Sofintech é obrigatório" }).trim().transform(capitalizeWords),
  voceGostariaDeSeIdentificar: z.string({ required_error: "O campo Você gostaria de se identificar é obrigatório" }).trim().transform(capitalizeWords),
  nome: z.string().trim().transform(capitalizeWords).optional(),
  email: z.string().trim().transform(capitalizeWords).optional(),
  telefone: z.string().trim().transform(capitalizeWords).optional(),
  tipoDeReclamacao: z.string({ required_error: "O campo Qual o tipo de denúncia melhor se enquadra ao fato que você está registrando é obrigatório" }).trim().transform(capitalizeWords),
  tipoDeReclamacaoOutro: z.string().trim().transform(capitalizeWords).optional(),
  areaSetor: z.string({ required_error: "O campo Indique a área/setor onde ocorreu o fato que você está denunciando é obrigatório" }).trim().transform(capitalizeWords),
  comoVoceSoube: z.string({ required_error: "O campo Como tomou conhecimento desta fato/transgressão é obrigatório" }).trim().transform(capitalizeWords),
  comoVoceSoubeOutro: z.string().trim().transform(capitalizeWords).optional(),
  alguemEstaCiente: z.string({ required_error: "O campo Você sabe se algum Diretor, Gerente, Coordenador ou Supervisor está CIENTE do problema relatado é obrigatório" }).trim().transform(capitalizeWords),
  alguemEstaEnvolvido: z.string({ required_error: "O campo Você sabe se algum Diretor, Gerente, Coordenador, Supervisor está ENVOLVIDO diretamente no fato relatado é obrigatório" }).trim().transform(capitalizeWords),
  alguemTentouOcultar: z.string({ required_error: "O campo Você sabe se algum(ns) Diretor(es), Gerente(s), Coordenador(es) ou Supervisor(es) tentou(ram) ESCONDER o problema relatado é obrigatório" }).trim().transform(capitalizeWords),
  reclamacao: z.string({ required_error: "O campo O que você quer denunciar é obrigatório" }).trim().transform(capitalizeWords),
  testemunhas: z.string().trim().transform(capitalizeWords).optional(),
  evidencias: z.string().trim().transform(capitalizeWords).optional(),
  valorFinanceiroEnvolvido: z.string().trim().transform(capitalizeWords).optional(),
  sugestoesParaResolveraSituacao: z.string().trim().transform(capitalizeWords).optional(),
  anexos: z.array(z.object({
    originalName: z.string(),
    downloadUrl: z.string()
  })).optional()
});