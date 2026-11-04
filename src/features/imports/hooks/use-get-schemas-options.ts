import { useQuery } from '@tanstack/react-query';
import { getSchemasOptions } from '../api';

export const useGetSchemasOptions = () => {
  return useQuery({
    queryKey: ['schema-options'],
    queryFn: getSchemasOptions,
  });
};
