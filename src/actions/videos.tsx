"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type Video } from "@prisma/client";

export async function deleteVideo(id: number) {
  try {
    const video = await prisma.video.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    revalidatePath("/exercices-library");

    return video;
  } catch (error) {
    // ...
  }
}

export async function updateVideo(values: Video) {
  try {
    const video = await prisma.video.update({
      where: { id: values.id },
      data: { ...values },
    });
    return video;
  } catch (error) {
    console.log("error updating video", error);
  }
}
