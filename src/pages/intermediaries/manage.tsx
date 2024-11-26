import { ApproveAdvisorDialog } from "@/components/dialogs/approve-advisor-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { useApproveAdvisor, useUpdateAdvisorProducts, useUpdateAdvisorReview } from "@/services/mutations";
import { useAdviserReview, useAdvisorById, useGetApplicantFiles, useGetFileContent } from "@/services/queries";
import { Check, DownloadIcon, EyeIcon, FileIcon, Loader2 } from "lucide-react";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import AdviserProductApprovalStatus from "./tabs/adviser-product-approval-status";
import { ReviewAdvisorDialog } from "@/components/dialogs/review-adviser-dialog";
import { AdviserReviewStatus } from "@/constants";


export function ManageIntermediary() {
  const { intermediaryId } = useParams<{ intermediaryId: string }>();
  const { data: advisor, isLoading } = useAdvisorById(intermediaryId! as string);
  const { mutate: approveAdvisor, isPending: isApprovePending } = useApproveAdvisor();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isUpdateAdvisorProductsDialogOpen, setIsUpdateAdvisorProductsDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const { mutate: updateAdvisorReviewFn, isPending: isReviewPending } = useUpdateAdvisorReview();
  const { mutate: updateAdvisorProductsFn, isPending: isUpdatePending } = useUpdateAdvisorProducts();
  const { data: adviserReview } = useAdviserReview(intermediaryId as string);


  const handleReview = ( requirements: string[], actionRequired: boolean, comments: string) => {
    console.log('Selected requirements:', requirements);
    const reviewStatus = !actionRequired ? AdviserReviewStatus.Approved : AdviserReviewStatus.Action_Required;
    const requirementsMap = {
      national_id: requirements.includes("ID Document"),
      kra_pin: requirements.includes("KRA PIN"),
      iprs: requirements.includes("IRA Number"),
      copy_of_national_id: requirements.includes("Copy of ID"),
      copy_of_kra_pin: requirements.includes("Copy of PIN")
    };
    updateAdvisorReviewFn({
      review_id: adviserReview?.id,
      user_id: advisor?.user_id,
      adviser_id: advisor?.id,
      status: reviewStatus,
      comment: comments,
      document_verification_status: JSON.stringify(requirementsMap)
    });
    setIsReviewDialogOpen(false);
  };

  const handleApprove = (selectedProducts: number[]) => {
    approveAdvisor({ 
      review_id: adviserReview?.id,
      user_id: advisor?.user_id, 
      adviser_id: advisor?.id,
      status: AdviserReviewStatus.Approved,
      product_ids: selectedProducts 
    });
    setIsApproveDialogOpen(false);
  };

  const handleUpdate = (selectedProducts: number[]) => {
    updateAdvisorProductsFn({ 
      adviser_id: advisor?.user_id,
      product_ids: selectedProducts 
    });
    setIsUpdateAdvisorProductsDialogOpen(false);
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
            <>
              <div className="space-x-2">
                {adviserReview?.status !== AdviserReviewStatus.Approved && (
                  <>
                    <Button 
                      onClick={() => setIsReviewDialogOpen(true)}
                  variant="outline"
                  disabled={adviserReview?.current_workflow_stage_id != 1 ||(adviserReview?.current_workflow_stage_id == 1 && adviserReview?.status == AdviserReviewStatus.Approved)}
                >
                  {isReviewPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2 text-green-600" />}
                  Review Advisor
                  </Button>
                <Button 
                  onClick={() => setIsApproveDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={(adviserReview?.current_workflow_stage_id == 1 && adviserReview?.status == AdviserReviewStatus.Approved) || (adviserReview?.current_workflow_stage_id == 2 && adviserReview?.status == AdviserReviewStatus.Approved)}
                >
                  {isApprovePending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2 text-white" />}
                  Approve Advisor
                    </Button>
                  </>
                )}

                {adviserReview?.status === AdviserReviewStatus.Approved && (
                  <Button 
                    onClick={() => setIsUpdateAdvisorProductsDialogOpen(true)}
                    variant="outline"
                    disabled={isUpdatePending}
                  >
                    {isUpdatePending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2 text-green-600" />}
                    Update Advisor Products
                  </Button>
                )}
              </div>
              
              <ReviewAdvisorDialog
                isOpen={isReviewDialogOpen}
                onOpenChange={setIsReviewDialogOpen}
                advisorName={advisor.names}
                onSubmit={(requirements: string[], actionRequired: boolean, comments: string) => 
                  handleReview(requirements, actionRequired, comments)}
                documents={{
                  hasIdDocument: Boolean(advisor.id_document),
                  hasKraPin: Boolean(advisor.kra_pin),
                  hasIraNumber: Boolean(advisor.ira_number),
                  hasPinCopy: Boolean(advisor.pin_copy),
                  hasIdCopy: Boolean(advisor.id_copy),
                }}
              />
              <ApproveAdvisorDialog
                isOpen={isApproveDialogOpen}
                onOpenChange={setIsApproveDialogOpen}
                advisorName={advisor.names}
                onApprove={(selectedProducts: number[]) => handleApprove(selectedProducts)}
              />

              <ApproveAdvisorDialog
                isOpen={isUpdateAdvisorProductsDialogOpen}
                onOpenChange={setIsUpdateAdvisorProductsDialogOpen}
                advisorName={advisor.names}
                onApprove={(selectedProducts: number[]) => handleUpdate(selectedProducts)}
                dialogText="Update Advisor Products"
              />
            </>
          )}
        </div>

        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="approval_status">Advisor Approved Products</TabsTrigger>
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
          <TabsContent value="approval_status" className="mt-4">
            <AdviserProductApprovalStatus />
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