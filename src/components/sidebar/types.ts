import type { PropsWithChildren } from 'react';

export type SidebarProps = PropsWithChildren & {
  title: string;
  description?: string;
  triggerLabel: string;
  actions: {
    success: {
      label: string;
      callback: () => void;
    };
    cancel: {
      label: string;
      callback?: () => void;
    };
  };
};
