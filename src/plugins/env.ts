import 'fastify';
import fp from 'fastify-plugin';
import env from '@fastify/env';

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            HOST: string;
            PORT: string;
            BASE_URL: string;
            NODE_ENV: string;
            SMTP_HOST: string;
            SMTP_PORT: string;
            SMTP_USER: string;
            SMTP_PASS?: string;
            MAIL_CONTATO: string;
            MAIL_OUVIDORIA: string;
        };
    }
}

const envSchema = {
    type: 'object',
    required: [
        'HOST',
        'PORT',
        'BASE_URL',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
        'MAIL_CONTATO',
        'MAIL_OUVIDORIA'
    ],
    properties: {
        HOST: { type: 'string', default: '0.0.0.0' },
        PORT: { type: 'string', default: '3000' },
        BASE_URL: { type: 'string', default: 'http://localhost:3000' },
        NODE_ENV: { type: 'string', default: 'development' },
        SMTP_HOST: { type: 'string' },
        SMTP_PORT: { type: 'string' },
        SMTP_USER: { type: 'string' },
        SMTP_PASS: { type: 'string' },
        MAIL_CONTATO: { type: 'string' },
        MAIL_OUVIDORIA: { type: 'string' }
    }
} as const;

export default fp(async (app) => {
    await app.register(env, {
        schema: envSchema,
        confKey: 'config',
        dotenv: true
    });
});
