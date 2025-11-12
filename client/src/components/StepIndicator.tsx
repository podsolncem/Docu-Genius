import { Check } from "lucide-react";

export interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-center gap-2 md:gap-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center gap-2 md:gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    index < currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : index === currentStep
                      ? "border-primary bg-background text-primary animate-pulse"
                      : "border-muted bg-background text-muted-foreground"
                  }`}
                  data-testid={`step-indicator-${step.id}`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </p>
                <p className="hidden md:block text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`hidden md:block h-0.5 w-12 lg:w-24 ${
                  index < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
