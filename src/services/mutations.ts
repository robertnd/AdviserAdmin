import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/utils";
import { createAdmin, updateAdvisorStatus, getEventById, inviteAdmin, setPassword } from "./api";


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

  export const useInviteAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["inviteAdmin"],
      mutationFn: (adminData: any) =>
        inviteAdmin(adminData),
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

  export const useSetPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["setPassword"],
      mutationFn: (adminData: any) =>
        setPassword(adminData),
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

  export const useUpdateAdvisorStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["updateAdvisorStatus"],
      mutationFn: (data: { user_id: string; status: string }) => updateAdvisorStatus(data.user_id, data.status),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        successToast("Advisor status updated successfully");
        await queryClient.invalidateQueries({ queryKey: ["all-advisors"] });
      }
    });
  };

  export const useGetEventById = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["getEventById"],
      mutationFn: (id: string) => getEventById(id),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-events"] });
      }
    });
  };
  

    


