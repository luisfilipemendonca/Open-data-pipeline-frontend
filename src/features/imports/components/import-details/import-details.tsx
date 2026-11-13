import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { CircleCheck, CircleX, ChartNoAxesColumn } from 'lucide-react';
import { RowDetailsCard } from './rows-details-card';
import { useGetImportDetails } from '../../hooks/use-get-import-details';
import { Heading } from '@/components/heading';

export const ImportDetails = () => {
  const { data: importDetails } = useGetImportDetails(41);

  if (!importDetails?.data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Heading>Import #{importDetails.data.importId}</Heading>
          <Text>Import started on {importDetails.data.createdAt}</Text>
        </div>
        <div>{importDetails.data.status}</div>
      </div>
      <div className="mb-4">
        <Card className="flex h-32 gap-4">
          <div className="flex-1">{importDetails.data.fileName}</div>
          <div className="w-0.5 h-full bg-accent"></div>
          <div className="flex-1">{importDetails.data.createdAt}</div>
          <div className="w-0.5 h-full bg-accent"></div>
          <div className="flex-1">Schema: {importDetails.data.schemaName}</div>
        </Card>
      </div>
      <div className="flex gap-4">
        <RowDetailsCard
          cardVariant="success"
          icon={CircleCheck}
          label="Valid records"
          value={importDetails.data.summary.totalValidRows}
        />
        <RowDetailsCard
          cardVariant="danger"
          icon={CircleX}
          label="Records with errors"
          value={importDetails.data.summary.totalInvalidRows}
        />
        <RowDetailsCard
          icon={ChartNoAxesColumn}
          label="Total records"
          value={importDetails.data.summary.totalRows}
        />
      </div>
    </div>
  );
};
