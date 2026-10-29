import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '../ui/pagination';
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DataTablePaginationProps, BaseDataTablePagination } from './data-table.types';
import { useMemo } from 'react';
import { cn } from 'cn';

type DataTablePaginationButtonProps = Pick<BaseDataTablePagination, 'page' | 'onPageChange'> & {
  isSelected: boolean;
};

const DataTablePaginationButton = ({
  page,
  isSelected,
  onPageChange,
}: DataTablePaginationButtonProps) => {
  return (
    <PaginationItem>
      <Button
        className={cn('size-9', isSelected && 'bg-muted')}
        variant="ghost"
        onClick={() => onPageChange(page)}
      >
        {page}
      </Button>
    </PaginationItem>
  );
};

const MAX_VISIBLE_PAGES = 5;

export const DataTablePagination = ({ pagination }: DataTablePaginationProps) => {
  const { page, pageSize, total, totalPages, onPageChange } = pagination;

  const PaginationButtons = useMemo(() => {
    const paginationButtons = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      Array.from({ length: totalPages }, (_, index) =>
        paginationButtons.push({ key: `page-${index + 1}`, value: index + 1 }),
      );
    } else {
      if (page < MAX_VISIBLE_PAGES - 1) {
        Array.from({ length: MAX_VISIBLE_PAGES - 1 }, (_, index) => {
          paginationButtons.push({ key: `page-${index + 1}`, value: index + 1 });
        });

        paginationButtons.push(
          { key: 'ellipsis-end' },
          { key: `page-${totalPages}`, value: totalPages },
        );
      } else if (totalPages - page < MAX_VISIBLE_PAGES - 2) {
        paginationButtons.push({ key: 'page-1', value: 1 }, { key: 'ellipsis-start' });

        Array.from({ length: MAX_VISIBLE_PAGES - 1 }, (_, index) => {
          const offset = index + 2;
          const currentPage = totalPages - MAX_VISIBLE_PAGES + offset;
          paginationButtons.push({ key: `page-${currentPage}`, value: currentPage });
        });
      } else {
        paginationButtons.push({ key: 'page-1', value: 1 }, { key: 'ellipsis-start' });

        Array.from({ length: MAX_VISIBLE_PAGES - 2 }, (_, index) => {
          const currentPage = page + index - 1;
          paginationButtons.push({ key: `page-${currentPage}`, value: currentPage });
        });

        paginationButtons.push(
          { key: 'ellipsis-end' },
          { key: `page-${totalPages}`, value: totalPages },
        );
      }
    }

    return paginationButtons.map((paginationButton) => {
      if (paginationButton.value) {
        return (
          <DataTablePaginationButton
            isSelected={page === paginationButton.value}
            key={paginationButton.key}
            page={paginationButton.value}
            onPageChange={onPageChange}
          />
        );
      }

      return (
        <PaginationItem key={paginationButton.key}>
          <PaginationEllipsis className="items-center-safe relative top-1" />
        </PaginationItem>
      );
    });
  }, [page, totalPages, onPageChange]);

  return (
    <div className="flex justify-between items-center">
      <div>
        Page {page} of {totalPages}
      </div>
      <Pagination className="justify-start w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <Button className="size-9" variant="outline">
              <ChevronsLeft className="text-black" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button className="size-9" variant="outline">
              <ChevronLeft className="text-black" />
            </Button>
          </PaginationItem>
          {PaginationButtons}
          <PaginationItem>
            <Button className="size-9" variant="outline">
              <ChevronRight className="text-black" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button className="size-9" variant="outline">
              <ChevronsRight className="text-black" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
