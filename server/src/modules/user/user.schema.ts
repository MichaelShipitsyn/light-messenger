import { FromSchema } from 'json-schema-to-ts';

export const getUsersSchema = {
  description: 'Get users request',
  tags: ['users'],
  summary: 'Get Users',
  response: {
    200: {
      description: 'Success Response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', examples: [1] },
          username: { type: 'string', examples: ['user1'] },
          email: { type: 'string', examples: ['user1@example.com'] },
          phoneNumber: { type: 'string', examples: ['87777777777'] },
          profile: {
            type: ['object', 'null'],
            properties: {
              avatar: {
                type: 'string',
                examples: ['http://localhost:8080/profile/avatar.jpg'],
              },
              bio: { type: 'string', examples: ['Hello world!'] },
            },
          },
        },
      },
    },
  },
  404: {
    description: 'Users not found',
    type: 'object',
    properties: {
      statusCode: { type: 'number', examples: [404] },
      error: { type: 'string', examples: ['Not found'] },
      message: { type: 'string', examples: ['Users not found'] },
    },
  },
  401: {
    description: 'Not authorized to access this request',
    type: 'object',
    properties: {
      statusCode: { type: 'number', examples: [401] },
      code: {
        type: 'string',
        examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
      },
      error: { type: 'string', examples: ['Unauthorized'] },
      message: { type: 'string', examples: ['Authorization token expired'] },
    },
  },
};

export const getMeSchema = {
  description: 'Get current user request',
  tags: ['users'],
  summary: 'Get current user',
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        id: { type: 'number', examples: [1] },
        username: { type: 'string', examples: ['user1'] },
        email: { type: 'string', examples: ['user1@example.com'] },
        phoneNumber: { type: 'string', examples: ['87777777777'] },
        profile: {
          type: ['object', 'null'],
          properties: {
            avatar: {
              type: 'string',
              examples: ['http://localhost:8080/profile/avatar.jpg'],
            },
            bio: { type: 'string', examples: ['Hello world!'] },
          },
        },
      },
    },
  },
  404: {
    description: 'User not found',
    type: 'object',
    properties: {
      statusCode: { type: 'number', examples: [404] },
      error: { type: 'string', examples: ['Not found'] },
      message: { type: 'string', examples: ['User not found'] },
    },
  },
  401: {
    description: 'Not authorized to access this request',
    type: 'object',
    properties: {
      statusCode: { type: 'number', examples: [401] },
      code: {
        type: 'string',
        examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
      },
      error: { type: 'string', examples: ['Unauthorized'] },
      message: { type: 'string', examples: ['Authorization token expired'] },
    },
  },
};

export const editProfileSchema = {
  description: 'Edit profile request',
  tags: ['users'],
  summary: 'Edit profile of current user',
  body: {
    type: 'object',
    properties: {
      avatar: { type: 'string', examples: ['asdf'] },
      bio: { type: 'string', examples: ['my bio'] },
    },
    additionalProperties: false,
  },
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: {
        id: { type: 'number', examples: [1] },
        username: { type: 'string', examples: ['user1'] },
        email: { type: 'string', examples: ['user1@example.com'] },
        phoneNumber: { type: 'string', examples: ['87777777777'] },
        profile: {
          type: ['object', 'null'],
          properties: {
            avatar: {
              type: 'string',
              examples: ['http://localhost:8080/profile/avatar.jpg'],
            },
            bio: { type: 'string', examples: ['Hello world!'] },
          },
        },
      },
    },
  },
  404: {
    description: 'User not found',
    type: 'object',
    properties: {
      statusCode: { type: 'number', examples: [404] },
      error: { type: 'string', examples: ['Not found'] },
      message: { type: 'string', examples: ['User not found'] },
    },
  },
  401: {
    description: 'Not authorized to access this request',
    type: 'object',
    properties: {
      statusCode: { type: 'number', examples: [401] },
      code: {
        type: 'string',
        examples: ['FST_JWT_AUTHORIZATION_TOKEN_EXPIRED'],
      },
      error: { type: 'string', examples: ['Unauthorized'] },
      message: { type: 'string', examples: ['Authorization token expired'] },
    },
  },
} as const;

export const searchUserSchema = {
  querystring: {
    type: 'object',
    properties: {
      username: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Success response',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', examples: [1] },
          username: { type: 'string', examples: ['user1'] },
          email: { type: 'string', examples: ['user1@example.com'] },
          phoneNumber: { type: 'string', examples: ['87777777777'] },
          profile: {
            type: ['object', 'null'],
            properties: {
              avatar: {
                type: 'string',
                examples: ['http://localhost:8080/profile/avatar.jpg'],
              },
              bio: { type: 'string', examples: ['Hello world!'] },
            },
          },
        },
      },
    },
  },
};

export type SearchUserQuerystring = { username: string };
export type EditProfileBody = FromSchema<(typeof editProfileSchema)['body']>;
