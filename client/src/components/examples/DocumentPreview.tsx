import DocumentPreview from '../DocumentPreview';

export default function DocumentPreviewExample() {
  const parameters = {
    title: 'Service Agreement',
    author: 'Jane Smith',
    documentType: 'contract',
    description: 'Annual service contract for software development services',
  };

  const entries = [
    { id: '1', key: 'company_name', value: 'Acme Corporation', type: 'string' },
    { id: '2', key: 'contract_date', value: '2025-01-15', type: 'date' },
    { id: '3', key: 'amount', value: '50000', type: 'number' },
  ];

  const xsdFile = {
    name: 'contract-schema.xsd',
    size: 2048,
  };

  return <DocumentPreview parameters={parameters} entries={entries} xsdFile={xsdFile} />;
}
