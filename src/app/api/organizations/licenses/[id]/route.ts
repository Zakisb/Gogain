import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const license = await prisma.license.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!license) {
    return NextResponse.json(
      { message: "License untrouvable" },
      { status: 404 }
    );
  }

  const updatedLicense = await prisma.license.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedLicense, { status: 200 });
}
