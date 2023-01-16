import { LogoutButton } from '@lm-client/features/auth';
import { ProfileButton } from '@lm-client/features/profile-button';
import { ViewerMenu } from '@lm-client/features/viewer-menu';
import { Heading } from '@lm-client/shared/ui';
import { useRef } from 'react';

export const Header = () => {
  const anchorEl = useRef<HTMLHeadElement>(null);

  return (
    <header
      ref={anchorEl}
      className="flex h-70 items-center gap-30 bg-blue px-20 py-16"
    >
      <ViewerMenu
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
