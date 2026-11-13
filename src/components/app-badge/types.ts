import type { useRender } from '@base-ui/react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from '../ui/badge';

export type AppBadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    size?: 'sm' | 'md' | 'lg';
  };
