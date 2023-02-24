import fastify from 'fastify';
import cookie from '@fastify/cookie';
import fs from 'fs/promises';
import path from 'path';
import type { FastifyBaseLogger, FastifyServerOptions } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import socketioServer from 'fastify-socket.io';
import type { Server } from 'http';

import { authRoutes } from './modules/auth';
import {
  authJwt,
  refreshJwt,
  config,
  prisma,
  security,
  sensiblePlugin,
  swaggerPlugin,
} from './plugins';
import { ping } from './ping';
import { userRoutes } from './modules/user';
import { dialogRoutes } from './modules/dialog';
import { messageRoutes } from './modules/message';
import { gateway } from './gateway';

const initializeServer = async (
  options: FastifyServerOptions<Server, FastifyBaseLogger> = {},
) => {
  const server = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  await server.register(config);
  await server.register(security);
  await server.register(cookie, {} as FastifyCookieOptions);
  await server
    .register(socketioServer, {
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
      },
    })
    .decorateRequest('io', { getter: () => server.io });
  await server.register(authJwt);
  await server.register(refreshJwt);
  await server.register(sensiblePlugin);
  await server.register(prisma);
  await server.register(swaggerPlugin);
  await server.register(ping);
  await server.register(authRoutes, { prefix: '/auth' });
  await server.register(userRoutes);
  await server.register(dialogRoutes);
  await server.register(messageRoutes);
  await server.register(gateway);

  const swaggerJson = JSON.stringify(server.swagger(), undefined, 2);
  await fs.writeFile(
    path.resolve(__dirname, '..', '..', 'client', 'swagger-api.json'),
    swaggerJson,
  );

  return server;
};

export { initializeServer };
