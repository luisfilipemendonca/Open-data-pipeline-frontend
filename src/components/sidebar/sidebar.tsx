import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { useState } from 'react';
import type { SidebarProps } from './types';

export const Sidebar = ({ title, description, actions, triggerLabel, children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
      <DrawerTrigger render={<Button>{triggerLabel}</Button>} />
      <DrawerContent className="w-lg">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        <DrawerFooter>
          <Button onClick={actions.success.callback}>{actions.success.label}</Button>
          <DrawerClose
            render={
              <Button onClick={actions.cancel.callback} variant="outline">
                {actions.cancel.label}
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
