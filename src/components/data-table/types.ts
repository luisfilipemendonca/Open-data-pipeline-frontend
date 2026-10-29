import type { Pagination } from '@/types/pagination';
import type { ReactNode } from 'react';

export type DataTableColumn<T extends object> = {
  accessorKey: keyof T;
  header: string;
  render: (row: T) => ReactNode;
};

export type DataTableAction<T extends object> = {
  label: string;
  callback: (row: T) => void;
};

export type BaseDataTablePagination = Pagination & {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

export type DataTableProps<T extends object> = {
  title?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  pagination?: BaseDataTablePagination;
  rowId: (row: T) => string | number;
};

export type DataTablePaginationProps = {
  pagination: BaseDataTablePagination;
};

export type DataTableActionsProps<T extends object> = {
  row: T;
  actions: DataTableAction<T>[];
};

export type DataTablePaginationButtonProps = Pick<
  BaseDataTablePagination,
  'page' | 'onPageChange'
> & {
  isSelected: boolean;
};

export type PaginationButtonType = {
  type: 'button' | 'ellipsis';
  key: string;
  value?: number;
};

export type DataTablePaginationButtonFactoryProps = Omit<PaginationButtonType, 'key'> &
  Omit<DataTablePaginationButtonProps, 'isSelected'>;
