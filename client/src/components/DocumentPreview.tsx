import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import type { DocumentParameters } from "./DocumentParametersForm";
import type { DictionaryEntry } from "./DataDictionaryEditor";
import type { UploadedFile } from "./XSDUploader";

interface DocumentPreviewProps {
  parameters: DocumentParameters;
  entries: DictionaryEntry[];
  xsdFile: UploadedFile | null;
}

export default function DocumentPreview({ parameters, entries, xsdFile }: DocumentPreviewProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Form Summary
            </CardTitle>
            <CardDescription>Review your entered information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Document Title
              </h3>
              <p className="text-sm" data-testid="text-preview-title">
                {parameters.title || "Not specified"}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Author
              </h3>
              <p className="text-sm" data-testid="text-preview-author">
                {parameters.author || "Not specified"}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Document Type
              </h3>
              <p className="text-sm capitalize" data-testid="text-preview-type">
                {parameters.documentType || "Not specified"}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </h3>
              <p className="text-sm" data-testid="text-preview-description">
                {parameters.description || "Not specified"}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Data Entries
              </h3>
              <p className="text-sm" data-testid="text-preview-entries-count">
                {entries.length} {entries.length === 1 ? "entry" : "entries"}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                XSD Schema
              </h3>
              <p className="text-sm" data-testid="text-preview-xsd">
                {xsdFile ? xsdFile.name : "No schema uploaded"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Preview</CardTitle>
            <CardDescription>Simulated document structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-6 bg-card space-y-4 min-h-[400px]">
              <div className="text-center border-b pb-4">
                <h1 className="text-2xl font-bold">
                  {parameters.title || "Document Title"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  By {parameters.author || "Author Name"}
                </p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {parameters.documentType || "Document Type"}
                </p>
              </div>

              {parameters.description && (
                <div>
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-sm text-muted-foreground">
                    {parameters.description}
                  </p>
                </div>
              )}

              {entries.length > 0 && (
                <div>
                  <h2 className="font-semibold mb-3">Document Data</h2>
                  <div className="space-y-2">
                    {entries.slice(0, 5).map((entry) => (
                      <div
                        key={entry.id}
                        className="flex justify-between text-sm border-b pb-2"
                      >
                        <span className="font-medium">{entry.key}:</span>
                        <span className="text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                    {entries.length > 5 && (
                      <p className="text-xs text-muted-foreground italic">
                        ... and {entries.length - 5} more entries
                      </p>
                    )}
                  </div>
                </div>
              )}

              {xsdFile && (
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Schema: {xsdFile.name}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
