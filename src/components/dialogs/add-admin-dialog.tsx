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
import { useCreateAdmin } from "@/services/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export type AddShopMemberDialogProps = {
  refetch?: () => void;
}

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});
type IFormInput = yup.InferType<typeof schema>;

export default function AddAdminDialog() {
  // const [isLoading, setIsLoading] = useState(false);
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const {mutateAsync: addAdminFn, isPending: isLoading} = useCreateAdmin()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submitData: any = {
        email: data.email,
        password: data.password,
    };
    addAdminFn(submitData).then(() => {
      successToast(`${data.email} added successfully`);
      reset();
      setOpenMemberDialog(false);
    })
  };


  return (
    <Dialog open={openMemberDialog} onOpenChange={setOpenMemberDialog}>
      <DialogTrigger asChild>
        <Button>Add Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogDescription>
            Invite an admin to the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label className="" htmlFor="email">
            Email*
          </Label>
          <Input
            id="email"
            placeholder="Enter admin's email address"
            type="email"
            autoComplete="off"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-criticalRed">{errors.email?.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className="" htmlFor="email">
            Password*
          </Label>
          <Input
            id="password"
            placeholder="password"
            type="password"
            autoComplete="off"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-criticalRed">{errors.password?.message}</span>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="ml-auto"
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
