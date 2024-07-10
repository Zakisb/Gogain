"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type Exercice } from "@prisma/client";
import { redirect } from "next/navigation";
import { TrainingDayStatus } from "@prisma/client";

export const getOrganizations = async () => {
  const organizationsList = await prisma.organization.findMany({});
  return organizationsList;
};
