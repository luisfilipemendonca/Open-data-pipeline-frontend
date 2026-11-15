import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImportRow } from '../api';
import type { DeleteImportRowData } from '../types';
import { mutationKeys } from '../constants/mutation-keys';

export const useDeleteImportRow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteImportRow,
    mutationFn: ({ importId, rowId }: DeleteImportRowData) => deleteImportRow({ importId, rowId }),
    onSuccess: (_, data) => {
      return queryClient.invalidateQueries({
        queryKey: ['imports', data.importId, 'rows'],
      });
    },
  });
};
