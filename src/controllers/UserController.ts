// src/controllers/UserController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { prismaORM } from '../utils/prisma';

class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email } = request.body as { name: string; email: string };

      const existingUser = await prismaORM.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        return reply
          .status(400)
          .send({ error: 'User with this email already exists' });
      }

      const user = await prismaORM.user.create({
        data: {
          name,
          email,
        },
      });

      return reply.status(201).send(user);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await prismaORM.user.findMany();
      return reply.send(users);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async getOne(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const user = await prismaORM.user.findUnique({
        where: { id: parseInt(id) },
        include: { posts: true },
      });

      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return reply.send(user);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: number };
    const { name, email } = request.body as { name: string; email: string };

    try {
      const user = await prismaORM.user.update({
        where: { id },
        data: {
          name,
          email,
        },
      });

      return reply.send(user);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: number };

    try {
      const user = await prismaORM.user.delete({
        where: { id },
      });

      return reply.status(200).send({ message: 'User deleted', user });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async createPost(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: number };
    const { title, content } = request.body as {
      title: string;
      content: string;
    };

    try {
      const post = await prismaORM.post.create({
        data: {
          title,
          content,
          authorId: Number(id),
        },
      });

      return reply.status(201).send(post);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
