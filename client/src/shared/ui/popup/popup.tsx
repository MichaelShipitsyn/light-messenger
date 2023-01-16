import { useMemo } from 'react';
import { Portal } from '@lm-client/shared/ui';
import { useOnClickOutside } from '@lm-client/shared/hooks';
import clsx from 'clsx';

type PopupProps<
  T extends HTMLElement = HTMLElement,
  S extends HTMLElement = HTMLElement
> = {
  open: boolean;
  onClose: () => void;
  anchorElement: T;
  children: React.ReactNode;
  className?: string;
  secondContainerRef?: React.RefObject<S>;
};

export const Popup = ({
  open,
  onClose,
  anchorElement,
  children,
  className,
  secondContainerRef,
}: PopupProps) => {
  const containerRef = useOnClickOutside<HTMLDivElement>(
    onClose,
    secondContainerRef
  );

  const { left, top } = useMemo(() => {
    const anchorRect = anchorElement.getBoundingClientRect();

    const left = anchorRect.left;
    const top = anchorRect.top + anchorRect.height;

    return { left, top };
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
