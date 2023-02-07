import type { User } from '@lm-client/shared/types';
import { Avatar } from '@lm-client/shared/ui';

type UserCardProps = Pick<User, 'username' | 'id'>;

export const UserCard = ({ username }: UserCardProps) => {
  return (
    <div className="flex cursor-pointer items-center gap-5">
      <div className="flex items-center gap-10">
        <Avatar
          size="sm"
          username={username}
          className="flex-shrink-0 flex-grow-0 basis-auto"
        />
        <div className="flex flex-col gap-5 self-start text-14">
          <p className="line-clamp-1">{username}</p>
        </div>
      </div>
    </div>
  );
};
