import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface BusinessProcess {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

interface BusinessProcessSelectorProps {
  processes: BusinessProcess[];
  onChange: (processes: BusinessProcess[]) => void;
}

export default function BusinessProcessSelector({ processes, onChange }: BusinessProcessSelectorProps) {
  const handleToggle = (id: number) => {
    onChange(
      processes.map((p) =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const handleToggleAll = () => {
    const allSelected = processes.every((p) => p.selected);
    onChange(processes.map((p) => ({ ...p, selected: !allSelected })));
  };

  const selectedCount = processes.filter((p) => p.selected).length;
  const allSelected = selectedCount === processes.length;

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Business Processes</CardTitle>
              <CardDescription>
                Choose all applicable RTGS business processes
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={handleToggleAll}
                data-testid="checkbox-select-all"
              />
              <Label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                Select All ({selectedCount}/{processes.length})
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b font-medium text-sm">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Business Process</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-1 text-center">Select</div>
            </div>
            <div className="divide-y">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className="grid grid-cols-12 gap-4 p-4 hover-elevate active-elevate-2 transition-colors"
                  data-testid={`row-process-${process.id}`}
                >
                  <div className="col-span-1 text-muted-foreground font-medium">
                    {process.id}
                  </div>
                  <div className="col-span-4 font-medium">{process.name}</div>
                  <div className="col-span-6 text-sm text-muted-foreground">
                    {process.description}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Checkbox
                      id={`process-${process.id}`}
                      checked={process.selected}
                      onCheckedChange={() => handleToggle(process.id)}
                      data-testid={`checkbox-process-${process.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
