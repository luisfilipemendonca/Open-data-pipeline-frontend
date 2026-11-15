import { useQuery } from '@tanstack/react-query';
import type { Import } from '../types';
import type { Pagination } from '@/types/pagination';
import { getImportRows } from '../api';
import { queryKeys } from '../constants/query-keys';

type UseGetImportRowsProps = Pick<Pagination, 'page' | 'pageSize'> & {
  importId: Import['importId'];
};

export const useGetImportRows = ({ importId, page, pageSize }: UseGetImportRowsProps) => {
  return useQuery({
    queryKey: queryKeys.importRows({ importId, page, pageSize }),
    queryFn: () => getImportRows({ importId, page, pageSize }),
  });
};
