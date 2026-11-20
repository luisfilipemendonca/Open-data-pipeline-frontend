import { usePagination } from '@/hooks/use-pagination';
import { useGetSchemas } from '../hooks/use-get-schemas';
import { Heading } from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { formatDateTime } from '@/lib/date';
import { Link, useNavigate } from '@tanstack/react-router';
import type { Schema } from '../types';

export const SchemasPage = () => {
  const { currentPage, currentPageSize, processPagination } = usePagination();
  const { data } = useGetSchemas({ page: currentPage, pageSize: currentPageSize });

  const navigate = useNavigate();

  const handleNavigateDetails = (row: Schema) => {
    navigate({
      to: '/schemas/$schemaId',
      params: {
        schemaId: row.id.toString(),
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <Heading as="h1">Schemas</Heading>
        <Link to="/">Create schema</Link>
      </div>
      <DataTable
        title="Schemas history"
        data={data?.data ?? []}
        pagination={processPagination(data?.pagination)}
        rowId={(row) => row.id}
        columns={[
          { header: 'Name', render: (row) => row.name },
          { header: 'Version', render: (row) => row.version },
          { header: 'Created at', render: (row) => formatDateTime(row.createdAt) },
          { header: 'Updated at', render: (row) => formatDateTime(row.updatedAt) },
        ]}
        actions={[
          {
            type: 'item',
            label: 'Details',
            callback: handleNavigateDetails,
          },
          {
            type: 'separator',
          },
          {
            type: 'item',
            label: 'Delete',
            callback: (row) => console.log(row.id),
            variant: 'destructive',
          },
        ]}
      />
    </div>
  );
};
