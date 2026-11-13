import { ImportDetails } from '../components/import-details';
import { ImportDetailsTable } from '../components/import-details-table';

export const ImportDetailsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <ImportDetails />
      <ImportDetailsTable />
    </div>
  );
};
