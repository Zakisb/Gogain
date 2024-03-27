// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();
  
  const user = await prisma.user.update({
    where: { id: body.id },
    data: { goal: {...body} },
  });

  return NextResponse.json(user, { status: 201 });
}
