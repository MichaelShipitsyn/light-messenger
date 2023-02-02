import { Popup } from '@lm-client/shared/ui';
import { cloneElement, useRef, useState } from 'react';

type MenuProps<T extends HTMLElement = HTMLElement> = {
  menu: React.ReactElement[];
  anchorElement: React.RefObject<T | null>;
  trigger: (props: {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
    openMenu: () => void;
  }) => React.ReactElement;
};

export const Menu = ({ menu, trigger, anchorElement }: MenuProps) => {
  const [isOpen, setOpen] = useState(false);
  const triggerContainerRef = useRef<HTMLDivElement>(null);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleToggleMenu = () => {
    setOpen((currentValue) => !currentValue);
  };

  return (
    <div ref={triggerContainerRef} className="flex h-full items-center">
      {trigger({
        isOpen,
        openMenu: handleOpenMenu,
        closeMenu: handleCloseMenu,
        toggleMenu: handleToggleMenu,
      })}
      {
        <Popup
          open={isOpen}
          anchorElement={anchorElement}
          onClose={handleCloseMenu}
          triggerRef={triggerContainerRef}
          className="w-200"
        >
          <ul>
            {menu.map((menuItem, index) => (
              <li
                className="cursor-pointer px-20 py-5 transition-colors hover:bg-blue hover:text-white"
                key={index}
              >
                {cloneElement(menuItem, {
                  onClick: () => {
                    menuItem.props.onClick?.();
                    handleCloseMenu();
                  },
                })}
              </li>
            ))}
          </ul>
        </Popup>
      }
    </div>
  );
};
