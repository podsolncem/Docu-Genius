import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

export interface MessageFlow {
  id: string;
  businessProcess: string;
  function: string;
  msgType: string;
  sender: string;
  debitAccount: string;
  creditAccount: string;
  futureDated: boolean;
  priority: string;
  selected: boolean;
}

interface FlowsMessagesTableProps {
  flows: MessageFlow[];
  onChange: (flows: MessageFlow[]) => void;
}

export default function FlowsMessagesTable({ flows, onChange }: FlowsMessagesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFlows = flows.filter((flow) => {
    const search = searchTerm.toLowerCase();
    return (
      flow.businessProcess.toLowerCase().includes(search) ||
      flow.function.toLowerCase().includes(search) ||
      flow.msgType.toLowerCase().includes(search) ||
      flow.sender.toLowerCase().includes(search)
    );
  });

  const handleToggle = (id: string) => {
    onChange(flows.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f)));
  };

  const handleToggleAll = () => {
    const allSelected = filteredFlows.every((f) => f.selected);
    onChange(
      flows.map((f) =>
        filteredFlows.find((ff) => ff.id === f.id)
          ? { ...f, selected: !allSelected }
          : f
      )
    );
  };

  const selectedCount = flows.filter((f) => f.selected).length;
  const businessProcessCount = new Set(flows.filter((f) => f.selected).map((f) => f.businessProcess)).size;

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Flows & Messages</CardTitle>
          <CardDescription>
            Customize the message flows and types for your document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter any data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-flows"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchTerm("")}
                  data-testid="button-clear-search"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={handleToggleAll}
              data-testid="button-toggle-all"
            >
              {filteredFlows.every((f) => f.selected) ? "Deselect" : "Select"} All Visible
            </Button>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Business Process</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Msg Type</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Debit</TableHead>
                  <TableHead>Credit</TableHead>
                  <TableHead className="text-center">Future Dated</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="w-20 text-center">Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlows.length > 0 ? (
                  filteredFlows.map((flow, index) => (
                    <TableRow
                      key={flow.id}
                      className={flow.selected ? "bg-muted/30" : ""}
                      data-testid={`row-flow-${flow.id}`}
                    >
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {flow.businessProcess}
                      </TableCell>
                      <TableCell className="text-sm">{flow.function}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {flow.msgType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{flow.sender}</TableCell>
                      <TableCell className="text-sm font-mono text-xs">
                        {flow.debitAccount}
                      </TableCell>
                      <TableCell className="text-sm font-mono text-xs">
                        {flow.creditAccount}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={flow.futureDated ? "default" : "outline"} className="text-xs">
                          {flow.futureDated ? "Y" : "N"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            flow.priority === "99"
                              ? "destructive"
                              : flow.priority === "N/A"
                              ? "outline"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {flow.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          checked={flow.selected}
                          onCheckedChange={() => handleToggle(flow.id)}
                          data-testid={`checkbox-flow-${flow.id}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No flows match your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
            <div>
              <span className="font-medium text-foreground">{businessProcessCount}</span> Business
              Processes selected
            </div>
            <div>•</div>
            <div>
              <span className="font-medium text-foreground">{selectedCount}</span> Message flows
              selected out of {flows.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
