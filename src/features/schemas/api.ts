import { api } from '@/lib/axios';
import type { GetSchemasResponse, SchemaResponse } from './types';
import type { PaginatedResponse, Pagination } from '@/types/pagination';
import { mapPaginationResponse } from '@/mappers/pagination';
import { mapSchemasResponse } from './mappers';

export const getSchemas = async ({
  page,
  pageSize,
}: Pick<Pagination, 'page' | 'pageSize'>): Promise<GetSchemasResponse> => {
  const { data } = await api.get<PaginatedResponse<SchemaResponse>>('/schemas', {
    params: {
      page,
      page_size: pageSize,
    },
  });

  return {
    data: mapSchemasResponse(data.data),
    pagination: mapPaginationResponse(data.pagination),
  };
};
