import { Heading } from '@/components/heading';
import { useGetImports } from '../hooks/use-get-imports';
import { DataTable } from '@/components/data-table';
import { formatDateTime } from '@/lib/date';
import { Sidebar } from '@/components/sidebar/sidebar';
import { usePagination } from '@/hooks/use-pagination';
import { SelectField, type SelectOption } from '@/components/select-field';
import { UploadField } from '@/components/upload-field';
import { useState } from 'react';
import { useGetSchemasOptions } from '../hooks/use-get-schemas-options';
import type { Import } from '../types';
import { useNavigate } from '@tanstack/react-router';
import { useDeleteImport } from '../hooks/use-delete-import';

const CreateImportForm = () => {
  const [schemaOption, setSchemaOption] = useState<SelectOption | undefined>(undefined);

  const { data } = useGetSchemasOptions();

  const handleSchemaChange = (selectedSchema: SelectOption['value'] | null) => {
    if (!selectedSchema) {
      setSchemaOption(undefined);
      return;
    }

    setSchemaOption(data?.data.find((schema) => schema.value === selectedSchema));
  };

  return (
    <form className="flex flex-col gap-8">
      <SelectField
        label="Schema"
        options={data?.data ?? []}
        onChange={handleSchemaChange}
        selectedValue={schemaOption?.value ?? ''}
        placeholder="Select a schema to validate the file"
      />
      <UploadField />
    </form>
  );
};

export const ImportsPage = () => {
  const { currentPage, currentPageSize, processPagination } = usePagination();
  const { data } = useGetImports({ page: currentPage, pageSize: currentPageSize });
  const { mutate: deleteImportMutation } = useDeleteImport();

  const navigate = useNavigate();

  const handleNavigateDetails = (row: Import) => {
    navigate({
      to: '/import/$importId',
      params: {
        importId: row.importId.toString(),
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <Heading as="h1">Imports</Heading>
        <Sidebar
          title="Upload file"
          description="Add a .csv file to the input to upload it"
          triggerLabel="Upload file"
          actions={{
            success: { label: 'Upload file', callback: () => console.log('hello there') },
            cancel: { label: 'Cancel', callback: () => console.log('cancel there') },
          }}
        >
          <CreateImportForm />
        </Sidebar>
      </div>
      <DataTable
        title="Import history"
        data={data?.data ?? []}
        rowId={(row) => row.importId}
        pagination={processPagination(data?.pagination)}
        columns={[
          { header: 'Filename', render: (row) => row.fileName },
          { header: 'Status', render: (row) => row.status },
          {
            header: 'Created at',
            render: (row) => formatDateTime(row.createdAt),
          },
          {
            header: 'Updated at',
            render: (row) => formatDateTime(row.updatedAt),
          },
        ]}
        actions={[
          {
            type: 'item',
            label: 'Detalhes',
            callback: handleNavigateDetails,
          },
          {
            type: 'separator',
          },
          {
            type: 'item',
            label: 'Delete',
            callback: (row) => deleteImportMutation(row.importId),
            variant: 'destructive',
          },
        ]}
      />
    </div>
  );
};
