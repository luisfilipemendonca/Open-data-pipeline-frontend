import type { CardVariants } from '@/components/card';
import type { LucideIcon } from 'lucide-react';

export type RowDetailsCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  cardVariant?: CardVariants;
};
