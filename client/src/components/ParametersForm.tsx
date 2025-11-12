import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface DocumentParams {
  bics: string;
  pseudoBics: string;
  ibans: string;
  majorCurrency: string;
  fxCurrency: string;
  scheme: string;
  yamunaVersion: string;
  isoRtgsParticipant: string;
  isoRtgsAccount: string;
  isoRtgs: string;
  grouping: string;
  language: string;
  timezone: string;
}

interface ParametersFormProps {
  params: DocumentParams;
  onChange: (params: DocumentParams) => void;
}

export default function ParametersForm({ params, onChange }: ParametersFormProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BICs & Identifiers</CardTitle>
          <CardDescription>Configure participant and system identifiers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="bics">BICs</Label>
              <Input
                id="bics"
                placeholder="e.g., Participant B1, B2, System, CB"
                value={params.bics}
                onChange={(e) => onChange({ ...params, bics: e.target.value })}
                data-testid="input-bics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pseudo-bics">Pseudo-BICs (optional)</Label>
              <Input
                id="pseudo-bics"
                placeholder="Enter pseudo-BICs if used"
                value={params.pseudoBics}
                onChange={(e) => onChange({ ...params, pseudoBics: e.target.value })}
                data-testid="input-pseudo-bics"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty if not applicable
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accounts & Currencies</CardTitle>
          <CardDescription>Define accounts and currency settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ibans">Account Numbers</Label>
            <Input
              id="ibans"
              placeholder="Enter account numbers (IBANs, BBANs, or other formats)"
              value={params.ibans}
              onChange={(e) => onChange({ ...params, ibans: e.target.value })}
              data-testid="input-ibans"
            />
            <p className="text-xs text-muted-foreground">
              Can be IBANs, BBANs, or any account number format
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="major-currency">Major Currency</Label>
              <Input
                id="major-currency"
                placeholder="e.g., USD"
                value={params.majorCurrency}
                onChange={(e) => onChange({ ...params, majorCurrency: e.target.value })}
                data-testid="input-major-currency"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fx-currency">Additional FX Currency</Label>
              <div className="flex gap-2">
                <Input
                  id="fx-currency"
                  placeholder="e.g., EUR"
                  value={params.fxCurrency}
                  onChange={(e) => onChange({ ...params, fxCurrency: e.target.value })}
                  data-testid="input-fx-currency"
                />
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>RTGS-specific Parameters</CardTitle>
          <CardDescription>Configure system-specific settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Scheme</Label>
              <RadioGroup
                value={params.scheme}
                onValueChange={(value) => onChange({ ...params, scheme: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="v-shape" id="v-shape" data-testid="radio-v-shape" />
                  <Label htmlFor="v-shape" className="font-normal cursor-pointer">
                    V-Shape
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="y-copy" id="y-copy" data-testid="radio-y-copy" />
                  <Label htmlFor="y-copy" className="font-normal cursor-pointer">
                    Y-Copy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" data-testid="radio-custom" />
                  <Label htmlFor="custom" className="font-normal cursor-pointer">
                    Custom
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yamuna-version">Yamuna Version</Label>
              <Select
                value={params.yamunaVersion}
                onValueChange={(value) => onChange({ ...params, yamunaVersion: value })}
              >
                <SelectTrigger id="yamuna-version" data-testid="select-yamuna-version">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="1.3">Yamuna 1.3</SelectItem>
                  <SelectItem value="1.2">Yamuna 1.2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">ISO Codes for RTGS Identification</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="iso-participant" className="text-xs">
                  RTGS Participant ID
                </Label>
                <Input
                  id="iso-participant"
                  placeholder="e.g., SYGPA"
                  value={params.isoRtgsParticipant}
                  onChange={(e) =>
                    onChange({ ...params, isoRtgsParticipant: e.target.value })
                  }
                  data-testid="input-iso-participant"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iso-account" className="text-xs">
                  RTGS Account ID
                </Label>
                <Input
                  id="iso-account"
                  placeholder="e.g., SYGAC"
                  value={params.isoRtgsAccount}
                  onChange={(e) =>
                    onChange({ ...params, isoRtgsAccount: e.target.value })
                  }
                  data-testid="input-iso-account"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iso-rtgs" className="text-xs">
                  RTGS System ID
                </Label>
                <Input
                  id="iso-rtgs"
                  placeholder="e.g., GAC"
                  value={params.isoRtgs}
                  onChange={(e) => onChange({ ...params, isoRtgs: e.target.value })}
                  data-testid="input-iso-rtgs"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output Settings</CardTitle>
          <CardDescription>Configure document formatting preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Grouping</Label>
              <RadioGroup
                value={params.grouping}
                onValueChange={(value) => onChange({ ...params, grouping: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bp" id="group-bp" data-testid="radio-group-bp" />
                  <Label htmlFor="group-bp" className="font-normal cursor-pointer">
                    By Business Process
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="msg"
                    id="group-msg"
                    data-testid="radio-group-msg"
                  />
                  <Label htmlFor="group-msg" className="font-normal cursor-pointer">
                    By Message Type
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <RadioGroup
                value={params.language}
                onValueChange={(value) => onChange({ ...params, language: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="english"
                    id="lang-en"
                    data-testid="radio-lang-english"
                  />
                  <Label htmlFor="lang-en" className="font-normal cursor-pointer">
                    English
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="french"
                    id="lang-fr"
                    data-testid="radio-lang-french"
                  />
                  <Label htmlFor="lang-fr" className="font-normal cursor-pointer">
                    French
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Date, Time & Time Zone</Label>
              <Select
                value={params.timezone}
                onValueChange={(value) => onChange({ ...params, timezone: value })}
              >
                <SelectTrigger id="timezone" data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt">GMT +00:00</SelectItem>
                  <SelectItem value="gmt+1">GMT +01:00</SelectItem>
                  <SelectItem value="gmt+2">GMT +02:00</SelectItem>
                  <SelectItem value="gmt-5">GMT -05:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
