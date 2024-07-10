import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const license = await prisma.licenseType.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!license) {
    return NextResponse.json({ message: "License not found" }, { status: 404 });
  }

  const updatedLicense = await prisma.licenseType.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedLicense, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const license = await prisma.licenseType.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!license) {
    return NextResponse.json({ message: "License not found" }, { status: 404 });
  }

  const updatedLicense = await prisma.licenseType.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      deleted: true,
    },
  });

  return NextResponse.json({ updatedLicense }, { status: 200 });
}
