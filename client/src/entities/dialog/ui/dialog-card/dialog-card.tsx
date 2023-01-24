import { formatTime } from '@lm-client/shared/libs';
import type { Dialog } from '@lm-client/shared/types';
import { Avatar } from '@lm-client/shared/ui';

type DialogCardProps = Pick<Dialog, 'lastMessage' | 'participants'> & {
  currentViewerId: number;
};

export const DialogCard = ({
  lastMessage,
  currentViewerId,
  participants,
}: DialogCardProps) => {
  const isMyLastMessage = currentViewerId === lastMessage.creator.id;
  const interlocutor = participants.find(
    (participant) => participant.userId !== currentViewerId
  );

  if (!interlocutor) {
    return null;
  }

  return (
    <div className="flex cursor-pointer items-center gap-5">
      <div className="flex items-center gap-10">
        <Avatar
          size="sm"
          username={interlocutor.user.username}
          className="flex-shrink-0 flex-grow-0 basis-auto"
        />
        <div className="flex flex-col gap-5 self-start text-14">
          <p className="line-clamp-1">{interlocutor.user.username}</p>
          <p className="line-clamp-1">
            {isMyLastMessage && (
              <span className="font-700 text-blue-500">You: </span>
            )}
            {lastMessage.text}
          </p>
        </div>
      </div>
      <div className="flex-1 self-start">
        <p className="whitespace-nowrap text-11">
          {formatTime(lastMessage.createdAt)}
        </p>
      </div>
    </div>
  );
};
