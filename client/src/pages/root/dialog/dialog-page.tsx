import { list } from '@effector/reflect';
import { MessageBubble } from '@lm-client/entities/message';
import { SendMessageForm } from '@lm-client/features/send-message-form';
import { routes } from '@lm-client/shared/routes';
import { getMessages } from './libs';
import * as viewerModel from '@lm-client/entities/viewer';
import * as dialogModel from '@lm-client/entities/dialog';
import type { Message } from '@lm-client/shared/types';
import './model';

export const DialogPage = () => {
  return (
    <div>
      <div className="flex h-[calc(100vh-2rem-5rem-7.1rem)] flex-col-reverse gap-16 overflow-y-auto p-13">
        <MessagesList />
      </div>
      <SendMessageForm />
    </div>
  );
};

const MessagesList = list<
  Message,
  Pick<Message, 'id' | 'text' | 'creatorId'> & {
    viewerId: number | null;
    time: string;
  }
>({
  view: MessageBubble,
  source: getMessages(dialogModel.$dialogs, routes.app.dialog.$params),
  bind: {
    viewerId: viewerModel.$viewerId,
  },
  mapItem: {
    id: (message) => message.id,
    text: (message) => message.text,
    time: (message) => message.createdAt,
    creatorId: (message) => message.creatorId,
  },
});
