import { FastifyReply, FastifyRequest } from 'fastify';
import apiAxiosCapitual from '../utils/axiosApiCapitual';
import {
  TypeQuotation,
  TypeQuotationcheck,
  TypeResponseTrade,
} from '../@types/quotation';
import { TypeTradeConfirm } from '../@types/trade';
import { TypeOrderTrade } from '../@types/order';
import { TypePayment, TypePaymentSimulate } from '../@types/payment';
import { TypeBalance } from '../@types/balance';
import { TypeWebhook } from '../@types/webhook';

class CapitualController {
  async getCapitualQuotation(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { pair } = request.params as { pair: string };
      const { data: quotation }: { data: TypeQuotation } =
        await apiAxiosCapitual.get(`/trades/quotation?pair=${pair}`);
      return reply.send(quotation);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async postCapitualQuotation(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { pair } = request.params as { pair: string };

      const { data: quotationSearch }: { data: TypeQuotation } =
        await apiAxiosCapitual.get(`/trades/quotation?pair=${pair}`);

      const bodyTradeConfirm = request.body as TypeTradeConfirm;
      const { data: quotation }: { data: TypeResponseTrade } =
        await apiAxiosCapitual.post(`/trades/confirm?`, {
          ...bodyTradeConfirm,
          quote_id: quotationSearch.data.quote_id,
        });
      return reply.send(quotation);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async getCapitualOrders(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { data: ordersSearch }: { data: TypeOrderTrade } =
        await apiAxiosCapitual.get(`/trades/orders`);

      return reply.send(ordersSearch);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async getCapitualPaymentInfo(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { data: paymentInfo }: { data: TypePayment } =
        await apiAxiosCapitual.get(`/payments/info`);
      return reply.send(paymentInfo);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async getCapitualBalanceInfo(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { data: balanceInfo }: { data: TypeBalance } =
        await apiAxiosCapitual.get(`/payments/balance`);
      return reply.send(balanceInfo);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async postCapituaPaymentSimulate(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const paymentSimulate = request.body as TypePayment;
      const { data: balanceInfo }: { data: TypePaymentSimulate } =
        await apiAxiosCapitual.post(`/payments/simulate`, paymentSimulate);
      return reply.send(balanceInfo);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async getCapituaQuotationCheck(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { data: quotationCheck }: { data: TypeQuotationcheck } =
        await apiAxiosCapitual.get(`/quotas/check`);
      return reply.send(quotationCheck);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async postCapitualWebHook(request: FastifyRequest, reply: FastifyReply) {
    try {
      const bodyWbeHook = request.body as TypeWebhook;
      const { data: webhook }: { data: { data: string } } =
        await apiAxiosCapitual.post(`/webhooks/configuration`, bodyWbeHook);
      return reply.send(webhook);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async postCapitualWebHookReceive(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      console.log('request.query', request.body);
      return reply.status(200).send('ok');
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default new CapitualController();
