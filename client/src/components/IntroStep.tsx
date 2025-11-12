import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2 } from "lucide-react";

export default function IntroStep() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="h-8 w-8 text-primary" />
            Introduction
          </CardTitle>
          <CardDescription className="text-base">
            Welcome to the Message Formats & Samples Document Generator
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground">
            This wizard will guide you through the automated generation of Message Formats & Samples 
            document for your project.
          </p>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Process includes 4 steps:</h3>
            <div className="space-y-3">
              {[
                "Selecting the relevant Business processes",
                "Specification of required message flows & types",
                "Specification of parameters for document generation",
                "Download your generated document"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Click <strong>"Next"</strong> to continue with the business process selection.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
