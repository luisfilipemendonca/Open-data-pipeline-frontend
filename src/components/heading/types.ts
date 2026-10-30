import type { PropsWithChildren, ComponentProps } from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps<T extends HeadingTag = 'h2'> = PropsWithChildren & {
  as?: T;
} & Omit<ComponentProps<T>, 'as' | 'children'>;
