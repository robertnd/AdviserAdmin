import axios, { AxiosError } from "axios"
import axiosInstance from "./axios-interceptor"
import { UserLoginObj } from "@/types"

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const loginUser = async (user: UserLoginObj) => {
    const data = JSON.stringify({
      user_id: user?.email,
      secret: user?.password,
      // grant_type: "password",
    })
    const config = {
      method: "post",
      url: `${baseUrl}/admin/root-sign-in`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const response = await axiosInstance.request(config)
      return response
    } catch (e) {
      const error = e as AxiosError
      throw new Error(`${error?.response?.data}`)
    }
  }