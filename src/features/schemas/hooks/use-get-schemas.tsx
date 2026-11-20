import { useQuery } from '@tanstack/react-query';
import { getSchemas } from '../api';
import type { Pagination } from '@/types/pagination';

export const useGetSchemas = ({ page, pageSize }: Pick<Pagination, 'page' | 'pageSize'>) => {
  return useQuery({
    queryKey: ['schemas', { page, pageSize }],
    queryFn: () => getSchemas({ page, pageSize }),
  });
};
