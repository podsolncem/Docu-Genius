import { useState } from "react";
import StepIndicator, { Step } from "@/components/StepIndicator";
import IntroStep from "@/components/IntroStep";
import BusinessProcessSelector, { BusinessProcess } from "@/components/BusinessProcessSelector";
import FlowsMessagesTable, { MessageFlow } from "@/components/FlowsMessagesTable";
import ParametersForm, { DocumentParams } from "@/components/ParametersForm";
import GenerateStep from "@/components/GenerateStep";
import NavigationButtons from "@/components/NavigationButtons";
import { useToast } from "@/hooks/use-toast";

const steps: Step[] = [
  { id: 1, name: "Intro", description: "Overview" },
  { id: 2, name: "Business Processes", description: "Select processes" },
  { id: 3, name: "Flows & Messages", description: "Configure flows" },
  { id: 4, name: "Parameters", description: "Set parameters" },
  { id: 5, name: "Generate", description: "Get document" },
];

export default function Home() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [processes, setProcesses] = useState<BusinessProcess[]>([
    {
      id: 1,
      name: "Participant to Participant",
      description: "Payments from RTGS participants",
      selected: false,
    },
    {
      id: 2,
      name: "Participant to CB",
      description: "Payments from RTGS participants to Central Bank",
      selected: false,
    },
    {
      id: 3,
      name: "CB to Participant",
      description: "Payments from Central Bank to RTGS participants",
      selected: false,
    },
    {
      id: 4,
      name: "3d party payments",
      description: "Payments from external systems to Central Bank",
      selected: false,
    },
    {
      id: 5,
      name: "Clearing system",
      description: "Settlement of Clearing results",
      selected: false,
    },
    {
      id: 6,
      name: "Treasury payments",
      description: "Payments from and to Treasury",
      selected: false,
    },
  ]);

  const [flows, setFlows] = useState<MessageFlow[]>([
    // Participant to Participant flows
    {
      id: "1",
      businessProcess: "Participant to Participant",
      flow: "B1 -> B2 (Direct credit)",
      msgType: "pacs.008",
      sender: "B1",
      receiver: "B2",
      debitAccount: "B1 SA",
      creditAccount: "B2 SA",
      futureDated: true,
      queueType: "T+0..9",
      priority: "70",
      selected: false,
    },
    {
      id: "2",
      businessProcess: "Participant to Participant",
      flow: "B1 -> B2 (Direct credit)",
      msgType: "pacs.009",
      sender: "B1",
      receiver: "B2",
      debitAccount: "B1 SA",
      creditAccount: "B2 SA",
      futureDated: true,
      queueType: "T+0..9",
      priority: "70",
      selected: false,
    },
    {
      id: "3",
      businessProcess: "Participant to Participant",
      flow: "B1 -> B2 (Cash reservation)",
      msgType: "pacs.008",
      sender: "B1",
      receiver: "B2",
      debitAccount: "B1 SA",
      creditAccount: "B2 SA",
      futureDated: true,
      queueType: "T+0..9",
      priority: "99",
      selected: false,
    },
    {
      id: "4",
      businessProcess: "Participant to Participant",
      flow: "Payment return B2 -> B1 (Direct credit)",
      msgType: "pacs.004",
      sender: "B2",
      receiver: "B1",
      debitAccount: "B2 SA",
      creditAccount: "B1 SA",
      futureDated: true,
      queueType: "T+0..9",
      priority: "99",
      selected: false,
    },
    // 3d party payments flows
    {
      id: "5",
      businessProcess: "3d party payments",
      flow: "3d party",
      msgType: "pacs.008",
      sender: "External",
      receiver: "CB",
      debitAccount: "EXT SA",
      creditAccount: "CB SA",
      futureDated: false,
      queueType: "T+0",
      priority: "N/A",
      selected: false,
    },
    {
      id: "6",
      businessProcess: "3d party payments",
      flow: "3d party",
      msgType: "pacs.009",
      sender: "External",
      receiver: "CB",
      debitAccount: "EXT SA",
      creditAccount: "CB SA",
      futureDated: false,
      queueType: "T+0",
      priority: "N/A",
      selected: false,
    },
    // Participant to CB flows
    {
      id: "7",
      businessProcess: "Participant to CB",
      flow: "B1 -> CB (Tax payment)",
      msgType: "pacs.008",
      sender: "B1",
      receiver: "CB",
      debitAccount: "B1 SA",
      creditAccount: "CB SA",
      futureDated: false,
      queueType: "T+0",
      priority: "50",
      selected: false,
    },
    {
      id: "8",
      businessProcess: "Participant to CB",
      flow: "B1 -> CB (Reserve requirement)",
      msgType: "pacs.009",
      sender: "B1",
      receiver: "CB",
      debitAccount: "B1 SA",
      creditAccount: "CB SA",
      futureDated: false,
      queueType: "T+0",
      priority: "70",
      selected: false,
    },
    // CB to Participant flows
    {
      id: "9",
      businessProcess: "CB to Participant",
      flow: "CB -> B1 (Liquidity provision)",
      msgType: "pacs.008",
      sender: "CB",
      receiver: "B1",
      debitAccount: "CB SA",
      creditAccount: "B1 SA",
      futureDated: false,
      queueType: "T+0",
      priority: "99",
      selected: false,
    },
    {
      id: "10",
      businessProcess: "CB to Participant",
      flow: "CB -> B1 (Refund)",
      msgType: "pacs.004",
      sender: "CB",
      receiver: "B1",
      debitAccount: "CB SA",
      creditAccount: "B1 SA",
      futureDated: false,
      queueType: "T+0",
      priority: "50",
      selected: false,
    },
    // Clearing system flows
    {
      id: "11",
      businessProcess: "Clearing system",
      flow: "Clearing settlement",
      msgType: "pacs.008",
      sender: "Clearing",
      receiver: "RTGS",
      debitAccount: "CLR SA",
      creditAccount: "RTGS SA",
      futureDated: false,
      queueType: "T+1",
      priority: "70",
      selected: false,
    },
    // Treasury payments flows
    {
      id: "12",
      businessProcess: "Treasury payments",
      flow: "Treasury -> B1 (Salary)",
      msgType: "pacs.008",
      sender: "Treasury",
      receiver: "B1",
      debitAccount: "TRES SA",
      creditAccount: "B1 SA",
      futureDated: true,
      queueType: "T+0..9",
      priority: "50",
      selected: false,
    },
  ]);

  const [params, setParams] = useState<DocumentParams>({
    bics: "",
    pseudoBics: "",
    ibans: "",
    majorCurrency: "",
    fxCurrency: "",
    scheme: "v-shape",
    yamunaVersion: "latest",
    isoRtgsParticipant: "",
    isoRtgsAccount: "",
    isoRtgs: "",
    grouping: "bp",
    language: "english",
    timezone: "gmt+1",
  });

  const selectedBusinessProcesses = processes
    .filter((p) => p.selected)
    .map((p) => p.name);

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
    setIsGenerating(true);
    console.log("Generating document with:", { processes, flows, params });
    
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
      toast({
        title: "Document Generated!",
        description: "Your Message Formats & Samples document is ready for download.",
      });
    }, 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    });
    console.log("Downloading document");
  };

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !processes.some((p) => p.selected);
    }
    if (currentStep === 2) {
      return !flows.some((f) => f.selected);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Message Formats & Samples</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Automated document generation for RTGS systems
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="mb-8">
          {currentStep === 0 && <IntroStep />}
          {currentStep === 1 && (
            <BusinessProcessSelector processes={processes} onChange={setProcesses} />
          )}
          {currentStep === 2 && (
            <FlowsMessagesTable
              flows={flows}
              selectedBusinessProcesses={selectedBusinessProcesses}
              onChange={setFlows}
            />
          )}
          {currentStep === 3 && <ParametersForm params={params} onChange={setParams} />}
          {currentStep === 4 && (
            <GenerateStep
              isGenerating={isGenerating}
              isComplete={isComplete}
              onDownload={handleDownload}
            />
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
