import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type { CardProps } from './types';

const cardVariants = cva('border rounded-sm p-4', {
  variants: {
    variant: {
      neutral: 'bg-white',
      success: 'bg-green-50 border-green-200',
      warning: 'bg-amber-50 border-amber-200',
      danger: 'bg-red-50 border-red-200',
    },
  },
});

export const Card = ({ className, variant = 'neutral', children }: CardProps) => {
  return <div className={cn(cardVariants({ variant }), className)}>{children}</div>;
};
