"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type Exercice } from "@prisma/client";
import { redirect } from "next/navigation";

export async function deleteUser(id: number) {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    revalidatePath("/users");

    return user;
  } catch (error) {
    // ...
  }
}
