import { Route } from '@/routes/imports.$importId';
import { ImportDetails } from '../components/import-details';
import { ImportDetailsTable } from '../components/import-details-table';

export const ImportDetailsPage = () => {
  const { importId } = Route.useParams();

  return (
    <div className="flex flex-col gap-8">
      <ImportDetails importId={+importId} />
      <ImportDetailsTable importId={+importId} />
    </div>
  );
};
