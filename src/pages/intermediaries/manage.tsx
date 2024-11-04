import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useAdvisorById, useGetApplicantFiles, useGetFileContent } from "@/services/queries";
import { Check, FileIcon, EyeIcon, DownloadIcon } from "lucide-react";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateAdvisorStatus } from "@/services/mutations";


export function ManageIntermediary() {
  const { intermediaryId } = useParams<{ intermediaryId: string }>();
  const { data: advisor, isLoading } = useAdvisorById(intermediaryId! as string);
  const { mutate: updateAdvisorStatus } = useUpdateAdvisorStatus();

  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const handleApprove = () => {
    updateAdvisorStatus({ user_id: advisor?.user_id, status: 'Active' });
    setIsApproveDialogOpen(false);
  };

  if (isLoading) {
    return <MainWrapper><div>Loading...</div></MainWrapper>
  }

  if (!advisor) {
    return <MainWrapper><div>No advisor data found</div></MainWrapper>;
  }

  return (
    <MainWrapper>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-100 p-4">
          <div className="flex items-center space-x-2">
            {/* {JSON.stringify(advisor)} */}
            <h2 className="text-2xl font-bold">{advisor.names}</h2>
            <span className={`px-2 py-1 rounded-full text-sm ${
              advisor.intermediary_type === 'Applicant' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {advisor.intermediary_type}
            </span>
          </div>
          {advisor.intermediary_type === 'Applicant' && (
            <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Check className="h-4 w-4 mr-2" />
                  Approve Intermediary
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approve Intermediary</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to approve {advisor.names}? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white">
                    Confirm Approval
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Full Name" value={advisor.names} />
                  <InfoItem label="Email" value={advisor.email} />
                  <InfoItem label="Phone" value={advisor.mobile_no} />
                  <InfoItem label="Date of Birth" value={new Date(advisor.date_of_birth_or_inc).toLocaleDateString()} />
                  <InfoItem label="ID Type" value={advisor.id_type} />
                  <InfoItem label="ID Number" value={advisor.id_number} />
                  <InfoItem label="City" value={advisor.city} />
                  <InfoItem label="Address" value={advisor.address} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="business" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="KRA PIN" value={advisor.kra_pin} />
                  <InfoItem label="Legal Entity Type" value={advisor.legal_entity_type} />
                  <InfoItem label="Intermediary Type" value={advisor.intermediary_type} />
                  <InfoItem label="Date Registered" value={new Date(advisor.create_date).toLocaleDateString()} />
                  <InfoItem label="Account Number" value={advisor.account_no || 'N/A'} />
                  <InfoItem label="Partner Number" value={advisor.partner_number || 'N/A'} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            <DocumentsTab intermediaryId={intermediaryId!} />
          </TabsContent>
          <TabsContent value="activity" className="mt-4">
            {/* Add activity log here */}
            <p>Activity log section (to be implemented)</p>
          </TabsContent>
        </Tabs>
      </div>
    </MainWrapper>
  );
}

function DocumentsTab({ intermediaryId }: { intermediaryId: string }) {
  const { data: filesData, isLoading: isLoadingFiles } = useGetApplicantFiles(intermediaryId);
  if (isLoadingFiles) {
    return <div>Loading documents...</div>;
  }

  if (!filesData) {
    return <div>No documents found.</div>;
  }

  return (
    <div className="space-y-4">
      {filesData.map((file: any) => (
        <DocumentCard key={file.id} file={file} />
      ))}
    </div>
  );
}

function DocumentCard({ file }: { file: any }) {
  const { data: fileContent, isLoading: isLoadingContent } = useGetFileContent(file.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = () => {
    if (fileContent) {
      setIsModalOpen(true);
    }
  };

  const handleDownload = () => {
    if (fileContent) {
      const link = document.createElement('a');
      link.href = `${fileContent}`;
      const fileType = fileContent.startsWith('data:application/pdf') ? 'pdf' : 
                       fileContent.startsWith('data:image/') ? fileContent.split(';')[0].split('/')[1] :
                       'txt'; 
      link.download = `${file.file_desc}.${fileType}`;
      link.click();
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FileIcon className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">{file.file_desc}</h3>
                {/* <p>{JSON.stringify(fileContent)}</p> */}
                <p className="text-sm text-gray-500">Uploaded on: {new Date(file.create_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button onClick={handleView} disabled={isLoadingContent} size="sm">
                <EyeIcon className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button onClick={handleDownload} disabled={isLoadingContent} size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{file.file_desc}</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[80vh]">
            <iframe src={`${fileContent}`} className="w-full h-full" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="mt-1">{value || 'N/A'}</span>
    </div>
  );
}