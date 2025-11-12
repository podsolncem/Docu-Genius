import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GenerateStepProps {
  isGenerating: boolean;
  isComplete: boolean;
  onDownload: () => void;
}

export default function GenerateStep({ isGenerating, isComplete, onDownload }: GenerateStepProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="h-8 w-8 text-primary" />
            Document Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isGenerating && !isComplete && (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary mb-4"></div>
              <p className="text-lg font-medium">Generating your document...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take a few moments
              </p>
            </div>
          )}

          {isComplete && (
            <>
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Your Message Formats & Samples document has been generated successfully!
                </AlertDescription>
              </Alert>

              <div className="text-center py-8">
                <Button
                  size="lg"
                  onClick={onDownload}
                  className="gap-2"
                  data-testid="button-download-document"
                >
                  <Download className="h-5 w-5" />
                  Download Document
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Click the button above to download your generated Word document
                </p>
              </div>
            </>
          )}

          {!isGenerating && !isComplete && (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-4">Ready to generate your document</p>
              <p className="text-sm text-muted-foreground">
                Click "Generate Document" in the navigation below to start
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
