/* eslint-disable @typescript-eslint/no-unused-vars */
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useParams } from "react-router-dom";

interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartment: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
}

export function ManageDepartment() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [department, setDepartment] = useState<Department>({
    id: departmentId || '',
    name: 'Sample Department',
    description: 'Sample Description',
    headOfDepartment: 'Jane Doe',
  });
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'John Doe', role: 'Manager' },
    { id: '2', name: 'Jane Smith', role: 'Developer' },
    // ... more dummy data ...
  ]);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Product A', category: 'Software' },
    { id: '2', name: 'Product B', category: 'Hardware' },
    // ... more dummy data ...
  ]);
  const [availableMembers, setAvailableMembers] = useState<Member[]>([
    { id: '3', name: 'Bob Johnson', role: 'Designer' },
    { id: '4', name: 'Alice Brown', role: 'Tester' },
    // ... more dummy data ...
  ]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([
    { id: '3', name: 'Product C', category: 'Service' },
    { id: '4', name: 'Product D', category: 'Software' },
    // ... more dummy data ...
  ]);
  const [itemToRemove, setItemToRemove] = useState<Member | Product | null>(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const addMember = (memberId: string) => {
    const memberToAdd = availableMembers.find(m => m.id === memberId);
    if (memberToAdd) {
      setMembers([...members, memberToAdd]);
      setAvailableMembers(availableMembers.filter(m => m.id !== memberId));
    }
  };

  const removeMember = (memberId: string) => {
    const memberToRemove = members.find(m => m.id === memberId);
    if (memberToRemove) {
      setItemToRemove(memberToRemove);
      setIsRemoveDialogOpen(true);
    }
  };

  const addProduct = (productId: string) => {
    const productToAdd = availableProducts.find(p => p.id === productId);
    if (productToAdd) {
      setProducts([...products, productToAdd]);
      setAvailableProducts(availableProducts.filter(p => p.id !== productId));
    }
  };

  const removeProduct = (productId: string) => {
    const productToRemove = products.find(p => p.id === productId);
    if (productToRemove) {
      setItemToRemove(productToRemove);
      setIsRemoveDialogOpen(true);
    }
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      if ('role' in itemToRemove) {
        setMembers(members.filter(m => m.id !== itemToRemove.id));
        setAvailableMembers([...availableMembers, itemToRemove]);
      } else {
        setProducts(products.filter(p => p.id !== itemToRemove.id));
        setAvailableProducts([...availableProducts, itemToRemove]);
      }
    }
    setIsRemoveDialogOpen(false);
    setItemToRemove(null);
  };

  const updateDepartmentDetails = (field: keyof Department, value: string) => {
    setDepartment(prev => ({ ...prev, [field]: value }));
  };

  // const updateProductDetails = (productId: string, field: keyof Product, value: string) => {
  //   setProducts(prev => prev.map(p => p.id === productId ? { ...p, [field]: value } : p));
  // };

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <h2 className="text-2xl font-bold">Manage Department: {departmentId}</h2>
        </div>
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Department Details</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold pt-4">Department Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2">Department Name</label>
                <Input
                  value={department.name}
                  onChange={(e) => updateDepartmentDetails('name', e.target.value)}
                />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2">Description</label>
                <Input
                  value={department.description}
                  onChange={(e) => updateDepartmentDetails('description', e.target.value)}
                />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2">Head of Department</label>
                <Input
                  value={department.headOfDepartment}
                  onChange={(e) => updateDepartmentDetails('headOfDepartment', e.target.value)}
                />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          </TabsContent>
          <TabsContent value="members">
            <div className="flex items-center py-4">
              <h3 className="text-xl font-semibold mr-8">Department Members</h3>
              <AddItemDialog
                title="Add Member"
                items={availableMembers}
                onAdd={addMember}
                renderItem={(item) => `${item.name} (${item.role})`}
              />
            </div>
            <div className="w-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-gray-100 border-b">
                    <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Name</TableHead>
                    <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Role</TableHead>
                    <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member, index) => (
                    <TableRow key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <TableCell className="py-4 px-4 truncate">{member.name}</TableCell>
                      <TableCell className="py-4 px-4 truncate">{member.role}</TableCell>
                      <TableCell className="py-4 px-4">
                        <Button variant="destructive" size="sm" onClick={() => removeMember(member.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="products">
            <div className="flex items-center py-4">
              <h3 className="text-xl font-semibold mr-8">Department Products</h3>
              <AddItemDialog
                title="Add Product"
                items={availableProducts}
                onAdd={addProduct}
                renderItem={(item) => `${item.name} (${item.category})`}
              />
            </div>
            <div className="w-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-gray-100 border-b">
                    <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Name</TableHead>
                    <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Category</TableHead>
                    <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <TableCell className="py-4 px-4 truncate">{product.name}</TableCell>
                      <TableCell className="py-4 px-4 truncate">{product.category}</TableCell>
                      <TableCell className="py-4 px-4">
                        <Button variant="destructive" size="sm" onClick={() => removeProduct(product.id)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <RemoveConfirmationDialog
        isOpen={isRemoveDialogOpen}
        onClose={() => setIsRemoveDialogOpen(false)}
        onConfirm={confirmRemove}
        itemName={itemToRemove ? ('role' in itemToRemove ? itemToRemove.name : itemToRemove.name) : ''}
        itemType={'role' in (itemToRemove || {}) ? 'member' : 'product'}
      />
    </MainWrapper>
  );
}

interface AddItemDialogProps<T> {
  title: string;
  items: T[];
  onAdd: (id: string) => void;
  renderItem: (item: T) => string;
}

function AddItemDialog<T extends { id: string }>({ title, items, onAdd, renderItem }: AddItemDialogProps<T>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = () => {
    if (selectedId) {
      onAdd(selectedId);
      setIsOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Select onValueChange={(value) => setSelectedId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an item" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {renderItem(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button onClick={handleAdd} disabled={!selectedId}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface RemoveConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: 'member' | 'product';
}

function RemoveConfirmationDialog({ isOpen, onClose, onConfirm, itemName, itemType }: RemoveConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Removal</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to remove {itemName} from this department?</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Remove {itemType}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}