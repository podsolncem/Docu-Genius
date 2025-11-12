import { useState } from 'react';
import BusinessProcessSelector, { BusinessProcess } from '../BusinessProcessSelector';

export default function BusinessProcessSelectorExample() {
  const [processes, setProcesses] = useState<BusinessProcess[]>([
    {
      id: 1,
      name: 'Participant to Participant',
      description: 'Payments from RTGS participants',
      selected: true,
    },
    {
      id: 2,
      name: 'Participant to CB',
      description: 'Payments from RTGS participants to Central Bank',
      selected: false,
    },
    {
      id: 3,
      name: 'CB to Participant',
      description: 'Payments from Central Bank to RTGS participants',
      selected: true,
    },
    {
      id: 4,
      name: '3d party payments',
      description: 'Payments from external systems to Central Bank',
      selected: false,
    },
    {
      id: 5,
      name: 'Clearing system',
      description: 'Settlement of Clearing results',
      selected: false,
    },
    {
      id: 6,
      name: 'Treasury payments',
      description: 'Payments from and to Treasury',
      selected: false,
    },
  ]);

  return <BusinessProcessSelector processes={processes} onChange={setProcesses} />;
}
