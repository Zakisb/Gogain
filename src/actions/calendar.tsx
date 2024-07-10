"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type CoachingSession } from "@prisma/client";
import { redirect } from "next/navigation";

export async function updateTrainingSession(
  id: string,
  values: CoachingSession
) {
  try {
    console.log(values);
    const session = await prisma.coachingSession.update({
      where: { id: parseInt(id) },
      data: { ...values },
    });
    return session;
  } catch (error) {
    console.log(
      "une erreur survient lors de la mise à jour de la session",
      error
    );
  }
}
