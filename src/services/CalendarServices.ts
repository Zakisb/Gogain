import prisma from "@/prisma/client";
import { VideoCategory, VideoLevel } from "@/constants/options.constant";
import { type Prisma } from "@prisma/client";

interface GetCalendarSessionsParams {
  startDate: string;
  endDate: string;
}

export const getCalendarSessions = async ({
  startDate,
  endDate,
}: GetCalendarSessionsParams) => {
  const sessions = await prisma.coachingSession.findMany({
    where: {
      time: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    select: {
      id: true,
      sessionType: true,
      time: true,
      duration: true,
    },
  });

  return sessions;
};
