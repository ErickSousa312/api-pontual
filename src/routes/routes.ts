import JwtMiddleware from '../auth/JwtMiddleware.ts';
import CapitualController from '../controllers/CapitualController.ts';
import UserController from '../controllers/UserController.ts';

import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export default async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
) {
  fastify.post('/user/register', UserController.create);
  fastify.get('/user', UserController.getAll);
  fastify.post('/user/:id/post', UserController.createPost);
  fastify.get('/user/:id', UserController.getOne);

  fastify.get('/quotation/:pair', CapitualController.getCapitualQuotation);
  fastify.post(
    '/quotation/confirm/:pair',
    CapitualController.postCapitualQuotation,
  );
  fastify.get('/quotation/orders', CapitualController.getCapitualOrders);
  fastify.get('/payments/info', CapitualController.getCapitualPaymentInfo);
  fastify.get('/balance/info', CapitualController.getCapitualBalanceInfo);
  fastify.post(
    '/payments/simulate',
    CapitualController.postCapituaPaymentSimulate,
  );
  fastify.get('/quota/check', CapitualController.getCapituaQuotationCheck);
  fastify.post('/webhook/register', CapitualController.postCapitualWebHook);
  fastify.post(
    '/webhook/receive',
    CapitualController.postCapitualWebHookReceive,
  );

  fastify.get('/', async (request, reply) => {
    reply.status(200).send({ msg: 'ta rodando pai' });
    console.log('hi');
  });
}
