import type { FastifyReply, FastifyRequest } from 'fastify';
import { EditProfileBody, SearchUserQuerystring } from './user.schema';

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const users = await request.prisma.user.findMany({
    include: { profile: true },
  });

  if (!users) {
    return reply.notFound('Users not found');
  }

  return reply.status(200).send(users);
};

export const getMe = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await request.prisma.user.findUnique({
    where: {
      id: request.user.id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return reply.notFound('User not found');
  }

  return reply.status(200).send(user);
};

export const editProfile = async (
  request: FastifyRequest<{ Body: EditProfileBody }>,
  reply: FastifyReply,
) => {
  const { avatar, bio } = request.body;
  const userId = request.user.id;

  const user = await request.prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      profile: true,
    },
  });

  if (!user) {
    return reply.notFound('User not found');
  }

  if (user.profile) {
    const profile = await request.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        avatar: avatar ?? '',
        bio: bio ?? '',
      },
    });

    return reply.status(201).send(profile);
  }

  const profile = await request.prisma.profile.create({
    data: {
      userId,
      avatar: avatar ?? '',
      bio: bio ?? '',
    },
  });

  return reply.status(201).send(profile);
};

export const searchUser = async (
  request: FastifyRequest<{ Querystring: SearchUserQuerystring }>,
  reply: FastifyReply,
) => {
  const username = request.query.username;
  const currentUserId = request.user.id;

  const users = await request.prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: 'insensitive',
      },
      NOT: {
        id: currentUserId,
      },
    },
  });

  reply.status(200).send(users);
};
