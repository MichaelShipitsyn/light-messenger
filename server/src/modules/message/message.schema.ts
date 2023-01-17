import { FromSchema } from 'json-schema-to-ts';

export const createMessageSchema = {
  body: {
    type: 'object',
    properties: {
      text: { type: 'string', examples: ['My second message!'] },
    },
    required: ['text'],
    additionalProperties: false,
  },
  querystring: {
    type: 'object',
    properties: {
      dialogId: { type: 'number' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        text: { type: 'string' },
        creatorId: { type: 'number' },
        dialogId: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
} as const;

export const getMessagesSchema = {
  params: {
    type: 'object',
    properties: {
      dialogId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          text: { type: 'string' },
          creatorId: { type: 'number' },
          dialogId: { type: 'number' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  },
};

export const getMessageSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'number' } },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        text: { type: 'string' },
        creatorId: { type: 'number' },
        dialogId: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
};

export const editMessageSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'number' } },
  },
  querystring: {
    type: 'object',
    properties: {
      dialogId: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    properties: {
      text: { type: 'string', examples: ['My first edited message'] },
    },
    required: ['text'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        text: { type: 'string' },
        creatorId: { type: 'number' },
        dialogId: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
} as const;

export const deleteMessageSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'number' } },
  },
  querystring: {
    type: 'object',
    properties: {
      dialogId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        statusCode: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

export type MessageQueryString = { dialogId: number };
export type CreateMessageBody = FromSchema<typeof createMessageSchema['body']>;
export type EditMessageBody = FromSchema<typeof editMessageSchema['body']>;
