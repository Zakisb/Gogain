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
  queryParams: U
): Promise<ApiResponse<T>> => {
  const url = buildURL(endpoint, [], queryParams);
  return FetchService(url, { method: "GET" });
};
