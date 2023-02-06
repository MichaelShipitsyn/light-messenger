import { formatTimeMessage } from '@lm-client/shared/libs';
import { Text } from '@lm-client/shared/ui';
import clsx from 'clsx';

type MessageBubbleProps = {
  text: string;
  viewerId: null | number;
  creatorId: number;
  time: string;
};

export const MessageBubble = ({
  text,
  viewerId,
  creatorId,
  time,
}: MessageBubbleProps) => {
  return (
    <div className="flex">
      <div
        className={clsx('flex flex-1', {
          ['flex-row-reverse']: viewerId === creatorId,
        })}
      >
        <div
          className={clsx(
            'flex max-w-2/3 flex-col gap-8 rounded-20 bg-blue p-16',
            {
              ['rounded-br-8']: viewerId === creatorId,
              ['rounded-bl-8']: viewerId !== creatorId,
            }
          )}
        >
          <Text className="break-words text-white">{text}</Text>
          <span
            className={clsx('text-11 font-700 text-white', {
              ['self-end']: viewerId !== creatorId,
            })}
          >
            {formatTimeMessage(time)}
          </span>
        </div>
      </div>
    </div>
  );
};
