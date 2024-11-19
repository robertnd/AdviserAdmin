import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllAdmins } from "@/services/queries"; // You'll need to create this query
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddPermissionDialogProps {
  categoryId: string;
  onAddPermission: (adminId: string) => void;
}

export default function AddPermissionDialog({ onAddPermission }: AddPermissionDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const { data: admins } = useAllAdmins();

  const handleSubmit = () => {
    if (selectedAdmin) {
      onAddPermission(selectedAdmin);
      setOpen(false);
      setSelectedAdmin("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Admin Permission</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Admin</label>
            <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
              <SelectTrigger>
                <SelectValue placeholder="Select an admin" />
              </SelectTrigger>
              <SelectContent>
                {admins?.map((admin) => (
                  <SelectItem key={admin.id} value={admin.user_id}>
                    {admin.name} ({admin.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Permission</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
