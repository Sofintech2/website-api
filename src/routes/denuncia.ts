import pug from 'pug';
import { z } from 'zod';
import { DenunciaSchema } from '../schemas/denuncia.schema';
import { FastifyTypedInstance } from '../types/fastify-typed';
import path from 'node:path';
import { cwd } from 'node:process';

export default async function (app: FastifyTypedInstance) {
    app.post(
        '/api/denuncia',
        {
            schema: {
                tags: ['denuncia'],
                description: "Registra a denuncia da pessoa para a ouvidoria da empresa",
                body: DenunciaSchema,
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
                subject: "Nova denúncia/dúvida anônima no Site",
                html: pug.renderFile(path.join(__dirname, '..', 'templates', 'denuncia.pug'), req.body),
            })

            return reply
                .status(200)
                .send({ success: true })
        },
    );
}
