import type {
  Import,
  ImportDetails,
  ImportDetailsResponse,
  ImportResponse,
  ImportRows,
  ImportRowsResponse,
} from './types';

export const mapImportsResponse = (records: ImportResponse[]): Import[] => {
  return records.map((record) => ({
    importId: record.import_id,
    status: record.status,
    fileName: record.file_name,
    downloadUrl: record.download_url,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  }));
};

export const mapImportDetailsResponse = (importDetails: ImportDetailsResponse): ImportDetails => {
  return {
    importId: importDetails.import_id,
    status: importDetails.status,
    downloadUrl: importDetails.download_url,
    fileName: importDetails.file_name,
    createdAt: importDetails.created_at,
    updatedAt: importDetails.updated_at,
    schemaName: importDetails.schema_name,
    summary: {
      totalRows: importDetails.summary.total_rows,
      totalValidRows: importDetails.summary.total_valid_rows,
      totalInvalidRows: importDetails.summary.total_invalid_rows,
      errors: importDetails.summary.errors,
    },
  };
};

export const mapImportRowsResponse = (importRows: ImportRowsResponse[]): ImportRows[] => {
  return importRows.map((importRow) => ({
    id: importRow.id,
    data: importRow.data,
    rowNumber: importRow.row_number,
    isValid: importRow.is_valid,
  }));
};
