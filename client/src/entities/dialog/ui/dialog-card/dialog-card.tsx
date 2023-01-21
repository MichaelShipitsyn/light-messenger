import type { Dialog } from '@lm-client/shared/types';

type DialogCardProps = Pick<Dialog, 'id' | 'lastMessage' | 'participants'> & {
  currentViewerId: number;
};

export const DialogCard = ({
  id,
  lastMessage,
  currentViewerId,
  participants,
}: DialogCardProps) => {
  const isMyLastMessage = currentViewerId === lastMessage.creator.id;
  const interlocutor = participants.find(
    (participant) => participant.userId !== currentViewerId
  );
  //? use dayjs for formatting dates

  return (
    <div className="flex cursor-pointer items-center gap-5">
      <div className="flex items-center gap-10">
        <div className="h-48 w-48 rounded-full bg-black-200">
          <img src="" alt="Avatar" />
        </div>
        <div className="flex flex-col gap-5 text-14">
          <p className="line-clamp-1">{interlocutor?.user.username}</p>
          <p className="line-clamp-1">
            {isMyLastMessage && (
              <span className="font-700 text-blue-500">You: </span>
            )}
            {lastMessage.text}
          </p>
        </div>
      </div>
      <div className="flex-1 self-start">
        <p className="whitespace-nowrap text-11">1:13 AM</p>
      </div>
    </div>
  );
};
