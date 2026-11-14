import type { PropsWithChildren } from 'react';

export type AppIconBadgeVariants = 'neutral' | 'success' | 'danger';

export type AppIconBadgeProps = PropsWithChildren<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: AppIconBadgeVariants;
}>;
