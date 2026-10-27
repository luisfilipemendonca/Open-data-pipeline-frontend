import { api } from '@/lib/axios';
import { mapPaginationResponse } from '@/mappers/pagination';
import type { PaginatedResponse } from '@/types/pagination';
import { mapImportsResponse } from './mappers';
import type { GetImportsResponse, ImportResponse } from './types';

export const getImports = async (): Promise<GetImportsResponse> => {
  const { data } = await api.get<PaginatedResponse<ImportResponse>>('/imports');
  return {
    data: mapImportsResponse(data.data),
    pagination: mapPaginationResponse(data.pagination),
  };
};
