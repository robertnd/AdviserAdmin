import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  department: string;
  owner: string;
}

export function ManageProduct() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    department: '',
    owner: '',
  });

  // Simulating fetching product data
  useEffect(() => {
    // In a real application, you would fetch the product data from an API
    // For now, we'll use dummy data
    const dummyProduct: Product = {
      id: productId || '',
      name: 'Health Insurance',
      department: 'Human Resources',
      owner: '',
    };
    setProduct(dummyProduct);
  }, [productId]);

  const updateProductDetails = (field: keyof Product, value: string) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the updated product data to your backend
    console.log('Saving product:', product);
    // After saving, navigate back to the products list
    navigate('/products');
  };

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <h2 className="text-2xl font-bold">Manage Product: {product.name}</h2>
          <Button variant="outline" onClick={() => navigate('/products')}>
            <Icons.ChevronLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <Input
                value={product.name}
                onChange={(e) => updateProductDetails('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select
                value={product.department}
                onValueChange={(value) => updateProductDetails('department', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Owner</label>
              <Input
                value={product.owner}
                onChange={(e) => updateProductDetails('owner', e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => navigate('/products')}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
