import z from "zod";
import { FastifyTypedInstance } from "../types/fastify-typed";

export default async function (app: FastifyTypedInstance) {
    app.get(
        '/health',
        {
            schema: {
                description: "Verifica a saúde da aplicação",
                tags: ["health"],
                response: {
                    200: z.object({
                        status: z.string(),
                        uptime: z.number()
                    })
                }
            }
        },
        async (_, reply) => reply.status(200).send({
            status: 'ok',
            uptime: process.uptime()
        })
    );
}