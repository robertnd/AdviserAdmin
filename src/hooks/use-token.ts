import { ACCESS_TOKEN } from "@/constants";
import { getCookie, setCookie } from "@/lib/utils";
import { useState } from "react";

const useToken = () => {
  const getToken = (): string | undefined => {
    const tokenString = getCookie(ACCESS_TOKEN);
    const userRoken: string | undefined = tokenString;
    return userRoken || undefined;
  };

  const [token, setToken] = useState<string | undefined>(getToken());

  const saveToken = (userToken: string) => {
    setCookie(ACCESS_TOKEN, userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
