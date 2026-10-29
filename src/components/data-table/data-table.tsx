import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import type { DataTableProps } from './types';

import { DataTableActions } from './data-table-actions';
import { useDataTable } from './data-table.hook';
import { Heading } from '../heading';
import { DataTablePagination } from './data-table-pagination';

export const DataTable = <T extends object>({
  title,
  data,
  actions,
  columns,
  pagination,
  rowId,
}: DataTableProps<T>) => {
  const { tableTitleId } = useDataTable();

  return (
    <div className="flex flex-col gap-8">
      {title && <Heading id={tableTitleId}>{title}</Heading>}
      <Table aria-labelledby={title ? tableTitleId : undefined}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey.toString()}>{column.header}</TableHead>
            ))}
            {actions && <TableHead className="text-end">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={rowId(row)}>
              {columns.map((column) => (
                <TableCell key={`${rowId(row)}-${column.accessorKey.toString()}`}>
                  {column.render(row)}
                </TableCell>
              ))}
              {actions && (
                <TableCell className="text-end">
                  <DataTableActions actions={actions} row={row} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pagination && <DataTablePagination pagination={pagination} />}
    </div>
  );
};
