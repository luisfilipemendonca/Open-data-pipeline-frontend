import type { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '../ui/button';
import { Button as ButtonPrimitive } from '@base-ui/react/button';

export const AppButton = ({
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  return <Button {...props}>{children}</Button>;
};
