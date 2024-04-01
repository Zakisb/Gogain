import prisma from "@/prisma/client";

export const getVideos = async () => {
  const videos = await prisma.video.findMany({
    where: {
      deleted: false,
    },
  });
  return videos;
};

export const getVideo = async (id: string) => {
  const video = await prisma.video.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return video;
};
