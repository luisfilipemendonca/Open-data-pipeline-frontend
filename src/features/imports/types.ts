import type { SelectOption } from '@/components/select-field';
import type { Paginated } from '@/types/pagination';

export type ImportResponse = {
  import_id: number;
  status: string;
  file_name: string;
  download_url: string;
  created_at: string;
  updated_at: string;
};

export type Import = {
  importId: number;
  status: string;
  fileName: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type GetImportsResponse = Paginated<Import>;

export type SchemasOptionsResponse = {
  data: SelectOption[];
};

export type ImportDetailsFieldsErrorsResponse = {
  field: string;
  count: number;
  reasons: string[];
};

export type ImportDetailsSummaryResponse = {
  total_rows: number;
  total_valid_rows: number;
  total_invalid_rows: number;
  errors: ImportDetailsFieldsErrorsResponse[];
};

export type ImportDetailsResponse = {
  import_id: number;
  status: string;
  download_url: string;
  file_name: string;
  created_at: string;
  updated_at: string;
  schema_name: string | null;
  summary: ImportDetailsSummaryResponse;
};

type ImportDetailsSummary = {
  totalRows: number;
  totalValidRows: number;
  totalInvalidRows: number;
  errors: ImportDetailsFieldsErrorsResponse[];
};

export type ImportDetails = {
  importId: number;
  status: string;
  downloadUrl: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  schemaName: string | null;
  summary: ImportDetailsSummary;
};

export type GetImportDetailsResponse = {
  data: ImportDetails;
};

export type ImportRowData = {
  column: string;
  value: string;
  error: string | null;
};

export type ImportRowsResponse = {
  id: number;
  row_number: number;
  data: ImportRowData[];
  is_valid: boolean;
};

export type ImportRows = {
  id: number;
  rowNumber: number;
  data: ImportRowData[];
  isValid: boolean;
};

export type GetImportRowsResponse = Paginated<ImportRows>;
