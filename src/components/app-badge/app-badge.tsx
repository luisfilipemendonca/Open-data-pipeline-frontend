import type { useRender } from '@base-ui/react';
import { Badge, badgeVariants } from '../ui/badge';
import type { VariantProps } from 'class-variance-authority';

export const AppBadge = ({
  children,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) => {
  return <Badge {...props}>{children}</Badge>;
};
