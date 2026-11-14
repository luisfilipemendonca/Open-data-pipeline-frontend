import type { AppIconBadgeVariants } from '@/components/app-icon-badge';
import type { CardVariants } from '@/components/card';
import type { LucideIcon } from 'lucide-react';

export type RowDetailsCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  cardVariant?: CardVariants;
  iconBadgeVariant?: AppIconBadgeVariants;
};
