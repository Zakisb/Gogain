"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type Exercice } from "@prisma/client";
import { redirect } from "next/navigation";

export async function deletePurchasedLicense(id: number) {
  try {
    const license = await prisma.license.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    revalidatePath("/licences");

    return lice;
  } catch (error) {
    // ...
  }
}
