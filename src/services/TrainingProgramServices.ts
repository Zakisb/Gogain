import prisma from "@/prisma/client";
import { VideoCategory, VideoLevel } from "@/constants/options.constant";
import { type Prisma } from "@prisma/client";
import { TrainingDayStatus } from "@prisma/client";

interface GetTrainingProgramParams {
  userId: string;
}

export const getTrainingProgram = async ({
  userId,
}: GetTrainingProgramParams) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  const trainingProgram = await prisma.trainingProgram.findFirst({
    where: {
      userProfileId: user?.id,
    },
    include: {
      userProfile: true,
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
  return trainingProgram;
};
