import AddBranchDialog from '@/components/dialogs/add-branch-dialog';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Branch {
  id: string;
  region: string;
  name: string;
  staffCount: number;
  admin: string;
 products: number;
}

export function Branches() {
  const [branches,] = useState<Branch[]>([

    {
      id: '1', name: 'Nakuru Branch', staffCount: 10, admin: 'John Doe', products: 382,
      region: ''
    },
    {
      id: '2', name: 'Nairobi Branch', staffCount: 20, admin: 'Jane Doe', products: 600,
      region: ''
    },
    {
      id: '3', name: 'Mombasa Branch', staffCount: 30, admin: 'John Smith', products: 335,
      region: ''
    },
    {
      id: '4', name: 'Kisumu Branch', staffCount: 40, admin: 'Jane Smith', products: 400,
      region: ''
    },
    {
      id: '5', name: 'Eldoret Branch', staffCount: 50, admin: 'John Doe', products: 50,
      region: ''
    },
    
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBranch = currentPage * rowsPerPage;
  const indexOfFirstBranch = indexOfLastBranch - rowsPerPage;
    const currentBranches = filteredBranches.slice(indexOfFirstBranch, indexOfLastBranch);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleManageBranch = (branchId: string) => {
    navigate(`/branches/${branchId}`);
  };

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <h2 className="text-2xl font-bold">Branches</h2>
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
            <AddBranchDialog />
          </div>
        </div>
        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b">
                <TableHead className="font-semibold text-left py-4 px-4 w-[17%]">Region</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[17%]">Branch Name</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[17%]">Staff Count</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[17%]">Admin</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[17%]">Products</TableHead>
                <TableHead className="font-semibold text-left py-4 px-4 w-[17%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBranches.map((branch, index) => (
                <TableRow 
                  key={branch.id} 
                  className={`${index % 2 === 0 ? 'bg-white' : ''} cursor-pointer border-b border-gray-200`} 
                  onClick={() => handleManageBranch(branch.id)}
                >
                  <TableCell className="py-5 px-4 truncate">{branch.region}</TableCell>
                  <TableCell className="py-5 px-4 truncate bg-gray-100">{branch.name}</TableCell>
                  <TableCell className="py-5 px-4 truncate">{branch.staffCount}</TableCell>
                  <TableCell className="py-5 px-4 truncate bg-gray-100">{branch.admin}</TableCell>
                  <TableCell className="py-5 px-4 truncate">{branch.products}</TableCell>
                  <TableCell className="py-5 px-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleManageBranch(branch.id)}>
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
            <span>{`${indexOfFirstBranch + 1} - ${Math.min(indexOfLastBranch, filteredBranches.length)} of ${filteredBranches.length}`}</span>
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
                disabled={indexOfLastBranch >= filteredBranches.length}
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
