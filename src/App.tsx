import { useEffect, useState } from 'react';
import { DataTable } from '@components/data-table';
import type { DataTableColumn } from './components/data-table/data-table.types';
import { Heading } from '@components/heading';

type Data = {
  id: number;
  invoice: string;
};

const data: Data[] = [
  {
    id: 1,
    invoice: 'INV001',
  },
  {
    id: 2,
    invoice: 'INV002',
  },
];

const columns: DataTableColumn<Data>[] = [
  { accessorKey: 'invoice', header: 'Invoice', render: (row) => row.invoice },
];

const App = () => {
  const [test, setTest] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setTest(2);
    }, 2000);
  });

  return (
    <div className="py-4 px-8">
      <Heading as="h1">Teste</Heading>
      <Heading as="h2">Teste</Heading>
      <Heading as="h3">Teste</Heading>
      <Heading as="h4">Teste</Heading>
      <DataTable
        data={data}
        columns={columns}
        actions={[{ label: 'Edit', callback: (row) => console.log(row) }]}
      />
    </div>
  );
};

export default App;
