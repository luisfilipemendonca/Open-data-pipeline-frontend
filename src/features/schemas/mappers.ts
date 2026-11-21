import type { Schema, SchemaDetails, SchemaDetailsResponse, SchemaResponse } from './types';

export const mapSchemasResponse = (schemas: SchemaResponse[]): Schema[] => {
  return schemas.map((schema) => ({
    id: schema.id,
    version: schema.version,
    name: schema.name,
    createdAt: schema.created_at,
    updatedAt: schema.updated_at,
  }));
};

export const mapSchemaDetailsResponse = (schemaDetails: SchemaDetailsResponse): SchemaDetails => {
  return {
    ...schemaDetails,
    createdAt: schemaDetails.created_at,
    updatedAt: schemaDetails.updated_at,
    fields: schemaDetails.fields.map((field) => ({
      ...field,
      inferredType: field.inferred_type,
    })),
  };
};
