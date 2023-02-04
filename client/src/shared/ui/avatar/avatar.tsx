import { stringToColor } from '@lm-client/shared/libs';
import clsx from 'clsx';

type AvatarSizes = 'lg' | 'md' | 'sm' | 'xs';

type BaseAvatarProps = {
  size: AvatarSizes;
  className?: string;
};

type PrimaryAvatarProps = BaseAvatarProps & {
  src: string;
  username?: string;
};

type SecondaryAvatarProps = BaseAvatarProps & {
  src?: string;
  username: string;
};

type AvatarProps = PrimaryAvatarProps | SecondaryAvatarProps;

const sizes = {
  lg: 'h-60 w-60 text-24',
  md: 'h-48 w-48',
  sm: 'h-40 w-40',
  xs: 'h-32 w-32',
} as const;

export const Avatar = ({
  size = 'sm',
  className,
  src,
  username,
}: AvatarProps) => {
  if (!src && username) {
    return (
      <div
        className={clsx(
          'flex items-center justify-center rounded-full',
          sizes[size],
          className
        )}
        style={{
          backgroundColor: stringToColor(username),
        }}
      >
        {username[0].toUpperCase()}
      </div>
    );
  }

  return (
    <div className={clsx('rounded-full', sizes[size], className)}>
      <img src={src} alt="Avatar" />
    </div>
  );
};
