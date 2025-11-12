import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onGenerate?: () => void;
  isNextDisabled?: boolean;
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onGenerate,
  isNextDisabled = false,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="sticky bottom-0 bg-background border-t p-4 mt-8">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-between items-center">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          data-testid="button-back"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </div>

        {!isLastStep ? (
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            data-testid="button-next"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onGenerate}
            data-testid="button-generate"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate Document
          </Button>
        )}
      </div>
    </div>
  );
}
