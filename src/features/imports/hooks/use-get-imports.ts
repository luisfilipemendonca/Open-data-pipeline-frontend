import { useQuery } from '@tanstack/react-query';
import { getImports } from '../api';
import type { Pagination } from '@/types/pagination';
import { queryKeys } from '../constants/query-keys';

export const useGetImports = ({ page, pageSize }: Pick<Pagination, 'page' | 'pageSize'>) => {
  return useQuery({
    queryKey: queryKeys.list({ page, pageSize }),
    queryFn: () => getImports({ page, pageSize }),
  });
};
