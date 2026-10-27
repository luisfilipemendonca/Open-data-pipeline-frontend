import { useQuery } from '@tanstack/react-query';
import { getImports } from '../api';

export const useImports = () => {
  return useQuery({
    queryKey: ['imports'],
    queryFn: () => getImports(),
  });
};
