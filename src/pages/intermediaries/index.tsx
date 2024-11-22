import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAllAdvisors } from "@/services/queries";
import { format } from 'date-fns';
import { Check, Search } from "lucide-react";
import { useState } from "react";
// import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";



export function Intermediaries() {
  const [activeFilter, setActiveFilter] = useState("ALL"); // Add this state
  const { data: allAdvisors } = useAllAdvisors()
  const navigate = useNavigate();

  const handleManageIntermediary = (intermediaryId: string) => {
    navigate(`/intermediaries/${intermediaryId}`);
  };

  // Add this function to handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Here you would typically filter the data based on the selected status
    // For now, we're just updating the UI
  };

  return (
    <MainWrapper pageTitle="Advisors">
      <div className="">
      <div className="py-[48px] flex flex-col items-center gap-2 ">
          <p className="text-sm font-medium text-[#58595B] mb-2 leading-3 tracking-[1.83px]">FILTER BY STATUS:</p>
          <div className="flex space-x-2">
            {["ALL", "OPEN", "SUBMITTED", "AWAITING REQUESTS", "CLOSED"].map((filter) => (
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
          <form>
            <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ..."
              className="w-full min-w-[300px] appearance-none rounded-full bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
          </form>
        </div>
        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-[#F2F2F2] text-[#282828]">
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[20%]">Name</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[20%]">Email</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[15%]">Type</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[15%]">Date Registered</TableHead>
                <TableHead className="font-medium text-left leading-[18px] tracking-[0.1px] py-3 px-4 w-[15%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAdvisors && allAdvisors.map((advisor) => (
                <TableRow 
                  key={advisor.adviser_id} 
                  className="cursor-pointer"
                  onClick={() => handleManageIntermediary(advisor.user_id)}
                >
                  <TableCell className="py-5 px-5 truncate bg-white">{advisor.names}</TableCell>
                  <TableCell className="py-5 px-5 truncate">{advisor.email}</TableCell>
                  <TableCell className="py-5 px-5 truncate bg-white">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      advisor.intermediary_type === 'Applicant' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {advisor.intermediary_type}
                    </span>
                  </TableCell>
                  <TableCell className="py-5 px-5 truncate">
                    {format(new Date(advisor.create_date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="py-5 px-5 bg-white">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleManageIntermediary(advisor.user_id)}>
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
        {/* Pagination controls (similar to Departments) */}
      </div>
    </MainWrapper>
  );
}
