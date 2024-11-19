import AddProductCategoryDialog from '@/components/dialogs/add-product-category';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAllProductCategories } from "@/services/queries";
import { Search } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// interface ProductCategory {
//   id: string;
//   name: string;
//   description: string;
//   status?: string;
//   productsCount?: number;
// }

export function ProductCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allCategories } = useAllProductCategories();
  const navigate = useNavigate();


  const handleManageProduct = (categoryId: string) => {
    navigate(`/product-categories/${categoryId}`);
  };

  return (
    <MainWrapper pageTitle="Product Categories">
      <div className="">
        <div className="flex justify-between items-center bg-[#DCDDDE] p-4">
          <h2 className="text-2xl font-bold"></h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full min-w-[300px] appearance-none rounded-full bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
            <AddProductCategoryDialog />
          </div>
        </div>

        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-[#F2F2F2] text-[#282828]">
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[25%]">Name</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[25%]">Description</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[15%]">Products</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[15%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCategories?.map((category, index) => (
                <TableRow 
                  key={category.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleManageProduct(category.id)}

                >
                  <TableCell 
                    className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}
                  >
                    {category.name}
                  </TableCell>
                  <TableCell 
                    className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}
                  >
                    {category.description}
                  </TableCell>
                  <TableCell 
                    className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}
                  >
                    {category.productsCount}
                  </TableCell>
                  <TableCell className={`py-5 px-5 ${index % 2 === 0 ? 'bg-white' : ''}`}>
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center"
                        onClick={() => handleManageProduct(category.id)}
                      >
                        <Icons.Pencil className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainWrapper>
  );
}
