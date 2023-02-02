import { useUnit } from 'effector-react';
import * as model from './model';

type LogoutButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  const logoutHandler = useUnit(model.buttonClicked);

  return (
    <button
      onClick={(event) => (logoutHandler(), onClick?.(event))}
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
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      Logout
    </button>
  );
};
