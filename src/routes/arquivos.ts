import mime from 'mime';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import util from 'util';
import { z } from 'zod';
import { HttpNotAcceptableErrorSchema, HttpNotFoundErrorSchema, HttpValidationErrorSchema } from '../hooks/http-error.schema';
import { FastifyTypedInstance } from '../types/fastify-typed';

const pump = util.promisify(require('stream').pipeline)
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf']

export default async function (app: FastifyTypedInstance) {
    app.register(import('@fastify/multipart'), {
        limits: {
            fileSize: 2 * 1024 * 1024,
            files: 5,
        }
    })

    app.get(
        '/api/download',
        {
            schema: {
                tags: ['arquivos'],
                description: "Faz o download do arquivo",
                querystring: z.object({
                    arquivo: z.string({ required_error: "O campo Nome do arquivo é obrigatório" })
                }),
                response: {
                    200: z.any(),
                    400: HttpValidationErrorSchema,
                    404: HttpNotFoundErrorSchema
                }
            },
        },
        async function (req, reply) {
            const { arquivo } = req.query

            const filePath = path.join(process.cwd(), 'uploads', arquivo)

            if (!fs.existsSync(filePath)) {
                return app.httpErrors.notFound("Arquivo não encontrado")
            }

            const fileStream = fs.createReadStream(filePath)

            reply.header('Content-Disposition', `filename="${arquivo}"`)
            reply.header('Content-Type', mime.getType(arquivo) || 'application/octet-stream')

            return reply.send(fileStream)
        })

    app.post(
        '/api/upload',
        {
            schema: {
                tags: ['arquivos'],
                description: "Faz o upload do arquivo",
                response: {
                    200: z.any(),
                    400: HttpValidationErrorSchema,
                    404: HttpNotFoundErrorSchema,
                    406: HttpNotAcceptableErrorSchema
                }
            },
        },
        async function (req, reply) {
            const today = new Date().toISOString().split('T')[0]

            const requestId = randomUUID()

            const parts = req.files()

            const uploadedFiles = []

            const uploadDir = path.join(process.cwd(), 'uploads', today, requestId)
            fs.mkdirSync(uploadDir, { recursive: true })

            for await (const part of parts) {
                if (part.file) {
                    if (part.file.truncated) {
                        return app.httpErrors.badRequest({ error: `Arquivo ${part.filename} excede 2MB.` })
                    }

                    const ext = path.extname(part.filename).toLowerCase()
                    if (!allowedExtensions.includes(ext)) {
                        return app.httpErrors.badRequest({ error: `Extensão não permitida: ${ext}` })
                    }

                    const filePath = path.join(uploadDir, part.filename)
                    await pump(part.file, fs.createWriteStream(filePath))

                    uploadedFiles.push({
                        originalName: part.filename,
                        downloadUrl: `${app.config.BASE_URL}/api/download?arquivo=${today}/${requestId}/${part.filename}`
                    })
                }
            }

            return reply.status(200).send(uploadedFiles)
        })
}
