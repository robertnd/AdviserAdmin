import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { successToast } from "@/lib/utils";
import { useCreateProductCategory } from "@/services/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
});

type IFormInput = yup.InferType<typeof schema>;

export default function AddProductCategoryDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync: createCategoryFn, isPending: isLoading } = useCreateProductCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submitData = {
        name: data.name,
        description: data.description,
        status: 'Active',
    };

    createCategoryFn(submitData).then(() => {
      successToast(`Category ${data.name} created successfully`);
      reset();
      setOpenDialog(false);
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product Category</DialogTitle>
          <DialogDescription>
            Create a new product category to organize your products.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="" htmlFor="name">
              Category Name*
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              type="text"
              autoComplete="off"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name?.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description*
            </Label>
            <Input
              id="description"
              placeholder="Enter category description"
              type="text"
              autoComplete="off"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description?.message}</span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
