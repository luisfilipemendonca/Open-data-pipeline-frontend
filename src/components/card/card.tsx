import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import type { CardProps } from './types';

const cardVariants = cva('shadow-[0_0_2px] rounded-sm p-4', {
  variants: {
    variant: {
      neutral: 'bg-white shadow-slate-300',
      success: 'bg-green-50 shadow-green-300',
      warning: 'bg-amber-50 shadow-amber-300',
      danger: 'bg-red-50 shadow-red-300',
    },
  },
});

export const Card = ({ className, variant = 'neutral', children }: CardProps) => {
  return <div className={cn(cardVariants({ variant }), className)}>{children}</div>;
};
