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
import { useCreateProduct } from "@/services/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  categoryId: yup.string().required("Category is required"),
});

type IFormInput = yup.InferType<typeof schema>;

interface AddProductDialogProps {
  categoryId?: string; // Optional prop to pre-select category
}

export default function AddProductDialog({ categoryId }: AddProductDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync: createProductFn, isPending: isLoading } = useCreateProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: categoryId || '',
    }
  });
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submitData = {
      name: data.name,
      description: data.description,
      product_category_id: categoryId,
      status: 'Active',
    };

    createProductFn(submitData).then(() => {
      successToast(`Product ${data.name} created successfully`);
      reset();
      setOpenDialog(false);
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Create a new product in your catalog.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name*
            </Label>
            <Input
              id="name"
              placeholder="Enter product name"
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
              placeholder="Enter product description"
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
            Create Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}