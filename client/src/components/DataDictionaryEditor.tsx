import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

export interface DictionaryEntry {
  id: string;
  key: string;
  value: string;
  type: string;
}

interface DataDictionaryEditorProps {
  entries: DictionaryEntry[];
  onChange: (entries: DictionaryEntry[]) => void;
}

export default function DataDictionaryEditor({ entries, onChange }: DataDictionaryEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DictionaryEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ key: "", value: "", type: "string" });

  const filteredEntries = entries.filter(
    (entry) =>
      entry.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newEntry: DictionaryEntry = {
      id: Date.now().toString(),
      ...formData,
    };
    onChange([...entries, newEntry]);
    setFormData({ key: "", value: "", type: "string" });
    setIsDialogOpen(false);
  };

  const handleEdit = (entry: DictionaryEntry) => {
    setEditingEntry(entry);
    setFormData({ key: entry.key, value: entry.value, type: entry.type });
    setIsDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingEntry) {
      onChange(
        entries.map((e) =>
          e.id === editingEntry.id ? { ...e, ...formData } : e
        )
      );
      setEditingEntry(null);
      setFormData({ key: "", value: "", type: "string" });
      setIsDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    onChange(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Data Dictionary</CardTitle>
          <CardDescription>
            Manage your document's data fields and their values
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-dictionary"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingEntry(null);
                setFormData({ key: "", value: "", type: "string" });
              }
            }}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-entry">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingEntry ? "Edit Entry" : "Add New Entry"}</DialogTitle>
                  <DialogDescription>
                    {editingEntry ? "Update the entry details below" : "Create a new data dictionary entry"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="key">Key</Label>
                    <Input
                      id="key"
                      data-testid="input-entry-key"
                      placeholder="e.g., customer_name"
                      value={formData.key}
                      onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      data-testid="input-entry-value"
                      placeholder="e.g., John Doe"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger id="type" data-testid="select-entry-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingEntry(null);
                      setFormData({ key: "", value: "", type: "string" });
                    }}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editingEntry ? handleUpdate : handleAdd}
                    disabled={!formData.key || !formData.value}
                    data-testid="button-save-entry"
                  >
                    {editingEntry ? "Update" : "Add"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {filteredEntries.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} data-testid={`row-entry-${entry.id}`}>
                      <TableCell className="font-mono text-sm">{entry.key}</TableCell>
                      <TableCell>{entry.value}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                          {entry.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(entry)}
                            data-testid={`button-edit-${entry.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(entry.id)}
                            data-testid={`button-delete-${entry.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No entries found. Click "Add Entry" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
