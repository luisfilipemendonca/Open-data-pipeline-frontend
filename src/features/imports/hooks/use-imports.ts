import { useQuery } from '@tanstack/react-query';
import { getImports } from '../api';
import type { Pagination } from '@/types/pagination';

export const useImports = ({ page, pageSize }: Pick<Pagination, 'page' | 'pageSize'>) => {
  return useQuery({
    queryKey: ['imports', { page, pageSize }],
    queryFn: () => getImports({ page, pageSize }),
  });
};
