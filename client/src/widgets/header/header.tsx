import { LogoutButton } from '@lm-client/features/auth';
import { ProfileButton } from '@lm-client/features/profile-button';
import { Heading, Menu } from '@lm-client/shared/ui';
import { useRef } from 'react';

export const Header = () => {
  const anchorEl = useRef<HTMLHeadElement>(null);

  return (
    <header
      ref={anchorEl}
      className="flex h-70 items-center gap-30 bg-blue px-20 py-16"
    >
      <Menu
        trigger={({ isOpen, toggleMenu }) => (
          <button className="text-white" onClick={toggleMenu}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-32 w-32"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-32 w-32"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        )}
        anchorElement={anchorEl}
        menu={[
          <LogoutButton key="logoutButton" />,
          <ProfileButton key="profileButton" />,
        ]}
      />
      <Heading className="text-white" size="lg">
        Light messenger
      </Heading>
    </header>
  );
};
