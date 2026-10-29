import { Heading } from '@/components/heading';
import { useImports } from '../hooks/use-imports';
import { DataTable } from '@/components/data-table';
import { formatDateTime } from '@/lib/date';
import { Sidebar } from '@/components/sidebar/sidebar';
import { useState } from 'react';
import type { Pagination } from '@/types/pagination';
import { Text } from '@/components/text';

const usePagination = () => {
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

export const ImportsPage = () => {
  const { currentPage, currentPageSize, processPagination } = usePagination();
  const { data } = useImports({ page: currentPage, pageSize: currentPageSize });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <Heading as="h1">Imports</Heading>
        <Sidebar
          title="Upload file"
          description="Add a .csv file to the input to upload it"
          triggerLabel="Upload file"
          actions={{
            success: { label: 'Upload file', callback: () => console.log('hello there') },
            cancel: { label: 'Cancel', callback: () => console.log('cancel there') },
          }}
        ></Sidebar>
      </div>
      <DataTable
        title="Import history"
        data={data?.data ?? []}
        rowId={(row) => row.importId}
        pagination={processPagination(data?.pagination)}
        columns={[
          { header: 'Filename', accessorKey: 'fileName', render: (row) => row.fileName },
          { header: 'Status', accessorKey: 'status', render: (row) => row.status },
          {
            header: 'Created at',
            accessorKey: 'createdAt',
            render: (row) => formatDateTime(row.createdAt),
          },
          {
            header: 'Updated at',
            accessorKey: 'updatedAt',
            render: (row) => formatDateTime(row.updatedAt),
          },
        ]}
      />
    </div>
  );
};
