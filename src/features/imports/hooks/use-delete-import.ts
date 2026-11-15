import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Import } from '../types';
import { deleteImport } from '../api';
import { mutationKeys } from '../constants/mutation-keys';

export const useDeleteImport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteImport,
    mutationFn: (importId: Import['importId']) => deleteImport(importId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['imports'],
      });
    },
  });
};
