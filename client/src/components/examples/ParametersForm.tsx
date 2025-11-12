import { useState } from 'react';
import ParametersForm, { DocumentParams } from '../ParametersForm';

export default function ParametersFormExample() {
  const [params, setParams] = useState<DocumentParams>({
    bics: 'B1, B2, System, CB',
    pseudoBics: '',
    ibans: '',
    majorCurrency: 'USD',
    fxCurrency: '',
    scheme: 'v-shape',
    yamunaVersion: 'latest',
    isoRtgsParticipant: 'SYGPA',
    isoRtgsAccount: 'SYGAC',
    isoRtgs: 'GAC',
    grouping: 'bp',
    language: 'english',
    timezone: 'gmt+1',
  });

  return <ParametersForm params={params} onChange={setParams} />;
}
