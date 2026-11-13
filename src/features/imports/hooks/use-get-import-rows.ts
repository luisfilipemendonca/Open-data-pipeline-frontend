import { useQuery } from '@tanstack/react-query';
import type { Import } from '../types';
import type { Pagination } from '@/types/pagination';
import { getImportRows } from '../api';

type UseGetImportRowsProps = Pick<Pagination, 'page' | 'pageSize'> & {
  importId: Import['importId'];
};

export const useGetImportRows = ({ importId, page, pageSize }: UseGetImportRowsProps) => {
  return useQuery({
    queryKey: ['imports', importId, 'rows', { page, pageSize }],
    queryFn: () => getImportRows({ importId, page, pageSize }),
  });
};
