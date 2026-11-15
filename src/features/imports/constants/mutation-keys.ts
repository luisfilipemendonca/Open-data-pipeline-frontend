export const mutationKeys = {
  all: ['imports'] as const,
  deleteImport: ['imports', 'delete'] as const,
  deleteImportRow: ['imports', 'rows', 'delete'] as const,
};
