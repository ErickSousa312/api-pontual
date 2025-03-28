import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes/routes.ts';

const app = Fastify({
  logger: true,
  ignoreDuplicateSlashes: true,
  bodyLimit: 90 * 1024 * 1024,
});

app.register(cors);

app.register(routes);

export default app;
