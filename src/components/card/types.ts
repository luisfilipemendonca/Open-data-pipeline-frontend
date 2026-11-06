import type { PropsWithChildren } from 'react';

export type CardVariants = 'neutral' | 'success' | 'warning' | 'danger';

export type CardProps = PropsWithChildren<{
  className?: string;
  variant?: CardVariants;
}>;
