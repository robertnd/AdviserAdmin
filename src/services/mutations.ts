import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/utils";
import { createAdmin, updateAdvisorStatus, getEventById, inviteAdmin, setPassword, createProductCategory, createProduct, updateAdvisorReview, assignProductCategoryApprovalPermission, approveAdvisor } from "./api";


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
      mutationFn: (data: any) => updateAdvisorStatus(data),
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

  export const useCreateProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["createProductCategory"],
      mutationFn: (categoryData: any) => createProductCategory(categoryData),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-product-categories"] });
      }
    });
  };

  export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["createProduct"],
      mutationFn: (productData: any) => createProduct(productData),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-products"] });
      }
    });
  };

  export const useUpdateAdvisorReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["updateAdvisorReview"],
      mutationFn: (data: any) => updateAdvisorReview(data),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-advisors"] });
      }
    });
  };

  export const useAssignProductCategoryApprovalPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["assignProductCategoryApprovalPermission"],
      mutationFn: (data: any) => assignProductCategoryApprovalPermission(data),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-product-categories"] });
      }
    });

  };

  export const useApproveAdvisor = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["approveAdvisor"],
      mutationFn: (data: any) => approveAdvisor(data),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["all-advisors"] });
      }
    });
  };


