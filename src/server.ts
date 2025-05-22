import autoload from '@fastify/autoload';
import Fastify from 'fastify';
import { join } from 'node:path';

async function build() {
    const app = Fastify();

    await app.register(autoload, { dir: join(__dirname, 'plugins') });
    await app.register(autoload, { dir: join(__dirname, 'routes') });

    await app.listen({ port: Number(app.config.PORT) })

    return app;
}

build()
    .then(app => console.log(`HTTP Server running on http://localhost:${app.config.PORT}`))
