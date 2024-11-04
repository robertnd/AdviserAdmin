import AddAdminDialog from "@/components/dialogs/add-admin-dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAllAdmins } from "@/services/queries";
import { useState } from 'react';
import { format } from 'date-fns';
import { Check, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Admins() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: allAdmins } = useAllAdmins()
  const [activeFilter, setActiveFilter] = useState("ALL");
  const navigate = useNavigate();

  const filteredAdmins = allAdmins?.filter(admin =>
    Object.values(admin).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];

  const indexOfLastAdmin = currentPage * rowsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - rowsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleManageAdmin = (adminId: string) => {
    navigate(`/admins/${adminId}`);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Implement filtering logic here
  };

  return (
    <MainWrapper pageTitle="Admins">
      <div className="">
        <div className="py-[48px] flex flex-col items-center gap-2 ">
          <p className="text-sm font-medium text-[#58595B] mb-2 leading-3 tracking-[1.83px]">FILTER BY STATUS:</p>
          <div className="flex space-x-2">
            {["ALL", "ACTIVE", "PENDING"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(filter)}
                className={`rounded-full text-[12px] font-medium leading-3 tracking-[0.4px] ${
                  activeFilter === filter ? "bg-green-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <div className="flex items-center justify-center ml-2 h-6 w-6 rounded-full bg-white">
                    <Check className="mr-1 h-4 w-4 flex items-center justify-center text-green-600 ml-1" />
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
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
            <AddAdminDialog />
          </div>
        </div>
        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-[#F2F2F2] text-[#282828]">
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[25%]">ID</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[25%]">Email</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[25%]">Status</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[25%]">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAdmins.map((admin) => (
                <TableRow 
                  key={admin.id} 
                  className="cursor-pointer"
                  onClick={() => handleManageAdmin(admin.id)}
                >
                  <TableCell className="py-5 px-5 truncate bg-white">{admin.id}</TableCell>
                  <TableCell className="py-5 px-5 truncate">
                    <a href={`mailto:${admin.email}`} className="text-blue-600 hover:underline">{admin.email}</a>
                  </TableCell>
                  <TableCell className="py-5 px-5 truncate bg-white">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      admin.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-5 truncate">
                    {format(new Date(admin.create_date), 'MMM d, yyyy')}
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
            <span>{`${indexOfFirstAdmin + 1} - ${Math.min(indexOfLastAdmin, filteredAdmins.length)} of ${filteredAdmins.length}`}</span>
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
                disabled={indexOfLastAdmin >= filteredAdmins.length}
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
