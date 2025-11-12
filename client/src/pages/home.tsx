import { useState } from "react";
import StepIndicator, { Step } from "@/components/StepIndicator";
import DocumentParametersForm, { DocumentParameters } from "@/components/DocumentParametersForm";
import DataDictionaryEditor, { DictionaryEntry } from "@/components/DataDictionaryEditor";
import XSDUploader, { UploadedFile } from "@/components/XSDUploader";
import DocumentPreview from "@/components/DocumentPreview";
import NavigationButtons from "@/components/NavigationButtons";
import { useToast } from "@/hooks/use-toast";

const steps: Step[] = [
  { id: 1, name: "Parameters", description: "Basic info" },
  { id: 2, name: "Dictionary", description: "Edit data" },
  { id: 3, name: "Schema", description: "Upload XSD" },
  { id: 4, name: "Preview", description: "Review" },
  { id: 5, name: "Generate", description: "Create document" },
];

export default function Home() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [parameters, setParameters] = useState<DocumentParameters>({
    title: "",
    author: "",
    documentType: "",
    description: "",
  });
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [xsdFile, setXsdFile] = useState<UploadedFile | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGenerate = () => {
    toast({
      title: "Document Generated!",
      description: "Your Word document has been created and is ready for download.",
    });
    console.log("Generating document with:", { parameters, entries, xsdFile });
  };

  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !parameters.title || !parameters.author || !parameters.documentType;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Document Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Automate your document creation with templates and data
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="mb-8">
          {currentStep === 0 && (
            <DocumentParametersForm
              parameters={parameters}
              onChange={setParameters}
            />
          )}
          {currentStep === 1 && (
            <DataDictionaryEditor entries={entries} onChange={setEntries} />
          )}
          {currentStep === 2 && (
            <XSDUploader file={xsdFile} onFileChange={setXsdFile} />
          )}
          {currentStep === 3 && (
            <DocumentPreview
              parameters={parameters}
              entries={entries}
              xsdFile={xsdFile}
            />
          )}
          {currentStep === 4 && (
            <div className="max-w-3xl mx-auto text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Ready to Generate</h2>
              <p className="text-muted-foreground mb-8">
                Click the "Generate Document" button below to create your Word
                document with all the parameters and data you've configured.
              </p>
            </div>
          )}
        </div>

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={steps.length}
          onBack={handleBack}
          onNext={handleNext}
          onGenerate={handleGenerate}
          isNextDisabled={isNextDisabled()}
        />
      </main>
    </div>
  );
}
