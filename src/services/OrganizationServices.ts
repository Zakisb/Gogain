import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";
import { buildURL } from "@/lib/buildUrl";

const endpoint = "/organizations";

export const apiDeleteOrganization = async (
  id: string
): Promise<ApiResponse<{ count: number }>> => {
  const url = buildURL(endpoint, [id]);
  return FetchService(url, { method: "DELETE" });
};
