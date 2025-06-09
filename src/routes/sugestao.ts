import { z } from 'zod';
import { FastifyTypedInstance } from '../types/fastify-typed';
import { ContatoSchema } from '../schemas/contato.schema';
import pug from 'pug';
import path from 'node:path';
import { SugestaoSchema } from '../schemas/sugestao.schema';

export default async function (app: FastifyTypedInstance) {
    app.post(
        '/api/sugestao',
        {
            schema: {
                tags: ['complaince'],
                description: "Registra a sugestão da pessoa",
                body: SugestaoSchema,
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
                        subject: "Nova Sugestão no Site",
                        html: pug.renderFile(path.join(__dirname, '..', 'templates', 'sugestao.pug'), req.body),
                    })

            return reply
                .status(200)
                .send({ success: true })
        },
    );
}
