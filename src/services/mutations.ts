import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast } from "@/lib/utils";
import { createAdmin } from "./api";


export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["createAdmin"],
      mutationFn: (adminData: any) =>
        createAdmin(adminData),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-admins"] });
      }
    });
  };