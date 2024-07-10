import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";
import prisma from "@/prisma/client";

export const apiGetNotificationCount = async (): Promise<
  ApiResponse<{ count: number }>
> => {
  return FetchService("/notification/count", { method: "GET" });
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      deleted: false,
      accounts: {
        some: {
          isMainAccount: true,
        },
      },
    },
    include: {
      accounts: {
        where: {
          isMainAccount: true,
        },
      },
    },
  });

  return users;
};
