import { z } from 'zod';
import { FastifyTypedInstance } from '../../types/fastify-typed';
import { ContatoSchema } from '../../schemas/contato.schema';

export default async function (app: FastifyTypedInstance) {
    app.post(
        '/contato',
        {
            schema: {
                tags: ['contato'],
                description: "Registra o contato da pessoa",
                body: ContatoSchema,
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
                to: app.config.MAIL_CONTATO,
                subject: "Novo contato no Site",
                html: `<b>Nome</b>: ${nome}<br /><b>Email</b>: ${email}<br /><b>Telefone</b>: ${telefone}<br /><b>Mensagem</b>: ${mensagem}`,
            })

            return reply
                .status(200)
                .send({ success: true })
        },
    );
}
