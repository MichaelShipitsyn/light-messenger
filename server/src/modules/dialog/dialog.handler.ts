import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateDialogBody,
  DeleteDialogParams,
  GetDialogByIdParams,
} from './dialog.schema';

export const createDialog = async (
  request: FastifyRequest<{ Body: CreateDialogBody }>,
  reply: FastifyReply,
) => {
  const currentUserId = request.user.id;
  const { recipientId, message } = request.body;
  const { id: dialogId } = await request.prisma.dialog.create({ data: {} });

  await Promise.all([
    request.prisma.participant.createMany({
      data: [
        {
          dialogId,
          userId: currentUserId,
        },
        {
          dialogId,
          userId: recipientId,
        },
      ],
    }),
    request.prisma.message.create({
      data: {
        dialogId,
        text: message,
        creatorId: currentUserId,
      },
    }),
  ]);

  const createdDialog = await request.prisma.dialog.findUnique({
    where: {
      id: dialogId,
    },
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
    },
  });

  request.io
    .to(recipientId.toString())
    .emit('SERVER:CREATE_DIALOG', JSON.stringify(createdDialog));

  return reply.status(201).send(createdDialog);
};

export const getDialogById = async (
  request: FastifyRequest<{ Params: GetDialogByIdParams }>,
  reply: FastifyReply,
) => {
  const dialogId = request.params.id;

  const dialog = await request.prisma.dialog.findUnique({
    where: {
      id: dialogId,
    },
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
    },
  });

  if (!dialog) {
    return reply.notFound('Dialog not found');
  }

  return reply.status(200).send(dialog);
};

export const getAllDialogs = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const currentUserId = request.user.id;

  //! need a pagination ?
  const dialogs = await request.prisma.dialog.findMany({
    where: {
      participants: {
        some: {
          userId: currentUserId,
        },
      },
    },
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
    },
  });

  return reply.status(200).send(dialogs);
};

export const deleteDialog = async (
  request: FastifyRequest<{ Params: DeleteDialogParams }>,
  reply: FastifyReply,
) => {
  const dialogId = request.params.id;
  const currentUserId = request.user.id;

  const currentDialog = await request.prisma.dialog.findUnique({
    where: {
      id: dialogId,
    },
    include: {
      participants: true,
    },
  });

  if (!Boolean(currentDialog)) {
    return reply.notFound('Dialog not existing');
  }

  const deletedDialog = await request.prisma.dialog.delete({
    where: {
      id: dialogId,
    },
  });

  const recipientId = currentDialog?.participants.find(
    (participant) => participant.userId !== currentUserId,
  )?.userId;

  if (recipientId) {
    request.io
      .to(recipientId.toString())
      .emit('SERVER:DELETE_DIALOG', JSON.stringify(deletedDialog.id));
  }

  return reply.status(200).send({
    message: 'Dialog successfully deleted',
    statusCode: 200,
  });
};
