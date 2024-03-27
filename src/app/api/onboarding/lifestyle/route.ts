// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { externalId } = body;

  const existingLifestyleData = await prisma.user.findUnique({
    where: { externalId },
    select: { lifestyle: true },
  });

  const updatedLifestyle = {
    ...existingLifestyleData.lifestyle,
    ...body.lifestyle,
  };

  const lifestyleData = await prisma.user.update({
    where: { externalId },
    data: { lifestyle: updatedLifestyle },
  });

  return NextResponse.json(lifestyleData, { status: 201 });
}
