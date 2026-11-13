import { Badge } from '../ui/badge';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type { AppBadgeProps } from './types';

const appBadgeVariants = cva('', {
  variants: {
    size: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-5',
    },
  },
});

export const AppBadge = ({ children, size = 'md', className, ...props }: AppBadgeProps) => {
  return (
    <Badge className={cn(appBadgeVariants({ size }), className)} {...props}>
      {children}
    </Badge>
  );
};
