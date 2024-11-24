import AddProductDialog from "@/components/dialogs/add-product-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useProductCategory, useProductCategoryAdmins, useProductsByCategory } from "@/services/queries";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AddPermissionDialog from "@/components/dialogs/add-permission-dialog";
import { useAssignProductCategoryApprovalPermission, useRemoveProductCategoryApprovalPermission } from "@/services/mutations";
import { ProductCategorySettings } from "@/components/tabs/product-category-settings";
import { Loader2 } from "lucide-react";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
// }

// interface Permission {
//   id: string;
//   userName: string;
//   email: string;
//   role: string;
//   dateGranted: string;
// }

export function ManageProductCategory() {
  const { categoryId } = useParams<{ categoryId: string }>(); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // const [permissions,] = useState<Permission[]>([

  // ]);
  const { data: permissions } = useProductCategoryAdmins(categoryId!);

  // Fetch category details and products
  const { data: category, isLoading: isCategoryLoading } = useProductCategory(categoryId!);
  const { data: products, isLoading: isProductsLoading } = useProductsByCategory(categoryId!);
  const { mutate: assignProductCategoryApprovalPermission } = useAssignProductCategoryApprovalPermission();
  const { mutate: removeProductCategoryApprovalPermission, isPending: isRemovePending } = useRemoveProductCategoryApprovalPermission();

  // Filter products based on search term
  // const filteredProducts = products?.filter(product =>
  //   Object.values(product).some(value =>
  //     typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // ) || [];

  const handleAddPermission = (adminId: string) => {
    assignProductCategoryApprovalPermission({
      product_category_id: categoryId!,
      admin_user_id: adminId.toString()
    });
  };

  const handleRemovePermission = (adminId: string) => {
    removeProductCategoryApprovalPermission({
      product_category_id: categoryId!,
      admin_user_id: adminId.toString()
    });
  };


  if (isCategoryLoading) {
    return (
      <MainWrapper>
        <div className="flex items-center justify-center h-screen">
          <Icons.spinner className="h-8 w-8 animate-spin" />
        </div>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold">{category?.name}</h2>
            <span className={`px-2 py-1 rounded-full text-sm ${
              category?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {category?.status}
            </span>
          </div>
          <Button variant="outline" onClick={() => navigate('/product-categories')}>
            <Icons.ChevronLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="settings">Category Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-4">
                  <div className="relative">
                    <Icons.Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full min-w-[300px] pl-8"
                    />
                  </div>
                  <AddProductDialog categoryId={categoryId} />
                </div>

                {isProductsLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <Icons.spinner className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <>
                    <Table className="w-full table-fixed">
                      <TableHeader>
                        <TableRow className="bg-[#F2F2F2] text-[#282828]">
                          <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">Name</TableHead>
                          <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">Description</TableHead>
                          <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products && products.map((product, index) => (
                          <TableRow key={product.id} className="hover:bg-gray-50">
                            <TableCell className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}>
                              {product.name}
                            </TableCell>
                            <TableCell className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}>
                              {product.description}
                            </TableCell>
                            <TableCell className={`py-5 px-5 ${index % 2 === 0 ? 'bg-white' : ''}`}>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="flex items-center">
                                  <Icons.Pencil className="h-4 w-4 mr-1" />
                                  Edit
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
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">User Permissions</h3>
                  <AddPermissionDialog 
                    categoryId={categoryId!} 
                    onAddPermission={handleAddPermission} 
                  />
                </div>
                <Table className="w-full table-fixed">
                  <TableHeader>
                    <TableRow className="bg-[#F2F2F2] text-[#282828]">
                      <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">User</TableHead>
                      <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">Status</TableHead>
                      <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">Date Granted</TableHead>
                      <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions && permissions.map((permission, index) => (
                      <TableRow key={permission.id} className="hover:bg-gray-50">
                        <TableCell className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}>
                          {permission.user_id}
                        </TableCell>
                        <TableCell className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}>
                          {permission.status}
                        </TableCell>
                        <TableCell className={`py-5 px-5 truncate ${index % 2 === 0 ? 'bg-white' : ''}`}>
                          {new Date(permission.create_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className={`py-5 px-5 ${index % 2 === 0 ? 'bg-white' : ''}`}>
                          <Button variant="outline" size="sm" className="flex items-center text-red-600 hover:text-red-700" onClick={() => handleRemovePermission(permission.user_id)} disabled={isRemovePending}>
                            {isRemovePending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icons.Trash className="h-4 w-4 mr-1" />}
                            Remove Access
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <ProductCategorySettings category={category} />
          </TabsContent>
        </Tabs>
      </div>
    </MainWrapper>
  );
}
