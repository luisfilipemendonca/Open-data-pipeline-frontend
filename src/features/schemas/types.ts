import type { Paginated } from '@/types/pagination';

export type SchemaResponse = {
  id: number;
  name: string | null;
  version: number;
  created_at: string;
  updated_at: string;
};

export type Schema = Pick<SchemaResponse, 'id' | 'name' | 'version'> & {
  createdAt: SchemaResponse['created_at'];
  updatedAt: SchemaResponse['updated_at'];
};

export type GetSchemasResponse = Paginated<Schema>;

export type SchemaDetailsFieldResponse = {
  name: string;
  inferred_type: string;
  required: boolean;
};

export type SchemaDetailsField = Pick<SchemaDetailsFieldResponse, 'name' | 'required'> & {
  inferredType: SchemaDetailsFieldResponse['inferred_type'];
};

export type SchemaDetailsResponse = {
  id: number;
  name: string | null;
  version: number;
  created_at: string;
  updated_at: string;
  outdated_count: number;
  fields: SchemaDetailsFieldResponse[];
};

export type SchemaDetails = Pick<SchemaDetailsResponse, 'id' | 'name' | 'version'> & {
  createdAt: SchemaDetailsResponse['created_at'];
  updatedAt: SchemaDetailsResponse['updated_at'];
  fields: SchemaDetailsField[];
};
