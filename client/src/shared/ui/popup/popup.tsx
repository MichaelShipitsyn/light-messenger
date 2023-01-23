import { useLayoutEffect, useState } from 'react';
import { Portal } from '@lm-client/shared/ui';
import { useOnClickOutside } from '@lm-client/shared/hooks';
import clsx from 'clsx';

type PopupProps<
  T extends HTMLElement = HTMLElement,
  S extends HTMLElement = HTMLElement
> = {
  open: boolean;
  onClose: () => void;
  anchorElement: React.RefObject<T | null>;
  children: React.ReactNode;
  className?: string;
  triggerRef?: React.RefObject<S | null>;
};

export const Popup = ({
  open,
  onClose,
  anchorElement,
  children,
  className,
  triggerRef,
}: PopupProps) => {
  const containerRef = useOnClickOutside<HTMLDivElement>(onClose, triggerRef);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const anchorCurrent = anchorElement.current;

    if (!anchorCurrent) return;

    const setPosition = () => {
      const anchorRect = anchorCurrent.getBoundingClientRect();
      setLeft(anchorRect.left);
      setTop(anchorRect.top + anchorRect.height);
    };
    setPosition();

    window.addEventListener('resize', setPosition);
    return () => {
      window.removeEventListener('resize', setPosition);
    };
  }, [anchorElement]);

  return (
    <Portal>
      {open && (
        <div
          style={{ left, top }}
          className={clsx(
            'absolute z-10 min-w-min rounded-8 bg-white py-10 shadow-popup',
            { ['animate-fadeIn']: open },
            className
          )}
          ref={containerRef}
        >
          {children}
        </div>
      )}
    </Portal>
  );
};
