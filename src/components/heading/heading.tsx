import { type ComponentProps, type PropsWithChildren } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps<T extends HeadingTag = 'h2'> = PropsWithChildren & {
  as?: T;
} & Omit<ComponentProps<T>, 'as' | 'children'>;

export const Heading = <T extends HeadingTag = 'h2'>({
  as,
  children,
  ...props
}: HeadingProps<T>) => {
  const Component = as ?? 'h2';

  return <Component {...props}>{children}</Component>;
};
