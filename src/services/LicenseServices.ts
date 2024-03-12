import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";
import { buildURL } from "@/lib/buildUrl";

const endpoint = "/licenses";

export const apiCreateLicense = async <U extends Record<string, unknown>>(
  data: U
): Promise<ApiResponse<{ count: number }>> => {
  return FetchService(endpoint, { method: "POST", body: data });
};

export const apiGetLicenses = async <T, U extends Record<string, string>>(
  queryParams?: U
): Promise<ApiResponse<T>> => {
  const url = buildURL(endpoint, [], queryParams);
  return FetchService(url, { method: "GET" });
};

export const apiUpdateLicense = async <U extends Record<string, unknown>>(
  data: U
): Promise<ApiResponse<{ count: number }>> => {
  const url = buildURL(endpoint, [data.id as string]);

  return FetchService(url, { method: "PATCH", body: data });
};

export const apiDeleteLicense = async (
  id: string
): Promise<ApiResponse<{ count: number }>> => {
  const url = buildURL(endpoint, [id]);
  return FetchService(url, { method: "DELETE" });
};
