import { useState } from 'react';
import DataDictionaryEditor from '../DataDictionaryEditor';

export default function DataDictionaryEditorExample() {
  const [entries, setEntries] = useState([
    { id: '1', key: 'company_name', value: 'Acme Corporation', type: 'string' },
    { id: '2', key: 'contract_date', value: '2025-01-15', type: 'date' },
    { id: '3', key: 'amount', value: '50000', type: 'number' },
  ]);

  return <DataDictionaryEditor entries={entries} onChange={setEntries} />;
}
