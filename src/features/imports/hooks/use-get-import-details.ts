import { useQuery } from '@tanstack/react-query';
import { getImportDetails } from '../api';
import { queryKeys } from '../constants/query-keys';
import type { Import } from '../types';

export const useGetImportDetails = (importId: Import['importId']) => {
  return useQuery({
    queryKey: queryKeys.details(importId),
    queryFn: () => getImportDetails(importId),
  });
};
