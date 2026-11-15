import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Import } from '../types';
import { deleteImport } from '../api';

export const useDeleteImport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['imports', 'delete'],
    mutationFn: (importId: Import['importId']) => deleteImport(importId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['imports'],
      });
    },
  });
};
