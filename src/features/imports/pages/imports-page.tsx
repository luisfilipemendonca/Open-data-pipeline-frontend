import { Heading } from '@/components/heading';
import { useImports } from '../hooks/use-imports';
import { DataTable } from '@/components/data-table';
import { formatDateTime } from '@/lib/date';
import { Sidebar } from '@/components/sidebar/sidebar';
import { usePagination } from '@/hooks/use-pagination';
import { SelectField, type SelectOption } from '@/components/select-field';
import { UploadField } from '@/components/upload-field';
import { useState } from 'react';
import { useGetSchemasOptions } from '../hooks/use-get-schemas-options';

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
  const { data } = useImports({ page: currentPage, pageSize: currentPageSize });

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
          { header: 'Filename', accessorKey: 'fileName', render: (row) => row.fileName },
          { header: 'Status', accessorKey: 'status', render: (row) => row.status },
          {
            header: 'Created at',
            accessorKey: 'createdAt',
            render: (row) => formatDateTime(row.createdAt),
          },
          {
            header: 'Updated at',
            accessorKey: 'updatedAt',
            render: (row) => formatDateTime(row.updatedAt),
          },
        ]}
      />
    </div>
  );
};
