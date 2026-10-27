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

export type DataTableProps<T extends object> = {
  title?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
  rowId: (row: T) => string | number;
};

export type DataTableActionsProps<T extends object> = {
  row: T;
  actions: DataTableAction<T>[];
};
