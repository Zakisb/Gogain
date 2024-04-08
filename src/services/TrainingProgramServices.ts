import prisma from "@/prisma/client";
import { VideoCategory, VideoLevel } from "@/constants/options.constant";
import { type Prisma } from "@prisma/client";

interface GetTrainingProgramParams {
  userId: string;
}

export const getTrainingProgram = async ({
  userId,
}: GetTrainingProgramParams) => {
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });
  const trainingProgram = await prisma.trainingProgram.findFirst({
    where: {
      userId: user?.id,
    },
    include: {
      user: true,
      days: {
        orderBy: {
          day: "asc",
        },
        include: {
          exercises: true,
        },
      },
    },
  });
  console.log(trainingProgram);
  return trainingProgram;
};
