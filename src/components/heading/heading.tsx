import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { type ComponentProps, type PropsWithChildren } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps<T extends HeadingTag = 'h2'> = PropsWithChildren & {
  as?: T;
} & Omit<ComponentProps<T>, 'as' | 'children'>;

const headingVariants = cva('', {
  variants: {
    as: {
      h1: 'text-heading-1',
      h2: 'text-heading-2',
      h3: 'text-heading-3',
      h4: 'text-heading-4',
      h5: 'text-heading-5',
      h6: 'text-heading-6',
    },
  },
  defaultVariants: {
    as: 'h2',
  },
});

export const Heading = <T extends HeadingTag = 'h2'>({
  as,
  children,
  className,
  ...props
}: HeadingProps<T>) => {
  const Component = as ?? 'h2';

  return (
    <Component {...props} className={cn(headingVariants({ as }), className)}>
      {children}
    </Component>
  );
};
