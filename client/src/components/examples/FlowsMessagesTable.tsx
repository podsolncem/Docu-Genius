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
      receiver: 'B2',
      debitAccount: 'B1 SA',
      creditAccount: 'B2 SA',
      futureDated: true,
      queueType: 'T+0..9',
      priority: '70',
      selected: true,
      transactionType: 'SEPA',
      settlementMethod: 'INDA',
    },
    {
      id: '2',
      businessProcess: 'Participant to Participant',
      function: 'B1 -> B2 (Direct credit)',
      msgType: 'pacs.009',
      sender: 'B1',
      receiver: 'B2',
      debitAccount: 'B1 SA',
      creditAccount: 'B2 SA',
      futureDated: true,
      queueType: 'T+0..9',
      priority: '70',
      selected: true,
    },
    {
      id: '3',
      businessProcess: 'Participant to Participant',
      function: 'B1 -> B2 (Cash reservation)',
      msgType: 'pacs.008',
      sender: 'B1',
      receiver: 'B2',
      debitAccount: 'B1 SA',
      creditAccount: 'B2 SA',
      futureDated: true,
      queueType: 'T+0..9',
      priority: '99',
      selected: false,
    },
    {
      id: '4',
      businessProcess: '3d party payments',
      function: '3d party',
      msgType: 'pacs.008',
      sender: 'External',
      receiver: 'CB',
      debitAccount: 'EXT SA',
      creditAccount: 'CB SA',
      futureDated: false,
      queueType: 'T+0',
      priority: 'N/A',
      selected: false,
    },
  ]);

  const selectedProcesses = ['Participant to Participant', '3d party payments'];

  return (
    <FlowsMessagesTable
      flows={flows}
      selectedBusinessProcesses={selectedProcesses}
      onChange={setFlows}
    />
  );
}
