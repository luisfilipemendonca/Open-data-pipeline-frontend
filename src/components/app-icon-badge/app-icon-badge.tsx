import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type { AppIconBadgeProps } from './types';

const appIconBadgeVariants = cva('rounded-full flex items-center justify-center', {
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
    },
    variant: {
      neutral: 'bg-slate-400',
      success: 'bg-green-700',
      danger: 'bg-red-700',
    },
  },
});

export const AppIconBadge = ({
  size = 'md',
  variant = 'neutral',
  className,
  children,
}: AppIconBadgeProps) => {
  return (
    <div aria-hidden="true" className={cn(appIconBadgeVariants({ size, variant }), className)}>
      {children}
    </div>
  );
};
