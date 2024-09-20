import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { ACCESS_TOKEN } from "../constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

export const errorToast = (message: string | unknown, autoClose=true) => {
  toast.error(`Error: ${message}`, {
    autoClose: autoClose ? 4000 : autoClose,
    pauseOnHover: true,
    position: "top-right",
  })
}

export const successToast = (message: string, autoClose=true) => {
  toast.success(`Success: ${message}`, {
    autoClose: autoClose ? 4000 : autoClose,
    pauseOnHover: true,
    position: "top-right",
  })
}

export const infoToast = (message: string, autoClose=true) => {
  toast.info(`Info: ${message}`, {
    autoClose: autoClose ? 4000 : autoClose,
    pauseOnHover: true,
    position: "top-right",
  })
}

export const warningToast = (message: string, autoClose=true) => {
  toast.warn(`Warning: ${message}`, {
    autoClose: autoClose ? 4000 : autoClose,
    pauseOnHover: true,
    position: "top-right",
  })
}

export const setCookie = (cookieName: string, value: string) => {
  if (cookieName === ACCESS_TOKEN) {
    Cookies.set(cookieName, value, { expires: 1 })
  }
  Cookies.set(cookieName, value)
}

export const getCookie = (cookieName: string): string | undefined => {
  const cookie = Cookies.get(cookieName)
  return cookie
}

export const removeCookie = (cookieName: string) => {
  Cookies.remove(cookieName)
}

