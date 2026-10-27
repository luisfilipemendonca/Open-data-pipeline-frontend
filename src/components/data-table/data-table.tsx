import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import type { DataTableProps } from './data-table.types';

import { DataTableActions } from './data-table-actions';
import { useDataTable } from './data-table.hook';

export const DataTable = <T extends object>({
  title,
  data,
  actions,
  columns,
  rowId,
}: DataTableProps<T>) => {
  const { tableTitleId } = useDataTable();

  return (
    <>
      {title && <h2 id={tableTitleId}>{title}</h2>}
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
    </>
  );
};
