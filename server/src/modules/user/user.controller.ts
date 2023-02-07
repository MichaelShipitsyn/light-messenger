import type { FastifyInstance } from 'fastify';
import { editProfile, getMe, getUsers, searchUser } from './user.handler';
import {
  EditProfileBody,
  getMeSchema,
  getUsersSchema,
  SearchUserQuerystring,
  searchUserSchema,
} from './user.schema';

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

  server.get<{ Querystring: SearchUserQuerystring }>(
    '/search',
    {
      onRequest: [server.authenticate],
      schema: searchUserSchema,
    },
    searchUser,
  );

  server.post<{ Body: EditProfileBody }>(
    '/profile',
    { onRequest: [server.authenticate] },
    editProfile,
  );
};
