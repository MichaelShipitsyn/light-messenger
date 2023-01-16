import clsx from 'clsx';
import { forwardRef } from 'react';

type HeadingAsVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type HeadingLineClamps = 'none' | '1' | '2' | '3' | '4' | '5' | '6';

type HeadingRef<E extends HeadingAsVariants> =
  React.ComponentPropsWithRef<E>['ref'];

type HeadingBaseProps<E extends HeadingAsVariants = 'h1'> = {
  children: string;
  as?: E;
  size?: HeadingSizes;
  headingLineClamp?: HeadingLineClamps;
};

type HeadingProps<E extends HeadingAsVariants> = HeadingBaseProps<E> &
  Omit<React.ComponentPropsWithRef<E>, keyof HeadingBaseProps>;

const defaultHeadingElement = 'h1';

const headingFontSizes = {
  xl: 'text-30',
  lg: 'text-24',
  md: 'text-17',
  sm: 'text-14',
  xs: 'text-12',
};

const headingLineClamps = {
  none: 'line-clamp-none',
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

export const Heading = forwardRef(
  <E extends HeadingAsVariants>(
    {
      as,
      children,
      size = 'xl',
      headingLineClamp = '1',
      className,
      ...headingProps
    }: HeadingProps<E>,
    ref?: HeadingRef<E>
  ) => {
    const HeadingComponent = as || defaultHeadingElement;

    return (
      <HeadingComponent
        {...headingProps}
        ref={ref}
        className={clsx(
          'font-700',
          headingFontSizes[size],
          headingLineClamps[headingLineClamp],
          className
        )}
      >
        {children}
      </HeadingComponent>
    );
  }
);

Heading.displayName = 'Heading';
