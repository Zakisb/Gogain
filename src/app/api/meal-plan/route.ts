// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";
import calculateAge from "@/lib/calculateAge";

// generate PUT request
export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await prisma.user.findUnique({
    where: { externalId: body.externalId },
  });

  //   const nutritionData = {
  //     gender: user?.gender,
  //     age: calculateAge(user?.birthDate),
  //     weight: user?.weight, // in kilograms
  //     height: user?.height, // in centimeters
  //     dietary_restrictions: user?.nutrition?.dietary_restrictions,
  //     number_of_daily_meals: user?.nutrition?.number_of_daily_meals,
  //     flavor_preference: user?.nutrition?.flavor_preference,
  //     daily_water_intake: user?.nutrition?.waterIntake, // in liters
  //     preferred_beverages: user?.nutrition?.preferred_beverages,
  //     isIntolerant: user?.nutrition?.isIntolerant,
  //     supplements: user?.nutrition?.isTakingSupplements,
  //     // activity_level: "high",
  //     weight_goal: user?.goal?.type,
  //     carbsPreferences: user?.nutrition?.carbsPreferences,
  //     proteinPreferences: user?.nutrition?.proteinPreferences,
  //     fatPreferences: user?.nutrition?.fatPreferences,
  //     likeCooking: user?.nutrition?.do_you_like_cooking,
  //   };

  console.log(user);
  return NextResponse.json("nutritionData", { status: 201 });
}
