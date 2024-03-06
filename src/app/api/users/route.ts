// generate post request for apiUpdateUser for the user route in my api route handlers

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    },
  });

  return NextResponse.json(user, { status: 201 });
}

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.user.update({
    where: { id: 1 },
    data: { ...body },
  });

  return NextResponse.json(user, { status: 201 });
}
