import type { Pagination } from '@/types/pagination';
import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPageSize(pageSize);
  };

  const processPagination = (pagination: Pagination | undefined) => {
    if (!pagination) return undefined;

    return {
      ...pagination,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    };
  };

  return {
    currentPage,
    currentPageSize,
    processPagination,
  };
};
