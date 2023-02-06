import type { FastifyInstance } from 'fastify';
import {
  createMessage,
  deleteMessage,
  editMessage,
  getMessage,
  getMessages,
} from './message.handler';
import {
  createMessageSchema,
  deleteMessageSchema,
  editMessageSchema,
  getMessageSchema,
  getMessagesSchema,
  MessageQueryString,
} from './message.schema';
import type { CreateMessageBody } from './message.schema';

export const messageController = async (server: FastifyInstance) => {
  server.post<{ Body: CreateMessageBody; Querystring: MessageQueryString }>(
    '/create',
    {
      onRequest: [server.authenticate],
      schema: createMessageSchema,
    },
    createMessage,
  );

  server.get<{ Params: { dialogId: number } }>(
    '/all/:dialogId',
    {
      onRequest: [server.authenticate],
      schema: getMessagesSchema,
    },
    getMessages,
  );

  server.get<{ Params: { id: number } }>(
    '/:id',
    {
      onRequest: [server.authenticate],
      schema: getMessageSchema,
    },
    getMessage,
  );

  server.put<{
    Body: { text: string };
    Params: { id: number };
    Querystring: MessageQueryString;
  }>(
    '/:id',
    {
      onRequest: [server.authenticate],
      schema: editMessageSchema,
    },
    editMessage,
  );

  server.delete<{ Params: { id: number }; Querystring: MessageQueryString }>(
    '/:id',
    {
      onRequest: [server.authenticate],
      schema: deleteMessageSchema,
    },
    deleteMessage,
  );
};
