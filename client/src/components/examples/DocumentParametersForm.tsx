import { useState } from 'react';
import DocumentParametersForm from '../DocumentParametersForm';

export default function DocumentParametersFormExample() {
  const [parameters, setParameters] = useState({
    title: '',
    author: '',
    documentType: '',
    description: '',
  });

  return <DocumentParametersForm parameters={parameters} onChange={setParameters} />;
}
