import NavigationButtons from '../NavigationButtons';

export default function NavigationButtonsExample() {
  return (
    <NavigationButtons
      currentStep={1}
      totalSteps={5}
      onBack={() => console.log('Back clicked')}
      onNext={() => console.log('Next clicked')}
      onGenerate={() => console.log('Generate clicked')}
    />
  );
}
