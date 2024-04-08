// generate post request for apiUpdateUser for the user route in my api route handlers

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import calculateTrainingDate from "@/lib/calculateTrainingDate";

export async function POST(request: NextRequest) {
  //   const body = await request.json();
  const exerciseIds = await prisma.exercice.findMany({
    select: { id: true },
  });
  const userId = 17; // Replace with the actual user ID

  function getRandomExercises(exerciseIds, minCount, maxCount) {
    const count =
      Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const shuffledIds = exerciseIds.sort(() => 0.5 - Math.random());
    return shuffledIds
      .slice(0, count)
      .map((exerciseId) => ({ id: exerciseId.id }));
  }

  function calculateDayOffset(day: number): number {
    const dayOfWeek = (day - 1) % 3;
    const weekNumber = Math.floor((day - 1) / 3);
    return weekNumber * 7 + dayOfWeek * 2;
  }

  // Helper function to determine the training day title based on the day number
  function getTrainingDayTitle(day: number): string {
    // Logic to determine the title based on the day number or other criteria
    // Example:
    if (day % 3 === 1) {
      return "Lower Back Workout";
    } else if (day % 3 === 2) {
      return "Upper Body Strength";
    } else {
      return "Full Body Conditioning";
    }
  }

  const trainingProgram = await prisma.trainingProgram.create({
    data: {
      name: "3x/Week Training Program",
      description:
        "A 3x/week training program with randomly selected exercises",
      startDate: new Date(),
      endDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000), // 10 weeks from now
      user: {
        connect: { id: userId },
      },
      days: {
        create: Array.from({ length: 30 }, (_, index) => {
          const day = index + 1;
          const dayOffset = calculateDayOffset(day);
          const title = getTrainingDayTitle(day); // Function to determine the title based on the day number
          return {
            day,
            date: calculateTrainingDate(new Date(), dayOffset),
            title,

            exercises: {
              connect: getRandomExercises(exerciseIds, 4, 5),
            },
          };
        }),
      },
    },
    include: {
      days: {
        include: {
          exercises: true,
        },
      },
    },
  });

  return NextResponse.json("user", { status: 201 });
}
