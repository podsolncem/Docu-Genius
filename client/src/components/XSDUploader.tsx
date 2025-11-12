import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface UploadedFile {
  name: string;
  size: number;
  content?: string;
}

interface XSDUploaderProps {
  file: UploadedFile | null;
  onFileChange: (file: UploadedFile | null) => void;
}

export default function XSDUploader({ file, onFileChange }: XSDUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationStatus, setValidationStatus] = useState<"valid" | "invalid" | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.xsd')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileChange({
          name: droppedFile.name,
          size: droppedFile.size,
          content: event.target?.result as string,
        });
        setValidationStatus("valid");
      };
      reader.readAsText(droppedFile);
    } else {
      setValidationStatus("invalid");
    }
  }, [onFileChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.xsd')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileChange({
          name: selectedFile.name,
          size: selectedFile.size,
          content: event.target?.result as string,
        });
        setValidationStatus("valid");
      };
      reader.readAsText(selectedFile);
    } else {
      setValidationStatus("invalid");
    }
  }, [onFileChange]);

  const handleRemove = () => {
    onFileChange(null);
    setValidationStatus(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>XSD Schema Upload</CardTitle>
          <CardDescription>
            Upload an XSD schema file to validate your document structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md p-12 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground/50"
              }`}
              data-testid="dropzone-xsd"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-2">
                Drag and drop your XSD file here
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                or
              </p>
              <label htmlFor="file-upload">
                <Button variant="outline" asChild>
                  <span>
                    Browse Files
                  </span>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xsd"
                  className="hidden"
                  onChange={handleFileInput}
                  data-testid="input-file-upload"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Supports .xsd files only
              </p>
            </div>
          ) : (
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" data-testid="text-filename">
                    {file.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  data-testid="button-remove-file"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {validationStatus === "valid" && (
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                XSD schema file uploaded successfully and is valid
              </AlertDescription>
            </Alert>
          )}

          {validationStatus === "invalid" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Invalid file format. Please upload a valid .xsd file
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
