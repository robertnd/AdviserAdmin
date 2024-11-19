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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { successToast } from "@/lib/utils";
import { useInviteAdmin } from "@/services/mutations";
import { useAllPermissions } from "@/services/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export type AddShopMemberDialogProps = {
  refetch?: () => void;
}

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  permissions: yup.string().required("Permission is required"),
});
type IFormInput = yup.InferType<typeof schema>;

export default function AddAdminDialog() {
  // const [isLoading, setIsLoading] = useState(false);
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  // const {mutateAsync: addAdminFn, isPending: isLoading} = useCreateAdmin()
  const {mutateAsync: inviteAdminFn, isPending: isLoading} = useInviteAdmin()
  // const {data: roles} = useAllRoles()
  const {data: permissions} = useAllPermissions()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  // const selectedPermissions = watch("permissions")
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submitData: any = {
        email: data.email,
        user_id: data.email,
        mobile_no: "",
        password: Math.random().toString(36).slice(2, 10),
        permissions: [parseInt(data.permissions)],
        role: 3,
    };
    inviteAdminFn(submitData).then(() => {
      successToast(`${data.email} invited successfully`);
      reset();
      setOpenMemberDialog(false);
    })
  };


  return (
    <Dialog open={openMemberDialog} onOpenChange={setOpenMemberDialog}>
      <DialogTrigger asChild>
        <Button>Invite Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Admin</DialogTitle>
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
          <Label htmlFor="permissions">
            Permissions
          </Label>
          <Controller
            name="permissions" 
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} {...register("permissions", {required: true})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Permissions</SelectLabel>
                    {permissions?.map((permission: any) => (
                      <SelectItem key={permission.id} value={permission.id.toString()}>
                        {permission.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.permissions && (
            <span className="text-criticalRed">{errors.permissions?.message}</span>
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
            Invite Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
