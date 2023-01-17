import { FromSchema } from 'json-schema-to-ts';

const userResponseWithToken = {
  user: {
    type: 'object',
    properties: {
      id: { type: 'number', examples: [1] },
      username: { type: 'string', examples: ['user1'] },
      email: { type: 'string', examples: ['user1@example.com'] },
      phoneNumber: { type: 'string', examples: ['87777777777'] },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
      profile: {
        type: ['object', 'null'],
        properties: {
          avatar: {
            type: 'string',
            examples: ['http://localhost:8080/profile/avatar.jpg'],
          },
          bio: { type: 'string', examples: ['Hello world!'] },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        },
      },
    },
  },
  token: {
    type: 'string',
    examples: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0ODAwNjIxLCJleHAiOjE2NjQ4MDA2ODF9.IPL22nl7jQJsIFdkSmK5YmG2YMy_c6apLPkIrrFOkXU',
    ],
  },
};

const signUpBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string', examples: ['user1'] },
    password: { type: 'string', examples: ['password1'] },
    phoneNumber: { type: 'string', examples: ['87777777777'] },
    email: { type: 'string', format: 'email', examples: ['user1@example.com'] },
  },
  required: ['username', 'password', 'phoneNumber', 'email'],
  additionalProperties: false,
} as const;

export const signUpSchema = {
  description: 'Sign up request',
  tags: ['auth'],
  summary: 'Sign up',
  body: signUpBodySchema,
  response: {
    201: {
      description: 'Success Response',
      type: 'object',
      properties: userResponseWithToken,
    },
    403: {
      description: 'Failure Response',
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [403] },
        error: { type: 'string', examples: ['Forbidden'] },
        message: { type: 'string', examples: ['User already exist'] },
      },
    },
  },
};

export const signInBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', examples: ['user1@example.com'] },
    password: { type: 'string', examples: ['password1'] },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const;

export const signInSchema = {
  description: 'Sign in request',
  tags: ['auth'],
  summary: 'Sign in',
  body: signInBodySchema,
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: userResponseWithToken,
    },
    400: {
      description: 'Failure Response if we put incorrect credentials',
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [400] },
        error: { type: 'string', examples: ['Bad Request'] },
        message: { type: 'string', examples: ['Incorrect credentials'] },
      },
    },
  },
};

export const refreshTokenSchema = {
  description: 'Refresh token request',
  tags: ['auth'],
  summary: 'Refresh token',
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        token: {
          type: 'string',
          examples: [
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY0ODAwNjIxLCJleHAiOjE2NjQ4MDA2ODF9.IPL22nl7jQJsIFdkSmK5YmG2YMy_c6apLPkIrrFOkXU',
          ],
        },
      },
    },
    401: {
      description: 'Unauthorized, if missing or invalid refresh token',
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
    403: {
      description:
        "if missing refresh token(this error did'nt work because refresh token check onRequest and throw 401 exception)",
      type: 'object',
      properties: {
        statusCode: { type: 'number', examples: [403] },
        error: { type: 'string', examples: ['Forbidden'] },
        message: { type: 'string', examples: ['Refresh token is required'] },
      },
    },
  },
};

export const logoutSchema = {
  description: 'Logout request',
  tags: ['auth'],
  summary: 'Logout',
  response: {
    200: {
      description: 'Success Response',
      type: 'object',
      properties: {
        message: { type: 'string', examples: ['User logged out successfully'] },
      },
    },
    401: {
      description: "If don't have access token or token invalid",
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
  },
};

export type SignUpBody = FromSchema<typeof signUpBodySchema>;
export type SignInBody = FromSchema<typeof signInBodySchema>;
