import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/lib/utils";
import { createAdmin, updateAdvisorStatus, getEventById, inviteAdmin, setPassword, createProductCategory, createProduct, updateAdvisorReview, assignProductCategoryApprovalPermission, approveAdvisor, updateProductCategory, deleteProductCategory, updateAdvisorProducts, removeProductCategoryApprovalPermission } from "./api";


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

  export const useUpdateProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["updateProductCategory"],
      mutationFn: (data: any) => updateProductCategory(data),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        successToast("Product category updated successfully");
        await queryClient.invalidateQueries({ queryKey: ["all-product-categories"] });
      }
    });
  };

  export const useDeleteProductCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["deleteProductCategory"],
      mutationFn: (id: number) => deleteProductCategory(id),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        successToast("Product category deleted successfully");
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
        await queryClient.invalidateQueries({ queryKey: ["products-by-category"] });
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
        await queryClient.invalidateQueries({ queryKey: ["adviser-reviews"] });
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
        await queryClient.invalidateQueries({ queryKey: ["product-category-admins"] });
      }
    });

  };

  export const useRemoveProductCategoryApprovalPermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["removeProductCategoryApprovalPermission"],
      mutationFn: (data: any) => removeProductCategoryApprovalPermission(data),
      onSettled: async (_, error) => {
        if (error) {
          errorToast(error.message);
        }
      },
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        successToast("Product category approval permission removed successfully");
        await queryClient.invalidateQueries({ queryKey: ["product-category-admins"] });
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
        await queryClient.invalidateQueries({ queryKey: ["adviser-reviews"] });
        await queryClient.invalidateQueries({ queryKey: ["adviser-approved-products"] });
      }
    });
  };

  export const useUpdateAdvisorProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["updateAdvisorProducts"],
      mutationFn: (data: any) => updateAdvisorProducts(data),
      onError: (error) => {
        errorToast(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["adviser-approved-products"] });
      }
    });
  };


