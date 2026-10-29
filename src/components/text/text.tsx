import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type { ComponentProps, PropsWithChildren } from 'react';

type TextTag = 'p' | 'span';

type Size = 'xsmall' | 'small' | 'base' | 'large';

type TextProps<T extends TextTag> = PropsWithChildren<{
  as?: T;
  size?: Size;
}> &
  Omit<ComponentProps<T>, 'as' | 'children' | 'ref'>;

const textVariant = cva('', {
  variants: {
    size: {
      xsmall: 'text-xs',
      small: 'text-sm',
      base: 'text-base',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export const Text = <T extends TextTag = 'p'>({
  as,
  children,
  className,
  size = 'base',
  ...props
}: TextProps<T>) => {
  const Component = as ?? 'p';

  return (
    <Component {...props} className={cn(textVariant({ size }), className)}>
      {children}
    </Component>
  );
};
