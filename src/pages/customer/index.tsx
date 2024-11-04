import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useEffect, useState } from 'react';
interface Client {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
}

export function CustomerPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // dummy data
    setClients([
      { id: '872411 7676 084', name: 'Sinazo Mzilikazi', contactNumber: '021 123 4534', email: 'sinazo@mzilikazi.co.za', address: '15 Reservoir Rd, St Francis, 6312 Eastern Cape' },
      { id: '890312 5057 081', name: 'Ronald Coleman', contactNumber: '082 128 4139', email: 'ronald@coleman.co.za', address: '20 Blenheim Rd, Lynnwood Glen, 0081 Pretoria' },
      { id: '872411 7676 084', name: 'Clive Francis', contactNumber: '072 123 4567', email: 'clive@Francis.co.za', address: '14 Angelica atropua St, Daveyton, Benoni, 1507 Gauteng' },
      { id: '990719 6046 082', name: 'Charlie Parkinson', contactNumber: '072 123 4561', email: 'Charlie@parkinson.co.za', address: '80 Gately St, St Francis, 6312 Eastern Cape' },
      { id: '911031 9693 081', name: 'Zanele Sisulu', contactNumber: '062 423 2563', email: 'zanele@sisulu.co.za', address: '10 Valley Dr, Belvedere Ext 1, Hillcrest, 3650 Kwazulu Natal' },
      { id: '920209 9824 083', name: 'Yuji Pomade', contactNumber: '082 123 4668', email: 'Yuji@pomade.co.za', address: '1 Spin Street, Rosebank, Cape Town, 1507 Western Cape' },
    ]);
  }, []);

  const filteredClients = clients.filter(client =>
    Object.values(client).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastClient = currentPage * rowsPerPage;
  const indexOfFirstClient = indexOfLastClient - rowsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <h2 className="text-2xl font-bold">Clients</h2>
          <div className="hidden items-center space-x-2 sm:flex">
            <span className="text-gray-500">SEARCH</span>
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
          </div>
        </div>

        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-gray-100 border-b">
                <TableHead className="font-semibold text-left py-3 px-4 w-1/5">Client Name</TableHead>
                <TableHead className="font-semibold text-left py-3 px-4 w-1/6">Contact number</TableHead>
                <TableHead className="font-semibold text-left py-3 px-4 w-1/5">Email</TableHead>
                <TableHead className="font-semibold text-left py-3 px-4 w-1/3">Address</TableHead>
                <TableHead className="font-semibold text-center py-3 px-4 w-1/12">Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClients.map((client, index) => (
                <TableRow key={client.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <TableCell className="py-4 px-4 truncate">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.id}</div>
                  </TableCell>
                  <TableCell className="py-4 px-4 truncate">{client.contactNumber}</TableCell>
                  <TableCell className="py-4 px-4 truncate">
                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">{client.email}</a>
                  </TableCell>
                  <TableCell className="py-4 px-4 truncate">{client.address}</TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <Button variant="ghost" size="sm">
                      <Icons.Download className="h-5 w-5" />
                    </Button>
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
              {/* <option value="20">20</option> */}
              {/* <option value="50">50</option> */}
            </Select>
          </div>
          <div className="flex items-center space-x-4">
            <span>{`${indexOfFirstClient + 1} - ${Math.min(indexOfLastClient, filteredClients.length)} of ${filteredClients.length}`}</span>
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
                disabled={indexOfLastClient >= filteredClients.length}
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
