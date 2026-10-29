import { Button } from '../ui/button';
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination';
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DataTablePaginationProps, PaginationButtonType } from './types';
import { useMemo } from 'react';
import { DataTablePaginationButtonFactory } from './data-table-pagination-factory';

const MAX_VISIBLE_PAGES = 5;

export const DataTablePagination = ({ pagination }: DataTablePaginationProps) => {
  const { page, pageSize, total, totalPages, onPageChange } = pagination;

  const paginationButtons = useMemo(() => {
    const paginationButtonsArr: PaginationButtonType[] = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      Array.from({ length: totalPages }, (_, index) =>
        paginationButtonsArr.push({ key: `page-${index + 1}`, value: index + 1, type: 'button' }),
      );
    } else {
      if (page < MAX_VISIBLE_PAGES - 1) {
        Array.from({ length: MAX_VISIBLE_PAGES - 1 }, (_, index) => {
          paginationButtonsArr.push({ key: `page-${index + 1}`, value: index + 1, type: 'button' });
        });

        paginationButtonsArr.push(
          { key: 'ellipsis-end', type: 'ellipsis' },
          { key: `page-${totalPages}`, value: totalPages, type: 'button' },
        );
      } else if (totalPages - page < MAX_VISIBLE_PAGES - 2) {
        paginationButtonsArr.push(
          { key: 'page-1', value: 1, type: 'button' },
          { key: 'ellipsis-start', type: 'ellipsis' },
        );

        Array.from({ length: MAX_VISIBLE_PAGES - 1 }, (_, index) => {
          const offset = index + 2;
          const currentPage = totalPages - MAX_VISIBLE_PAGES + offset;
          paginationButtonsArr.push({
            key: `page-${currentPage}`,
            value: currentPage,
            type: 'button',
          });
        });
      } else {
        paginationButtonsArr.push(
          { key: 'page-1', value: 1, type: 'button' },
          { key: 'ellipsis-start', type: 'ellipsis' },
        );

        Array.from({ length: MAX_VISIBLE_PAGES - 2 }, (_, index) => {
          const currentPage = page + index - 1;
          paginationButtonsArr.push({
            key: `page-${currentPage}`,
            value: currentPage,
            type: 'button',
          });
        });

        paginationButtonsArr.push(
          { key: 'ellipsis-end', type: 'ellipsis' },
          { key: `page-${totalPages}`, value: totalPages, type: 'button' },
        );
      }
    }

    return paginationButtonsArr;
  }, [page, totalPages]);

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const hasOnlyOnePage = totalPages === 1;

  const isBackDisabled = isFirstPage || hasOnlyOnePage;
  const isForwardDisabled = isLastPage || hasOnlyOnePage;

  return (
    <div className="flex justify-between items-center">
      <div>
        Page {page} of {totalPages}
      </div>
      <Pagination className="justify-start w-fit mx-0">
        <PaginationContent>
          <PaginationItem>
            <Button className="size-9" variant="outline" disabled={isBackDisabled}>
              <ChevronsLeft className="text-black" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button className="size-9" variant="outline" disabled={isBackDisabled}>
              <ChevronLeft className="text-black" />
            </Button>
          </PaginationItem>
          {paginationButtons.map((button) => (
            <DataTablePaginationButtonFactory
              key={button.key}
              type={button.type}
              value={button?.value}
              page={page}
              onPageChange={onPageChange}
            />
          ))}
          <PaginationItem>
            <Button className="size-9" variant="outline" disabled={isForwardDisabled}>
              <ChevronRight className="text-black" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button className="size-9" variant="outline" disabled={isForwardDisabled}>
              <ChevronsRight className="text-black" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
