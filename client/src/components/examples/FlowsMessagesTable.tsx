import { useState } from 'react';
import FlowsMessagesTable, { MessageFlow } from '../FlowsMessagesTable';

export default function FlowsMessagesTableExample() {
  const [flows, setFlows] = useState<MessageFlow[]>([
    {
      id: '1',
      businessProcess: 'Participant to Participant',
      function: 'B1 -> B2 (Direct credit)',
      msgType: 'pacs.008',
      sender: 'B1',
      debitAccount: 'B1 SA',
      creditAccount: 'B2 SA',
      futureDated: true,
      priority: '70',
      selected: true,
    },
    {
      id: '2',
      businessProcess: 'Participant to Participant',
      function: 'B1 -> B2 (Direct credit)',
      msgType: 'pacs.009',
      sender: 'B1',
      debitAccount: 'B1 SA',
      creditAccount: 'B2 SA',
      futureDated: true,
      priority: '70',
      selected: true,
    },
    {
      id: '3',
      businessProcess: 'Participant to Participant',
      function: 'B1 -> B2 (Cash reservation)',
      msgType: 'pacs.008',
      sender: 'B1',
      debitAccount: 'B1 SA',
      creditAccount: 'B2 SA',
      futureDated: true,
      priority: '99',
      selected: false,
    },
    {
      id: '4',
      businessProcess: 'Participant to Participant',
      function: 'Payment return B2 -> B1',
      msgType: 'pacs.004',
      sender: 'B2',
      debitAccount: 'B2 SA',
      creditAccount: 'B1 SA',
      futureDated: true,
      priority: '99',
      selected: false,
    },
    {
      id: '5',
      businessProcess: '3d party payments',
      function: '3d party',
      msgType: 'pacs.008',
      sender: 'External',
      debitAccount: 'EXT SA',
      creditAccount: 'CB SA',
      futureDated: false,
      priority: 'N/A',
      selected: false,
    },
  ]);

  return <FlowsMessagesTable flows={flows} onChange={setFlows} />;
}
