"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type Exercice } from "@prisma/client";
import { redirect } from "next/navigation";
import { TrainingDayStatus } from "@prisma/client";

export const updateSessionStatus = async (
  trainingSessionId: number,
  status: TrainingDayStatus
) => {
  const updatedTrainingSession = await prisma.trainingDay.update({
    where: {
      id: trainingSessionId,
    },
    data: {
      status: status,
    },
  });

  return updatedTrainingSession;
};
