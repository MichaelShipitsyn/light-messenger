import type { FastifyReply, FastifyRequest } from 'fastify';
import type {
  CreateMessageBody,
  EditMessageBody,
  MessageQueryString,
} from './message.schema';

export const createMessage = async (
  request: FastifyRequest<{
    Body: CreateMessageBody;
    Querystring: MessageQueryString;
  }>,
  reply: FastifyReply,
) => {
  const currentUserId = request.user.id;
  const { text } = request.body;
  const dialogId = request.query.dialogId;

  const currentDialog = await request.prisma.dialog.findUnique({
    where: { id: dialogId },
    select: { participants: true },
  });

  let recipientId: number | undefined;

  if (currentDialog?.participants) {
    recipientId = currentDialog.participants.find(
      (participant) => participant.userId !== currentUserId,
    )?.userId;
  }

  const { id: createdMessageId } = await request.prisma.message.create({
    data: {
      text,
      dialogId,
      creatorId: currentUserId,
    },
    select: {
      id: true,
    },
  });

  const updatedDialog = await request.prisma.dialog.update({
    where: { id: dialogId },
    data: { messageId: createdMessageId },
    include: {
      participants: { include: { user: { include: { profile: true } } } },
      messages: true,
      lastMessage: { include: { creator: { include: { profile: true } } } },
    },
  });

  if (recipientId) {
    request.io
      .to(recipientId.toString())
      .emit('SERVER:CREATE_MESSAGE', JSON.stringify(updatedDialog));
  }

  return reply.status(201).send(updatedDialog);
};

export const getMessages = async (
  request: FastifyRequest<{ Params: { dialogId: number } }>,
  reply: FastifyReply,
) => {
  const dialogId = request.params.dialogId;

  const messages = await request.prisma.message.findMany({
    where: { dialogId },
  });

  return reply.status(200).send(messages);
};

export const getMessage = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply,
) => {
  const id = request.params.id;

  const message = await request.prisma.message.findUnique({
    where: { id },
  });

  return reply.status(200).send(message);
};

export const editMessage = async (
  request: FastifyRequest<{
    Params: { id: number };
    Body: EditMessageBody;
    Querystring: MessageQueryString;
  }>,
  reply: FastifyReply,
) => {
  const id = request.params.id;
  const text = request.body.text;
  const dialogId = request.query.dialogId;
  const currentUserId = request.user.id;

  const currentDialog = await request.prisma.dialog.findUnique({
    where: { id: dialogId },
    select: { participants: true },
  });

  let recipientId: number | undefined;

  if (currentDialog?.participants) {
    recipientId = currentDialog.participants.find(
      (participant) => participant.userId !== currentUserId,
    )?.userId;
  }

  const editedMessage = await request.prisma.message.update({
    where: { id },
    data: { text, updatedAt: new Date().toISOString() },
  });

  if (recipientId) {
    request.io
      .to(recipientId.toString())
      .emit('SERVER:EDIT_MESSAGE', JSON.stringify(editedMessage));
  }

  return reply.status(200).send(editedMessage);
};

export const deleteMessage = async (
  request: FastifyRequest<{
    Params: { id: number };
    Querystring: MessageQueryString;
  }>,
  reply: FastifyReply,
) => {
  const id = request.params.id;
  const dialogId = request.query.dialogId;
  const currentUserId = request.user.id;

  const currentDialog = await request.prisma.dialog.findUnique({
    where: { id: dialogId },
    select: { participants: true },
  });

  let recipientId: number | undefined;

  if (currentDialog?.participants) {
    recipientId = currentDialog.participants.find(
      (participant) => participant.userId !== currentUserId,
    )?.userId;
  }

  const deletedMessage = await request.prisma.message.delete({
    where: { id },
  });

  if (recipientId) {
    request.io
      .to(recipientId.toString())
      .emit('SERVER:DELETE_MESSAGE', deletedMessage.id.toString());
  }

  return reply
    .status(200)
    .send({ statusCode: 200, message: 'Message successfully deleted' });
};
