import type { FastifyInstance } from 'fastify';
import { editProfile, getMe, getUsers } from './user.handler';
import { EditProfileBody, getMeSchema, getUsersSchema } from './user.schema';

export const userController = async (server: FastifyInstance) => {
  server.get(
    '/me',
    { onRequest: [server.authenticate], schema: getMeSchema },
    getMe,
  );

  server.get(
    '/all',
    { onRequest: [server.authenticate], schema: getUsersSchema },
    getUsers,
  );

  server.post<{ Body: EditProfileBody }>(
    '/profile',
    { onRequest: [server.authenticate] },
    editProfile,
  );
};
