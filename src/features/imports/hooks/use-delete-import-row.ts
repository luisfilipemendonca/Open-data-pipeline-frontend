import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImportRow } from '../api';
import type { DeleteImportRowData } from '../types';

export const useDeleteImportRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['import', 'rows', 'delete'],
    mutationFn: ({ importId, rowId }: DeleteImportRowData) => deleteImportRow({ importId, rowId }),
    onSuccess: (_, data) => {
      return queryClient.invalidateQueries({
        queryKey: ['imports', data.importId, 'rows'],
      });
    },
  });
};
