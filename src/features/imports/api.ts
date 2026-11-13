import { api } from '@/lib/axios';
import { mapPaginationResponse } from '@/mappers/pagination';
import type { PaginatedResponse, Pagination } from '@/types/pagination';
import { mapImportDetailsResponse, mapImportRowsResponse, mapImportsResponse } from './mappers';
import type {
  DeleteImportRowData,
  GetImportDetailsResponse,
  GetImportRowsResponse,
  GetImportsResponse,
  Import,
  ImportDetailsResponse,
  ImportResponse,
  ImportRowsResponse,
  SchemasOptionsResponse,
} from './types';

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

export const getImportDetails = async (importId: number): Promise<GetImportDetailsResponse> => {
  const { data } = await api.get<ImportDetailsResponse>(`/imports/${importId}`);

  return {
    data: mapImportDetailsResponse(data),
  };
};

export const getImportRows = async ({
  importId,
  page,
  pageSize,
}: Pick<Pagination, 'page' | 'pageSize'> & {
  importId: Import['importId'];
}): Promise<GetImportRowsResponse> => {
  const { data } = await api.get<PaginatedResponse<ImportRowsResponse>>(
    `/imports/${importId}/rows`,
    {
      params: {
        page,
        page_size: pageSize,
      },
    },
  );

  return {
    data: mapImportRowsResponse(data.data),
    pagination: mapPaginationResponse(data.pagination),
  };
};

export const deleteImportRow = async ({ importId, rowId }: DeleteImportRowData) => {
  return api.delete(`/imports/${importId}/rows/${rowId}`);
};
