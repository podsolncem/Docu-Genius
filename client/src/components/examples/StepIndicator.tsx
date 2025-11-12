import StepIndicator from '../StepIndicator';

export default function StepIndicatorExample() {
  const steps = [
    { id: 1, name: 'Parameters', description: 'Basic info' },
    { id: 2, name: 'Dictionary', description: 'Edit data' },
    { id: 3, name: 'Schema', description: 'Upload XSD' },
    { id: 4, name: 'Preview', description: 'Review' },
    { id: 5, name: 'Generate', description: 'Create document' },
  ];

  return <StepIndicator steps={steps} currentStep={1} />;
}
