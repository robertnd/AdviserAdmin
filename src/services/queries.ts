import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchAllAdmins } from "./api";


export const useAllAdmins = (): UseQueryResult<any[], Error> => {
    return useQuery({
      queryKey: ["all-admins"],
      queryFn: () => fetchAllAdmins(),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };