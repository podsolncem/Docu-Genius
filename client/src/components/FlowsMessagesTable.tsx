import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X, Settings2, CheckCircle2 } from "lucide-react";

export interface MessageFlow {
  id: string;
  businessProcess: string;
  function: string;
  msgType: string;
  sender: string;
  receiver: string;
  debitAccount: string;
  creditAccount: string;
  futureDated: boolean;
  queueType: string;
  priority: string;
  selected: boolean;
  // Extended parameters
  transactionType?: string;
  localInstrument?: string;
  serviceLevel?: string;
  chargeBearer?: string;
  settlementMethod?: string;
  clearingChannel?: string;
  instructionPriority?: string;
  paymentPurpose?: string;
  categoryPurpose?: string;
  regulatoryReporting?: string;
}

interface FlowsMessagesTableProps {
  flows: MessageFlow[];
  onChange: (flows: MessageFlow[]) => void;
}

export default function FlowsMessagesTable({ flows, onChange }: FlowsMessagesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFlow, setEditingFlow] = useState<MessageFlow | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const selectedCount = flows.filter((f) => f.selected).length;
  const businessProcessCount = new Set(flows.filter((f) => f.selected).map((f) => f.businessProcess)).size;

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Flows & Messages</CardTitle>
          <CardDescription>
            Select message flows and configure their parameters
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
                  <TableHead>Message Type</TableHead>
                  <TableHead className="w-32 text-center">Status</TableHead>
                  <TableHead className="w-32 text-center">Actions</TableHead>
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
                      <TableCell className="font-medium">
                        {flow.businessProcess}
                      </TableCell>
                      <TableCell className="text-sm">{flow.function}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {flow.msgType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {flow.transactionType ? (
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Configured
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not configured</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfigure(flow)}
                          data-testid={`button-configure-${flow.id}`}
                        >
                          <Settings2 className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
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
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
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

      {/* Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Message Flow</DialogTitle>
            <DialogDescription>
              Set all parameters for {editingFlow?.msgType} - {editingFlow?.function}
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
                  <div className="space-y-2">
                    <Label htmlFor="settlement-method">Settlement Method</Label>
                    <Select
                      value={editingFlow.settlementMethod || ""}
                      onValueChange={(value) =>
                        setEditingFlow({ ...editingFlow, settlementMethod: value })
                      }
                    >
                      <SelectTrigger id="settlement-method" data-testid="select-settlement-method">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INDA">INDA - Intra-Day</SelectItem>
                        <SelectItem value="INGA">INGA - Intra-Day Gross</SelectItem>
                        <SelectItem value="COVE">COVE - Cover</SelectItem>
                        <SelectItem value="CLRG">CLRG - Clearing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="charge-bearer">Charge Bearer</Label>
                    <Select
                      value={editingFlow.chargeBearer || ""}
                      onValueChange={(value) =>
                        setEditingFlow({ ...editingFlow, chargeBearer: value })
                      }
                    >
                      <SelectTrigger id="charge-bearer" data-testid="select-charge-bearer">
                        <SelectValue placeholder="Select bearer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEBT">DEBT - Debtor</SelectItem>
                        <SelectItem value="CRED">CRED - Creditor</SelectItem>
                        <SelectItem value="SHAR">SHAR - Shared</SelectItem>
                        <SelectItem value="SLEV">SLEV - Service Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
