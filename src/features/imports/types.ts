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
