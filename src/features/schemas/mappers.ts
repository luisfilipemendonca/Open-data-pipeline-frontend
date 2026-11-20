import type { Schema, SchemaResponse } from './types';

export const mapSchemasResponse = (schemas: SchemaResponse[]): Schema[] => {
  return schemas.map((schema) => ({
    id: schema.id,
    version: schema.version,
    name: schema.name,
    createdAt: schema.created_at,
    updatedAt: schema.updated_at,
  }));
};
