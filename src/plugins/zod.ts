import fp from 'fastify-plugin';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';

export default fp(async (app) => {
  app.withTypeProvider<ZodTypeProvider>

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)
});
