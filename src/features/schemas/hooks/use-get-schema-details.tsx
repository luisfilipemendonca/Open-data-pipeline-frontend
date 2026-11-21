import { useQuery } from '@tanstack/react-query';
import { getSchemaDetails } from '../api';

export const useGetSchemaDetails = (schemaId: number) => {
  return useQuery({
    queryKey: ['schemas', schemaId, 'details'],
    queryFn: () => getSchemaDetails(schemaId),
  });
};
