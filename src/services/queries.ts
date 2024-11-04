import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchAllAdmins, fetchAllAdvisors, getAdvisorById, fetchAllEvents, getEventById, fetchApplicantFiles, fetchFileContent, fetchAllRoles, fetchAllPermissions } from "./api";


export const useAllAdmins = (): UseQueryResult<any[], Error> => {
    return useQuery({
      queryKey: ["all-admins"],
      queryFn: () => fetchAllAdmins(),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };

  export const useAllAdvisors = (): UseQueryResult<any[], Error> => {
    return useQuery({
      queryKey: ["all-advsisors"],
      queryFn: () => fetchAllAdvisors(),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };

  export const useAdvisorById = (id: string): UseQueryResult<any, Error> => {
    return useQuery({
      queryKey: ["advisor-by-id", id],
      queryFn: () => getAdvisorById(id),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };

  export const useAllEvents = (): UseQueryResult<any[], Error> => {
    return useQuery({
      queryKey: ["all-events"],
      queryFn: () => fetchAllEvents(),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };
  
  export const useGetEventById = (id: string): UseQueryResult<any, Error> => {
    return useQuery({
      queryKey: ["event-by-id", id],
      queryFn: () => getEventById(id),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };

  export const useGetApplicantFiles = (intermediaryId: string): UseQueryResult<any, Error> => {
    return useQuery({
      queryKey: ["applicant-files", intermediaryId],
      queryFn: () => fetchApplicantFiles(intermediaryId),
      refetchOnWindowFocus: false,
      enabled: !!intermediaryId,
    });
  };

  export const useGetFileContent = (fileId: number): UseQueryResult<string, Error> => {
    return useQuery({
      queryKey: ["file-content", fileId],
      queryFn: () => fetchFileContent(fileId),
      refetchOnWindowFocus: false,
      enabled: !!fileId,
    });
  };

  export const useAllRoles = (): UseQueryResult<any[], Error> => {
    return useQuery({
      queryKey: ["all-roles"],
      queryFn: () => fetchAllRoles(),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };

  export const useAllPermissions = (): UseQueryResult<any[], Error> => {
    return useQuery({
      queryKey: ["all-permissions"],
      queryFn: () => fetchAllPermissions(),
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };