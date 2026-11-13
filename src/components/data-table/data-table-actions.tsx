import { Button } from '../ui/button';
import { MoreHorizontalIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import type { DataTableActionsProps } from './types';

export const DataTableActions = <T extends object>({ row, actions }: DataTableActionsProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          if (action.type === 'separator') {
            return <DropdownMenuSeparator key={`${action.type}-${index}`} />;
          }

          return (
            <DropdownMenuItem
              className="cursor-pointer"
              key={action.label}
              onClick={() => action.callback(row)}
              variant={action.variant ?? 'default'}
            >
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
