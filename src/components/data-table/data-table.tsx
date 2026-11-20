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
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm shadow-[0_0_2px] shadow-slate-300">
      {title && <Heading id={tableTitleId}>{title}</Heading>}
      <div className="overflow-hidden shadow-[0_0_2px] shadow-slate-300 rounded-sm ">
        <Table aria-labelledby={title ? tableTitleId : undefined} className="bg-white">
          <TableHeader className="bg-slate-100">
            <TableRow>
              {columns?.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
              {actions && <TableHead className="text-end">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={rowId(row)}>
                {columns?.map((column) => (
                  <TableCell key={`${rowId(row)}-${column.header}`}>{column.render(row)}</TableCell>
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
      </div>
      {pagination && <DataTablePagination pagination={pagination} />}
    </div>
  );
};
