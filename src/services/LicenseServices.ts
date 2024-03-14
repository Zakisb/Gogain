import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";
import { buildURL } from "@/lib/buildUrl";
import prisma from "@/prisma/client";

const endpoint = "/licenses";

export const apiCreateLicense = async <U extends Record<string, unknown>>(
  data: U
): Promise<ApiResponse<{ count: number }>> => {
  console.log(data, "data");
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

export const getLicenses = async () => {
  const licenses = await prisma.licenseType.findMany({
    where: {
      deleted: false,
    },
  });
  return licenses;
};

export const getPurchasedLicenses = async () => {
  const purchasedLicenses = await prisma.license.findMany({
    where: {
      deleted: false,
    },
    include: {
      organization: true, // Include the organization details
      licenseType: true, // Include the license type details
    },
  });
  return purchasedLicenses;
};
