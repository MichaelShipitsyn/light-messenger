import { useEffect, useRef } from 'react';

export const useOnClickOutside = <
  T extends HTMLElement,
  S extends HTMLElement = HTMLElement
>(
  handler: (event: MouseEvent | TouchEvent) => void,
  secondContainerRef?: React.RefObject<S>
) => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !containerRef.current ||
        (event.target instanceof Node &&
          containerRef.current.contains(event.target)) ||
        (event.target instanceof Node &&
          secondContainerRef?.current?.contains(event.target))
      ) {
        return;
      }
      handler(event);
    };

    window.addEventListener('mousedown', listener);
    window.addEventListener('touchstart', listener);
    return () => {
      window.removeEventListener('mousedown', listener);
      window.removeEventListener('touchstart', listener);
    };
  }, [containerRef, secondContainerRef, handler]);

  return containerRef;
};
