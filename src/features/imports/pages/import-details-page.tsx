import { usePagination } from '@/hooks/use-pagination';
import { useGetImportRows } from '../hooks/use-get-import-rows';
import { ImportDetails } from '../components/import-details';
import { DataTable } from '@/components/data-table';
import type { ImportRows } from '../types';
import { useMemo } from 'react';
import type { DataTableProps } from '@/components/data-table/types';
import { AppBadge } from '@/components/app-badge';
import { AppBullet } from '@/components/app-bullet';

export const ImportDetailsPage = () => {
  const { currentPage, currentPageSize, processPagination } = usePagination();

  const { data } = useGetImportRows({ importId: 41, page: currentPage, pageSize: currentPageSize });

  const columns = useMemo((): DataTableProps<ImportRows>['columns'] => {
    if (!data?.data[0]) return undefined;

    const errorMap = new Map();

    data.data
      .filter((row) => !row.isValid)
      .forEach((row) => {
        let savedErrors = errorMap.get(row.id);

        if (!savedErrors) {
          savedErrors = [];
        }

        const rowErrors = row.data.filter((value) => value.error);

        rowErrors.forEach((rowValue) => {
          errorMap.set(row.id, [...savedErrors, rowValue.error]);
        });
      });

    return [
      {
        header: 'Line',
        render: (row) => row.rowNumber,
      },
      ...data.data[0].data
        .map((column, index) => ({
          header: column.column,
          render: (row: ImportRows) => row.data[index].value,
        }))
        .filter((column) => column.header !== 'id'),
      {
        header: 'Status',
        render: (row) =>
          row.isValid ? (
            <AppBadge className="flex items-center">
              <AppBullet />
              Valid
            </AppBadge>
          ) : (
            <AppBadge variant="destructive" className="flex items-center">
              <AppBullet />
              Error
            </AppBadge>
          ),
      },
      {
        header: 'Errors',
        render: (row) => {
          const rowErrors = errorMap.get(row.id);

          return rowErrors ? rowErrors.join(',') : '';
        },
      },
    ];
  }, [data]);

  return (
    <div className="flex flex-col gap-8">
      <ImportDetails />
      <DataTable
        title="Import records"
        rowId={(row) => row.id}
        data={data?.data ?? []}
        columns={columns}
        pagination={processPagination(data?.pagination)}
      />
    </div>
  );
};
