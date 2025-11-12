import GenerateStep from '../GenerateStep';

export default function GenerateStepExample() {
  return (
    <GenerateStep
      isGenerating={false}
      isComplete={true}
      onDownload={() => console.log('Download clicked')}
    />
  );
}
