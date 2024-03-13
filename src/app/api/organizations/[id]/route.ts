import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const organization = await prisma.organization.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!organization) {
    return NextResponse.json(
      { message: "Organization not found" },
      { status: 404 }
    );
  }

  const updatedOrganization = await prisma.organization.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      deleted: true,
    },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
}
