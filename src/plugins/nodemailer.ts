import { Transporter } from "nodemailer";

// @ts-ignore:next-line
import fastifyMailer from 'fastify-mailer';
import fp from 'fastify-plugin';

export interface FastifyMailerNamedInstance {
  [namespace: string]: Transporter;
}

export type FastifyMailer = FastifyMailerNamedInstance & Transporter;

declare module "fastify" {
  interface FastifyInstance {
    mailer: FastifyMailer;
  }
}

export default fp(async (app) => {
  await app.register(fastifyMailer, {
    defaults: {
      from: 'Ouvidoria <ouvidoria@sofintech.com.br>'
    },
    transport: {
      host: app.config.SMTP_HOST,
      port: app.config.SMTP_PORT,
      secure: app.config.SMTP_PORT === '465',
      tls: {
          rejectUnauthorized: true,
          minVersion: "TLSv1.2"
      },
      auth: {
        user: app.config.SMTP_USER,
        pass: app.config.SMTP_PASS
      }
    }
  });
});
