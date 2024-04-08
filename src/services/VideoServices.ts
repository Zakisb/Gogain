import prisma from "@/prisma/client";
import { VideoCategory, VideoLevel } from "@/constants/options.constant";
import { type Prisma } from "@prisma/client";

interface GetVideosParams {
  page: number;
  limit: number;
  categories: string[];
  levels: string[];
}

export const getVideos = async ({
  page,
  limit,
  categories,
  levels,
}: GetVideosParams) => {
  const offset = (page - 1) * limit;

  const where: Prisma.VideoWhereInput = {
    deleted: false,
  };

  if (categories.length > 0) {
    where.category = {
      in: categories,
    };
  }

  if (levels.length > 0) {
    where.level = {
      in: levels,
    };
  }

  const videos = await prisma.exercice.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return videos;
};

export async function getTotalVideosCount({
  categories,
  levels,
}: {
  categories: string[];
  levels: string[];
}): Promise<number> {
  const where: Prisma.VideoWhereInput = {
    deleted: false,
  };

  if (categories.length > 0) {
    where.category = {
      in: categories,
    };
  }

  if (levels.length > 0) {
    where.level = {
      in: levels,
    };
  }

  const totalCount = await prisma.exercice.count({
    where,
  });
  return totalCount;
}

export const getVideo = async (id: string) => {
  const video = await prisma.exercice.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return video;
};
