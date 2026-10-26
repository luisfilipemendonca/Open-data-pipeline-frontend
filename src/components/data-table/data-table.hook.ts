import { useId } from 'react';

export const useDataTable = () => {
  const tableTitleId = useId();

  return {
    tableTitleId,
  };
};
