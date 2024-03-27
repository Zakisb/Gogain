// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { externalId } = body;
  const existingNutritionData = await prisma.user.findUnique({
    where: { externalId },
    select: { nutrition: true },
  });

  const updatedNutrition = {
    ...existingNutritionData.nutrition,
    ...body.nutrition,
  };

  const nutritionData = await prisma.user.update({
    where: { externalId },
    data: { nutrition: updatedNutrition },
  });

  return NextResponse.json(nutritionData, { status: 201 });
}
