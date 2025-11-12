import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, X, Settings2, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";

export interface MessageFlow {
  id: string;
  businessProcess: string;
  flow: string;
  msgType: string;
  sender: string;
  receiver: string;
  debitAccount: string;
  creditAccount: string;
  futureDated: boolean;
  queueType: string;
  priority: string;
  selected: boolean;
  // Extended parameters - to be filled from Excel data
  transactionType?: string;
  localInstrument?: string;
  serviceLevel?: string;
  clearingChannel?: string;
  instructionPriority?: string;
  paymentPurpose?: string;
  categoryPurpose?: string;
  regulatoryReporting?: string;
}

interface FlowsMessagesTableProps {
  flows: MessageFlow[];
  selectedBusinessProcesses: string[];
  onChange: (flows: MessageFlow[]) => void;
}

export default function FlowsMessagesTable({ 
  flows, 
  selectedBusinessProcesses, 
  onChange 
}: FlowsMessagesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFlow, setEditingFlow] = useState<MessageFlow | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedProcesses, setExpandedProcesses] = useState<Set<string>>(
    new Set(selectedBusinessProcesses)
  );

  // Filter flows to only show those from selected business processes
  const relevantFlows = flows.filter((flow) =>
    selectedBusinessProcesses.includes(flow.businessProcess)
  );

  const filteredFlows = relevantFlows.filter((flow) => {
    const search = searchTerm.toLowerCase();
    return (
      flow.businessProcess.toLowerCase().includes(search) ||
      flow.flow.toLowerCase().includes(search) ||
      flow.msgType.toLowerCase().includes(search) ||
      flow.sender.toLowerCase().includes(search)
    );
  });

  // Group flows by business process
  const flowsByProcess = filteredFlows.reduce((acc, flow) => {
    if (!acc[flow.businessProcess]) {
      acc[flow.businessProcess] = [];
    }
    acc[flow.businessProcess].push(flow);
    return acc;
  }, {} as Record<string, MessageFlow[]>);

  const toggleProcess = (processName: string) => {
    const newExpanded = new Set(expandedProcesses);
    if (newExpanded.has(processName)) {
      newExpanded.delete(processName);
    } else {
      newExpanded.add(processName);
    }
    setExpandedProcesses(newExpanded);
  };

  const handleToggle = (id: string) => {
    onChange(flows.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f)));
  };

  const handleToggleAllInProcess = (processName: string) => {
    const processFlows = flowsByProcess[processName];
    const allSelected = processFlows.every((f) => f.selected);
    onChange(
      flows.map((f) =>
        f.businessProcess === processName ? { ...f, selected: !allSelected } : f
      )
    );
  };

  const handleConfigure = (flow: MessageFlow) => {
    setEditingFlow({ ...flow });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingFlow) {
      onChange(flows.map((f) => (f.id === editingFlow.id ? editingFlow : f)));
      setIsDialogOpen(false);
      setEditingFlow(null);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingFlow(null);
  };

  const selectedCount = relevantFlows.filter((f) => f.selected).length;
  const configuredCount = relevantFlows.filter((f) => f.transactionType).length;

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle>Flows & Messages</CardTitle>
              <CardDescription>
                Configure flows for your selected business processes
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Badge variant="outline" className="gap-2">
                <span className="font-semibold">{selectedCount}</span>
                <span className="text-muted-foreground">of {relevantFlows.length} selected</span>
              </Badge>
              <Badge variant={configuredCount === relevantFlows.length ? "default" : "secondary"} className="gap-2">
                <CheckCircle2 className="h-3 w-3" />
                <span className="font-semibold">{configuredCount}</span>
                <span className="text-muted-foreground">of {relevantFlows.length} configured</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flows by name, type, sender..."
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

          <div className="space-y-4">
            {Object.entries(flowsByProcess).map(([processName, processFlows]) => {
              const isExpanded = expandedProcesses.has(processName);
              const selectedInProcess = processFlows.filter((f) => f.selected).length;
              const configuredInProcess = processFlows.filter((f) => f.transactionType).length;

              return (
                <Collapsible
                  key={processName}
                  open={isExpanded}
                  onOpenChange={() => toggleProcess(processName)}
                >
                  <Card className="border-2">
                    <CollapsibleTrigger asChild>
                      <div className="cursor-pointer hover-elevate active-elevate-2 transition-colors">
                        <CardHeader className="pb-4">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1">
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              )}
                              <div>
                                <h3 className="font-semibold text-lg">{processName}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {processFlows.length} flow{processFlows.length !== 1 ? 's' : ''} available
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">
                                {selectedInProcess}/{processFlows.length} selected
                              </Badge>
                              <Badge
                                variant={
                                  configuredInProcess === processFlows.length
                                    ? "default"
                                    : configuredInProcess > 0
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {configuredInProcess}/{processFlows.length} configured
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="mb-4 flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleAllInProcess(processName);
                            }}
                            data-testid={`button-toggle-all-${processName}`}
                          >
                            {selectedInProcess === processFlows.length
                              ? "Deselect All"
                              : "Select All"}
                          </Button>
                        </div>

                        <div className="border rounded-md overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-muted/50 border-b">
                                  <th className="text-left p-3 text-sm font-medium w-12">#</th>
                                  <th className="text-left p-3 text-sm font-medium">Flow</th>
                                  <th className="text-left p-3 text-sm font-medium">Message Type</th>
                                  <th className="text-left p-3 text-sm font-medium">Sender → Receiver</th>
                                  <th className="text-center p-3 text-sm font-medium w-32">Status</th>
                                  <th className="text-center p-3 text-sm font-medium w-32">Actions</th>
                                  <th className="text-center p-3 text-sm font-medium w-20">Select</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {processFlows.map((flow, index) => (
                                  <tr
                                    key={flow.id}
                                    className={`hover-elevate transition-colors ${
                                      flow.selected ? "bg-muted/30" : ""
                                    }`}
                                    data-testid={`row-flow-${flow.id}`}
                                  >
                                    <td className="p-3 text-muted-foreground font-medium text-sm">
                                      {index + 1}
                                    </td>
                                    <td className="p-3 text-sm">{flow.flow}</td>
                                    <td className="p-3">
                                      <Badge variant="secondary" className="font-mono text-xs">
                                        {flow.msgType}
                                      </Badge>
                                    </td>
                                    <td className="p-3 text-sm">
                                      <span className="font-medium">{flow.sender}</span>
                                      <span className="text-muted-foreground mx-1">→</span>
                                      <span className="font-medium">{flow.receiver}</span>
                                    </td>
                                    <td className="p-3 text-center">
                                      {flow.transactionType ? (
                                        <Badge variant="outline" className="gap-1">
                                          <CheckCircle2 className="h-3 w-3" />
                                          Configured
                                        </Badge>
                                      ) : (
                                        <Badge variant="secondary">Not configured</Badge>
                                      )}
                                    </td>
                                    <td className="p-3 text-center">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleConfigure(flow)}
                                        data-testid={`button-configure-${flow.id}`}
                                      >
                                        <Settings2 className="h-4 w-4 mr-1" />
                                        Configure
                                      </Button>
                                    </td>
                                    <td className="p-3 text-center">
                                      <Checkbox
                                        checked={flow.selected}
                                        onCheckedChange={() => handleToggle(flow.id)}
                                        data-testid={`checkbox-flow-${flow.id}`}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>

          {selectedBusinessProcesses.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No business processes selected</p>
              <p className="text-sm">Please go back to Step 2 and select at least one business process</p>
            </div>
          )}

          {selectedBusinessProcesses.length > 0 && Object.keys(flowsByProcess).length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No flows match your search</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Message Flow</DialogTitle>
            <DialogDescription>
              {editingFlow?.businessProcess} - {editingFlow?.msgType} - {editingFlow?.flow}
            </DialogDescription>
          </DialogHeader>

          {editingFlow && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="accounts">Accounts & Settlement</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender">Sender</Label>
                    <Input
                      id="sender"
                      value={editingFlow.sender}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, sender: e.target.value })
                      }
                      data-testid="input-sender"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiver">Receiver</Label>
                    <Input
                      id="receiver"
                      value={editingFlow.receiver}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, receiver: e.target.value })
                      }
                      data-testid="input-receiver"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={editingFlow.priority}
                      onValueChange={(value) =>
                        setEditingFlow({ ...editingFlow, priority: value })
                      }
                    >
                      <SelectTrigger id="priority" data-testid="select-priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="99">99 - Highest</SelectItem>
                        <SelectItem value="70">70 - High</SelectItem>
                        <SelectItem value="50">50 - Normal</SelectItem>
                        <SelectItem value="30">30 - Low</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="queue-type">Queue Type</Label>
                    <Select
                      value={editingFlow.queueType}
                      onValueChange={(value) =>
                        setEditingFlow({ ...editingFlow, queueType: value })
                      }
                    >
                      <SelectTrigger id="queue-type" data-testid="select-queue-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="T+0">T+0</SelectItem>
                        <SelectItem value="T+1">T+1</SelectItem>
                        <SelectItem value="T+0..9">T+0..9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="future-dated"
                        checked={editingFlow.futureDated}
                        onCheckedChange={(checked) =>
                          setEditingFlow({ ...editingFlow, futureDated: checked as boolean })
                        }
                        data-testid="checkbox-future-dated"
                      />
                      <Label htmlFor="future-dated" className="cursor-pointer">
                        Future Dated Transaction
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accounts" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="debit-account">Debit Account</Label>
                    <Input
                      id="debit-account"
                      value={editingFlow.debitAccount}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, debitAccount: e.target.value })
                      }
                      data-testid="input-debit-account"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credit-account">Credit Account</Label>
                    <Input
                      id="credit-account"
                      value={editingFlow.creditAccount}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, creditAccount: e.target.value })
                      }
                      data-testid="input-credit-account"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Note: Additional account parameters from your Excel file will be added here once you share the column list.
                </p>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-type">Transaction Type</Label>
                    <Input
                      id="transaction-type"
                      placeholder="e.g., SEPA, INST"
                      value={editingFlow.transactionType || ""}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, transactionType: e.target.value })
                      }
                      data-testid="input-transaction-type"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="local-instrument">Local Instrument</Label>
                    <Input
                      id="local-instrument"
                      placeholder="e.g., CORE, B2B"
                      value={editingFlow.localInstrument || ""}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, localInstrument: e.target.value })
                      }
                      data-testid="input-local-instrument"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-level">Service Level</Label>
                    <Input
                      id="service-level"
                      placeholder="e.g., SEPA, URGP"
                      value={editingFlow.serviceLevel || ""}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, serviceLevel: e.target.value })
                      }
                      data-testid="input-service-level"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clearing-channel">Clearing Channel</Label>
                    <Input
                      id="clearing-channel"
                      placeholder="e.g., RTGS, BOOK"
                      value={editingFlow.clearingChannel || ""}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, clearingChannel: e.target.value })
                      }
                      data-testid="input-clearing-channel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-purpose">Payment Purpose</Label>
                    <Input
                      id="payment-purpose"
                      placeholder="e.g., SALA, PENS"
                      value={editingFlow.paymentPurpose || ""}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, paymentPurpose: e.target.value })
                      }
                      data-testid="input-payment-purpose"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-purpose">Category Purpose</Label>
                    <Input
                      id="category-purpose"
                      placeholder="e.g., SUPP, TRAD"
                      value={editingFlow.categoryPurpose || ""}
                      onChange={(e) =>
                        setEditingFlow({ ...editingFlow, categoryPurpose: e.target.value })
                      }
                      data-testid="input-category-purpose"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} data-testid="button-cancel-config">
              Cancel
            </Button>
            <Button onClick={handleSave} data-testid="button-save-config">
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
