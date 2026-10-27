import { Heading } from '@/components/heading';
import { useImports } from '../hooks/use-imports';
import { DataTable } from '@/components/data-table';
import { formatDateTime } from '@/lib/date';

export const ImportsPage = () => {
  const { data } = useImports();

  return (
    <div>
      <Heading as="h1">Imports page</Heading>
      <DataTable
        data={data?.data ?? []}
        rowId={(row) => row.importId}
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
