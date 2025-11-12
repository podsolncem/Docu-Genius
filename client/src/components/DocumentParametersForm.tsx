import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DocumentParameters {
  title: string;
  author: string;
  documentType: string;
  description: string;
}

interface DocumentParametersFormProps {
  parameters: DocumentParameters;
  onChange: (parameters: DocumentParameters) => void;
}

export default function DocumentParametersForm({ parameters, onChange }: DocumentParametersFormProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Document Parameters</CardTitle>
          <CardDescription>
            Enter the basic information for your document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              data-testid="input-document-title"
              placeholder="Enter document title"
              value={parameters.title}
              onChange={(e) => onChange({ ...parameters, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              data-testid="input-author"
              placeholder="Enter author name"
              value={parameters.author}
              onChange={(e) => onChange({ ...parameters, author: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentType">Document Type</Label>
            <Select
              value={parameters.documentType}
              onValueChange={(value) => onChange({ ...parameters, documentType: value })}
            >
              <SelectTrigger id="documentType" data-testid="select-document-type">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="specification">Specification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              data-testid="input-description"
              placeholder="Enter a brief description of the document"
              value={parameters.description}
              onChange={(e) => onChange({ ...parameters, description: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
