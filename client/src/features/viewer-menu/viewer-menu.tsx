import { Popup } from '@lm-client/shared/ui';
import { useUnit } from 'effector-react';
import { cloneElement, useRef } from 'react';
import * as model from './model';
//! move this to shared/ui
type ViewerMenuProps<T extends HTMLElement = HTMLElement> = {
  menu: React.ReactElement[];
  anchorElement: React.RefObject<T | null>;
};

export const ViewerMenu = ({ menu, anchorElement }: ViewerMenuProps) => {
  const [viewerMenuIsOpen, viewerMenuOpenHandler] = useUnit([
    model.$viewerMenuState,
    model.viewerMenuOpened,
  ]);
  const triggerContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={triggerContainerRef} className=" flex h-full items-center">
      <button
        className="text-white"
        onClick={() => viewerMenuOpenHandler(!viewerMenuIsOpen)}
      >
        {viewerMenuIsOpen ? (
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
      {anchorElement.current && (
        <Popup
          open={viewerMenuIsOpen}
          anchorElement={anchorElement.current}
          onClose={() => viewerMenuOpenHandler(false)}
          secondContainerRef={triggerContainerRef}
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
                    menuItem.props.onCLick?.();
                    viewerMenuOpenHandler(false);
                  },
                })}
              </li>
            ))}
          </ul>
        </Popup>
      )}
    </div>
  );
};
