// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const {
    clerkUserId,
    firstName,
    lastName,
    weight,
    height,
    birthDate,
    gender,
  } = body;

  const clerkUpdate = await clerkClient.users.updateUser(clerkUserId, {
    firstName,
    lastName,
  });

  // const user = await prisma.user.update({
  //   where: { clerkUserId },
  //   data: { weight, height, birthDate, gender },
  // });

  return NextResponse.json("user", { status: 201 });
}
