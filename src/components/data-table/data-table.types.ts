import type { ReactNode } from 'react';

export type DataTableColumn<T extends { id: number }> = {
  accessorKey: keyof T;
  header: string;
  render: (row: T) => ReactNode;
};

export type DataTableAction<T extends { id: number }> = {
  label: string;
  callback: (row: T) => void;
};

export type DataTableProps<T extends { id: number }> = {
  title?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  actions?: DataTableAction<T>[];
};

export type DataTableActionsProps<T extends { id: number }> = {
  row: T;
  actions: DataTableAction<T>[];
};
