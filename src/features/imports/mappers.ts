import type { Import, ImportResponse } from './types';

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
