import { z } from 'zod';
import { ContatoOuvidoriaSchema } from '../schemas/contato-ouvidoria.schema';
import { FastifyTypedInstance } from '../types/fastify-typed';

export default async function (app: FastifyTypedInstance) {
    app.post(
        '/api/ouvidoria',
        {
            schema: {
                tags: ['ouvidoria'],
                description: "Registra o contato da pessoa para a ouvidoria da empresa",
                body: ContatoOuvidoriaSchema,
                response: {
                    200: z.object({
                        success: z.boolean()
                    })
                }
            },
        },
        async (req, reply) => {
            const { nome, email, telefone, mensagem } = req.body

            await app.mailer.sendMail({
                to: app.config.MAIL_OUVIDORIA,
                subject: "Nova reclamação no Site",
                html: `<b>Nome</b>: ${nome || '-'}<br /><b>Email</b>: ${email || '-'}<br /><b>Telefone</b>: ${telefone || '-'}<br /><b>Mensagem</b>: ${mensagem}`,
            })

            return reply
                .status(200)
                .send({ success: true })
        },
    );
}
