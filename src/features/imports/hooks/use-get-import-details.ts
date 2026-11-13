import { useQuery } from '@tanstack/react-query';
import { getImportDetails } from '../api';

export const useGetImportDetails = (importId: number) => {
  return useQuery({
    queryKey: ['imports', importId, 'details'],
    queryFn: () => getImportDetails(importId),
  });
};
