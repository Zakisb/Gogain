import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const purchasedLicenses = await prisma.license.findMany({
      where: {
        deleted: false,
      },
      include: {
        organization: true, // Include the organization details
        licenseType: true, // Include the license type details
      },
    });
    return NextResponse.json(purchasedLicenses, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
