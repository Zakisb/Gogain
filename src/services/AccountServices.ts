import FetchService from "./FetchService";
import { ApiResponse } from "@/types/baseService";
import prisma from "@/prisma/client";

export const getAccounts = async () => {
  const mainAccounts = await prisma.account.findMany({
    where: {
      isMainAccount: true,
    },
    include: {
      user: true,
      adminProfile: true,
      coachProfile: true,
      hrProfile: true,
      employeeProfile: true,
    },
  });

  console.log(mainAccounts);
  return mainAccounts;
};
