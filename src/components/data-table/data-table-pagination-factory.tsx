import { cn } from 'cn';
import { PaginationItem, PaginationEllipsis } from '../ui/pagination';
import {
  type DataTablePaginationButtonFactoryProps,
  type DataTablePaginationButtonProps,
} from './types';
import { Button } from '../ui/button';

const DataTablePaginationButton = ({
  page,
  isSelected,
  onPageChange,
}: DataTablePaginationButtonProps) => {
  return (
    <PaginationItem>
      <Button
        aria-selected={isSelected}
        className={cn('size-9', isSelected && 'bg-muted')}
        variant="ghost"
        onClick={() => onPageChange(page)}
      >
        {page}
      </Button>
    </PaginationItem>
  );
};

export const DataTablePaginationButtonFactory = ({
  type,
  page,
  value,
  onPageChange,
}: DataTablePaginationButtonFactoryProps) => {
  if (type === 'button') {
    return (
      <DataTablePaginationButton
        isSelected={page === value}
        page={value ?? 0}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <PaginationItem>
      <PaginationEllipsis className="items-center-safe relative top-1" />
    </PaginationItem>
  );
};
