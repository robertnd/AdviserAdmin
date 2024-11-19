import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface ReviewAdvisorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  advisorName: string;
  onSubmit: (requirements: string[], actionRequired: boolean, comments: string) => void;
  documents: {
    hasIdDocument: boolean;
    hasKraPin: boolean;
    hasIraNumber: boolean;
    hasPinCopy: boolean;
    hasIdCopy: boolean;
  };
}

const REQUIREMENTS = [
  "ID Document",
  "KRA PIN",
  "IRA Number",
  "Copy of PIN",
  "Copy of ID",
] as const;

export function ReviewAdvisorDialog({
  isOpen,
  onOpenChange,
  advisorName,
  onSubmit,
  documents,
}: ReviewAdvisorDialogProps) {
    console.log(advisorName);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [actionRequired, setActionRequired] = useState(false);
  const [comments, setComments] = useState("");

  // Map documents to requirements on initial load
  useEffect(() => {
    const initialRequirements = [];
    if (documents.hasIdDocument) initialRequirements.push("ID Document");
    if (documents.hasKraPin) initialRequirements.push("KRA PIN");
    if (documents.hasIraNumber) initialRequirements.push("IRA Number");
    if (documents.hasPinCopy) initialRequirements.push("Copy of PIN");
    if (documents.hasIdCopy) initialRequirements.push("Copy of ID");
    setSelectedRequirements(initialRequirements);
  }, [documents]);

  const handleMeetsAllRequirements = (checked: boolean) => {
    setSelectedRequirements(checked ? [...REQUIREMENTS] : []);
  };

  const handleRequirementSelect = (requirement: string, checked: boolean) => {
    setSelectedRequirements(prev =>
      checked
        ? [...prev, requirement]
        : prev.filter(r => r !== requirement)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Review Advisor</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="meets-all"
              checked={selectedRequirements.length === REQUIREMENTS.length}
              onCheckedChange={(checked) => handleMeetsAllRequirements(checked as boolean)}
            />
            <label htmlFor="meets-all" className="font-medium">
              Meets all requirements
            </label>
          </div>

          <div className="space-y-2 pl-6">
            <div className="text-sm text-gray-500">Requirements</div>
            {REQUIREMENTS.map((requirement) => (
              <div key={requirement} className="flex items-center space-x-2">
                <Checkbox
                  id={requirement}
                  checked={selectedRequirements.includes(requirement)}
                  onCheckedChange={(checked) => handleRequirementSelect(requirement, checked as boolean)}
                />
                <label htmlFor={requirement}>{requirement}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="action-required"
                checked={actionRequired}
                onCheckedChange={(checked) => setActionRequired(checked as boolean)}
              />
              <label htmlFor="action-required" className="font-medium">
                Action Required
              </label>
            </div>

            {actionRequired && (
              <div className="space-y-2">
                <label htmlFor="comments" className="text-sm text-gray-500">
                  Comments
                </label>
                <textarea
                  id="comments"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Enter comments for the advisor..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            )}
          </div>


        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          {actionRequired ? (
            <Button
              onClick={() => onSubmit(selectedRequirements, actionRequired, comments)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Action Required
            </Button>
          ) : (
            <Button
              onClick={() => onSubmit(selectedRequirements, actionRequired, comments)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
