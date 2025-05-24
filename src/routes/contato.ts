import { z } from 'zod';
import { FastifyTypedInstance } from '../types/fastify-typed';
import { ContatoSchema } from '../schemas/contato.schema';
import pug from 'pug';
import path from 'node:path';

export default async function (app: FastifyTypedInstance) {
    app.post(
        '/api/contato',
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
                    await app.mailer.sendMail({
                        to: app.config.MAIL_CONTATO,
                        subject: "Novo contato no Site",
                        html: pug.renderFile(path.join(__dirname, '..', 'templates', 'contato.pug'), req.body),
                    })

            return reply
                .status(200)
                .send({ success: true })
        },
    );
}
