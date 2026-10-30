import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type { TextProps, TextTag } from './types';

const textVariant = cva('', {
  variants: {
    size: {
      xsmall: 'text-xs',
      small: 'text-sm',
      base: 'text-base',
      large: 'text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
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
  weight = 'normal',
  size = 'base',
  ...props
}: TextProps<T>) => {
  const Component = as ?? 'p';

  return (
    <Component {...props} className={cn(textVariant({ size, weight }), className)}>
      {children}
    </Component>
  );
};
