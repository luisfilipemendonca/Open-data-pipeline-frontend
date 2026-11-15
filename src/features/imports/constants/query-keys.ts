import type { Pagination } from '@/types/pagination';
import type { Import } from '../types';

export const queryKeys = {
  all: ['imports'] as const,
  list: ({ page, pageSize }: Pick<Pagination, 'page' | 'pageSize'>) =>
    ['imports', { page, pageSize }] as const,
  details: (importId: Import['importId']) => ['imports', importId, 'details'] as const,
  importRows: ({
    importId,
    page,
    pageSize,
  }: Pick<Pagination, 'page' | 'pageSize'> & Pick<Import, 'importId'>) =>
    ['imports', importId, 'rows', { page, pageSize }] as const,
};
