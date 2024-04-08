"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/prisma/client";
import { type Exercice } from "@prisma/client";
import { redirect } from "next/navigation";

export async function deleteVideo(id: number) {
  try {
    const video = await prisma.exercice.update({
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

export async function updateVideo(values: Exercice) {
  try {
    const video = await prisma.exercice.update({
      where: { id: values.id },
      data: { ...values },
    });
    return video;
  } catch (error) {
    console.log("error updating video", error);
  }
}

export async function filterVideos(formData: FormData) {
  const categoryFilters = formData.getAll("category[]");
  const levelFilters = formData.getAll("level[]");

  const params = new URLSearchParams();

  if (categoryFilters.length > 0) {
    const categories = Array.from(categoryFilters).map((category) =>
      category.toString()
    );
    params.append("categories", categories.join(","));
  }

  if (levelFilters.length > 0) {
    const levels = Array.from(levelFilters).map((level) => level.toString());
    params.append("levels", levels.join(","));
  }

  redirect(`/exercices-library?${params.toString()}`);

  console.log(params);
}
