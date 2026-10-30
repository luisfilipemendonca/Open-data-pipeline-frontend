import type { PropsWithChildren, ComponentProps } from 'react';

export type TextTag = 'p' | 'span';

export type Size = 'xsmall' | 'small' | 'base' | 'large';
export type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

export type TextProps<T extends TextTag> = PropsWithChildren<{
  as?: T;
  size?: Size;
  weight?: Weight;
}> &
  Omit<ComponentProps<T>, 'as' | 'children' | 'ref'>;
