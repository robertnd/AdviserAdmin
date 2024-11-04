import AddProductDialog from '@/components/dialogs/add-product-dialog';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  department: string;
  owner: string;
}

export function Products() {
  const [products,] = useState<Product[]>([
    { id: '1', name: 'Health Insurance', department: 'Human Resources', owner: 'AAR Insurance' },
    { id: '2', name: 'Car Insurance',  department: 'Marketing', owner: 'DirectLine Insurance' },
    { id: '3', name: 'Home Insurance',  department: 'Finance', owner: 'Jubilee Insurance' },
    { id: '4', name: 'Travel Insurance', department: 'IT', owner: 'Britannia Insurance' },
    { id: '5', name: 'Life Insurance',  department: 'Operations', owner: 'Cytonn Insurance' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleManageProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <h2 className="text-2xl font-bold">Products</h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Search</span>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
              <Icons.Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <AddProductDialog />
          </div>
        </div>
        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b">
                <TableHead className="font-semibold text-left py-4 px-4 w-[33%]">Product Name</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[33%]">Department</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[33%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow 
                  key={product.id} 
                  className="cursor-pointer border-b border-gray-200" 
                  onClick={() => handleManageProduct(product.id)}
                >
                  <TableCell className="py-5 px-4 truncate">{product.name}</TableCell>
                  <TableCell className="py-5 px-4 truncate bg-gray-100">{product.department}</TableCell>
                  <TableCell className="py-5 px-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleManageProduct(product.id)}>
                        <Icons.Pencil className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center text-red-600 hover:text-red-700">
                        <Icons.Trash className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4">
          <div className="flex items-center space-x-2">
            <span>Rows per page</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(Number(value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <span>{`${indexOfFirstProduct + 1} - ${Math.min(indexOfLastProduct, filteredProducts.length)} of ${filteredProducts.length}`}</span>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Icons.ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastProduct >= filteredProducts.length}
              >
                <Icons.ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
