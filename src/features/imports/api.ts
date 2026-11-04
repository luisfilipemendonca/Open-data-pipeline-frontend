import { api } from '@/lib/axios';
import { mapPaginationResponse } from '@/mappers/pagination';
import type { PaginatedResponse, Pagination } from '@/types/pagination';
import { mapImportsResponse } from './mappers';
import type { GetImportsResponse, ImportResponse, SchemasOptionsResponse } from './types';

export const getImports = async ({
  page,
  pageSize,
}: Pick<Pagination, 'page' | 'pageSize'>): Promise<GetImportsResponse> => {
  const { data } = await api.get<PaginatedResponse<ImportResponse>>('/imports', {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return {
    data: mapImportsResponse(data.data),
    pagination: mapPaginationResponse(data.pagination),
  };
};

export const getSchemasOptions = async (): Promise<SchemasOptionsResponse> => {
  const { data } = await api.get<SchemasOptionsResponse>('/schemas/options');

  return data;
};
