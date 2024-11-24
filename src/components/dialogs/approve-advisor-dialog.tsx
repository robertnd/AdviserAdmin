import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAdminProductCategories } from "@/services/queries";

interface ApproveAdvisorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  advisorName: string;
  onApprove: (selectedProducts: number[]) => void;
  dialogText?: string;
}

export function ApproveAdvisorDialog({
  isOpen,
  onOpenChange,
  advisorName,
  onApprove,
  dialogText="Approve Advisor",
}: ApproveAdvisorDialogProps) {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { data: productCategories } = useAdminProductCategories(advisorName);

  // Get all products from categories
  const allProducts = productCategories?.flatMap(category => 
    category.products.map((product: any) => product.id)
  ) ?? [];

  const handleApproveAll = (checked: boolean) => {
    setSelectedProducts(checked ? allProducts : []);
  };

  const handleProductSelect = (product: number, checked: boolean) => {
    setSelectedProducts(prev =>
      checked
        ? [...prev, product]
        : prev.filter(p => p !== product)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{dialogText}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="approve-all"
              checked={selectedProducts.length === allProducts.length}
              onCheckedChange={(checked) => handleApproveAll(checked as boolean)}
            />
            <label htmlFor="approve-all" className="font-medium">
              Approve for all Products
            </label>
          </div>

          <div className="space-y-2 pl-6">
            {productCategories?.map((category) => (
              <div key={category.category_id} className="space-y-2">
                <div className="text-sm font-medium">{category.category_name}</div>
                {category.products.map((product: any) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={product.id}
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) => handleProductSelect(product.id, checked as boolean)}
                    />
                    <label htmlFor={product.name}>{product.name}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onApprove(selectedProducts)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
