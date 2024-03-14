import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";
import { buildURL } from "@/lib/buildUrl";
import prisma from "@/prisma/client";

const endpoint = "/organizations";

export const apiDeleteOrganization = async (
  id: string
): Promise<ApiResponse<{ count: number }>> => {
  const url = buildURL(endpoint, [id]);
  return FetchService(url, { method: "DELETE" });
};

export const getOrganizations = async () => {
  const organizations = await prisma.organization.findMany({
    where: {
      deleted: false,
    },
    orderBy: {
      id: "asc",
    },
  });
  return organizations;
};
