import { FromSchema } from 'json-schema-to-ts';

export const createDialogSchema = {
  body: {
    type: 'object',
    properties: {
      recipientId: { type: 'number', examples: [1564] },
      message: { type: 'string', examples: ['My first message!'] },
    },
    required: ['recipientId', 'message'],
    additionalProperties: false,
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        messages: {
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
        participants: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              userId: { type: 'number' },
              dialogId: { type: 'number' },
              user: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  phoneNumber: { type: 'string' },
                  username: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                  profile: {
                    type: ['object', 'null'],
                    properties: {
                      avatar: { type: 'string' },
                      bio: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        lastMessage: {
          type: ['object', 'null'],
          properties: {
            id: { type: 'number' },
            text: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            creator: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                profile: {
                  type: ['object', 'null'],
                  properties: {
                    avatar: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [401] },
        code: {
          type: 'string',
          examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
        },
        error: { type: 'string', examples: ['Unauthorized'] },
        message: { type: 'string', examples: ['Refresh token expired'] },
      },
    },
  },
} as const;

export const getDialogByIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        id: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        messages: {
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
        participants: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              userId: { type: 'number' },
              dialogId: { type: 'number' },
              user: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  phoneNumber: { type: 'string' },
                  username: { type: 'string' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                  profile: {
                    type: ['object', 'null'],
                    properties: {
                      avatar: { type: 'string' },
                      bio: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        lastMessage: {
          type: ['object', 'null'],
          properties: {
            id: { type: 'number' },
            text: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            creator: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                profile: {
                  type: ['object', 'null'],
                  properties: {
                    avatar: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [401] },
        code: {
          type: 'string',
          examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
        },
        error: { type: 'string', examples: ['Unauthorized'] },
        message: { type: 'string', examples: ['Refresh token expired'] },
      },
    },
  },
};

export const getAllDialogsSchema = {
  response: {
    200: {
      description: 'Success Response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          messages: {
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
          participants: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userId: { type: 'number' },
                dialogId: { type: 'number' },
                user: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    phoneNumber: { type: 'string' },
                    username: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                    profile: {
                      type: ['object', 'null'],
                      properties: {
                        avatar: { type: 'string' },
                        bio: { type: 'string' },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          lastMessage: {
            type: ['object', 'null'],
            properties: {
              id: { type: 'number' },
              text: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
              creator: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  username: { type: 'string' },
                  profile: {
                    type: ['object', 'null'],
                    properties: {
                      avatar: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [401] },
        code: {
          type: 'string',
          examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
        },
        error: { type: 'string', examples: ['Unauthorized'] },
        message: { type: 'string', examples: ['Refresh token expired'] },
      },
    },
  },
};

export const deleteDialogSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          examples: ['Dialog successfully deleted'],
        },
        statusCode: {
          type: 'number',
          examples: [200],
        },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [401] },
        code: {
          type: 'string',
          examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
        },
        error: { type: 'string', examples: ['Unauthorized'] },
        message: { type: 'string', examples: ['Refresh token expired'] },
      },
    },
  },
};

export type DeleteDialogParams = { id: number };
export type GetDialogByIdParams = { id: number };
export type CreateDialogBody = FromSchema<typeof createDialogSchema['body']>;
