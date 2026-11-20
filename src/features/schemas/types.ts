import type { Paginated } from '@/types/pagination';

export type SchemaResponse = {
  id: number;
  name: string | null;
  version: number;
  created_at: string;
  updated_at: string;
};

export type Schema = Pick<SchemaResponse, 'id' | 'name' | 'version'> & {
  createdAt: string;
  updatedAt: string;
};

export type GetSchemasResponse = Paginated<Schema>;
