import axiosInstance from "@/api-calls/axios-interceptor";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const createAdmin = async ({email, password}: any) => {
    const adminData = {
      user_id: email,
      email: email,
      password: password
    }
    const { data } = await axiosInstance.post(
      `${baseUrl}/admin/create-admin`,
      adminData
    );
    return data ?? {};
  };

  export const inviteAdmin = async ({email, user_id, mobile_no, password, role, permissions}: any) => {
    const adminData = {
      user_id: user_id,
      email: email,
      mobile_no: mobile_no,
      password: password,
      permissions,
      role
    }
    const { data } = await axiosInstance.post(
      `${baseUrl}/admin/invite-admin`,
      adminData
    );
    return data ?? {};
  };

  export const setPassword = async ({code, user_id, password}: any) => {
    const passwordData = {
      user_id: user_id,
      code: code,
      password: password,
      email: user_id
    }
    const { data } = await axiosInstance.post(
      `${baseUrl}/admin/set-admin-password`,
      passwordData
    );
    return data ?? {};
  };

  export const fetchAllAdmins = async (): Promise<any[]> => {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/get-admins`);
    return data.data.data.admins ?? [];
  };

  export const fetchAllAdvisors = async (): Promise<any[]> => {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/get-all-advisers`);
    return data.data.data.advisers.reverse() ?? [];
  };

  export const getAdvisorById = async (id: string): Promise<any> => {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/get-adviser/${id}`);
    return data.data ?? {};
  };

  export const updateAdvisorStatus = async (data: any): Promise<any> => {
    const { data: response } = await axiosInstance.post(`${baseUrl}/admin/update-adviser-status`, data);
    return response ?? {};

  };
  export const fetchAllEvents = async (): Promise<any[]> => {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/get-events`);
    return data.data.data.events.reverse() ?? [];
  };
  export const getEventById = async (id: string): Promise<any> => {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/get-event/${id}`);
     return data.data.data ?? {};
  };

  export const fetchApplicantFiles = async (intermediaryId: string) => {
    const response = await axiosInstance.get(`${baseUrl}/admin/get-applicant-files/${intermediaryId}`);
    return response.data.data.advisers;
  };

  export const fetchFileContent = async (fileId: number) => {
    const response = await axiosInstance.get(`${baseUrl}/admin/get-file/${fileId}`);
    return response.data.data.file_data;
  };

  export const fetchAllRoles = async () => {
    const response = await axiosInstance.get(`${baseUrl}/roles/roles`);
    return response.data.data.roles;
  };

  export const fetchAllPermissions = async () => {
    const response = await axiosInstance.get(`${baseUrl}/permissions/permissions`);
    return response.data.data.permissions;
  };

  export const createProductCategory = async (categoryData: any) => {
    const response = await axiosInstance.post(`${baseUrl}/product-categories`, categoryData);
    return response.data.data;
  };

  export const fetchAllProductCategories = async () => {
    const response = await axiosInstance.get(`${baseUrl}/product-categories/`);
    return response.data.data.categories;
  };

  export const fetchProductCategory = async (categoryId: string) => {
    const response = await axiosInstance.get(`${baseUrl}/product-categories/${categoryId}`);
    return response.data.data;
  };

  export const updateProductCategory = async (data: any) => {
    const response = await axiosInstance.put(`${baseUrl}/product-categories/${data.id}`, data);
    return response.data.data;
  };

  export const deleteProductCategory = async (id: number) => {
    const response = await axiosInstance.delete(`${baseUrl}/product-categories/${id}`);
    return response.data.data;
  };

  export const createProduct = async (productData: any) => {
    productData.product_category_id = parseInt(productData.product_category_id);
    const response = await axiosInstance.post(`${baseUrl}/products`, productData);
    return response.data.data;
  };

  export const fetchProductsByCategory = async (categoryId: string) => {
    const response = await axiosInstance.get(`${baseUrl}/products/category/${categoryId}`);
    return response.data.data;
  };

  export const updateAdvisorReview = async (data: any) => {
    const response = await axiosInstance.put(`${baseUrl}/adviser-reviews/${data.review_id}`, data);
    return response.data.data;
  };

  export const fetchAdvisorReview = async (userId: string) => {
    const response = await axiosInstance.get(`${baseUrl}/adviser-reviews/adviser/${userId}`);
    return response.data.data;
  };

  export const assignProductCategoryApprovalPermission = async (data: any) => {
    const response = await axiosInstance.post(`${baseUrl}/admin/product-categories/assign`, data);
    return response.data.data;
  };

  export const removeProductCategoryApprovalPermission = async (data: any) => {
    const response = await axiosInstance.post(`${baseUrl}/admin/product-categories/unassign`, data);
    return response.data.data;
  };

  export const fetchProductCategoryAdmins = async (categoryId: string) => {
    const response = await axiosInstance.get(`${baseUrl}/admin/product-categories/admins/${categoryId}`);
    return response.data.data;
  };

  export const fetchAdminProductCategories = async () => {
    const response = await axiosInstance.get(`${baseUrl}/admin/product-categories`);
    return response.data.data.categories;
  };

  export const approveAdvisor = async (data: any) => {
    const response = await axiosInstance.put(`${baseUrl}/adviser-reviews/approve/foo`, data);
    return response.data.data;
  };

  export const fetchAdviserApprovedProducts = async (userId: string) => {
    console.log(userId);
    const response = await axiosInstance.get(`${baseUrl}/products/adviser/${userId}`);
    return response.data.data;
  };

  export const updateAdvisorProducts = async (data: any) => {
    const response = await axiosInstance.post(`${baseUrl}/adviser-products`, data);
    return response.data.data;
  };
