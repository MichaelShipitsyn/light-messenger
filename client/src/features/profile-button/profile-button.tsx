import { useUnit } from 'effector-react';
import * as model from './model';

type ProfileButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ProfileButton = ({ onClick }: ProfileButtonProps) => {
  const profileButtonHandler = useUnit(model.profileButtonClicked);

  return (
    <button
      onClick={(event) => (profileButtonHandler(), onClick?.(event))}
      className="flex items-center gap-10 text-14"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-20 w-20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      Profile
    </button>
  );
};
