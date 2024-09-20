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

  export const fetchAllAdmins = async (): Promise<any[]> => {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/get-admins/1/5`);
    console.log(data)
    return data.data.data.admins ?? [];
  };