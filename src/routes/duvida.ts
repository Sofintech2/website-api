import { z } from 'zod';
import { FastifyTypedInstance } from '../types/fastify-typed';
import { ContatoSchema } from '../schemas/contato.schema';
import pug from 'pug';
import path from 'node:path';
import { DuvidaSchema } from '../schemas/duvida.schema';

export default async function (app: FastifyTypedInstance) {
    app.post(
        '/api/duvida',
        {
            schema: {
                tags: ['complaince'],
                description: "Registra a dúvida da pessoa",
                body: DuvidaSchema,
                response: {
                    200: z.object({
                        success: z.boolean()
                    })
                }
            },
        },
        async (req, reply) => {
                    await app.mailer.sendMail({
                        to: app.config.MAIL_OUVIDORIA,
                        subject: "Nova Dúvida no Site",
                        html: pug.renderFile(path.join(__dirname, '..', 'templates', 'duvida.pug'), req.body),
                    })

            return reply
                .status(200)
                .send({ success: true })
        },
    );
}
