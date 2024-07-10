import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const organizationId = searchParams.get("orgId");

    const organizationLicenses = await prisma.license.findMany({
      where: {
        organizationId: parseInt(organizationId),
        deleted: false,
      },
      include: {
        organization: true, // Include the organization details
        licenseType: true, // Include the license type details
      },
    });
    return NextResponse.json(organizationLicenses, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { sessionNumber, licenseTypeId, validUntil, organizationId } = body;

    const license = await prisma.license.create({
      data: {
        sessionNumber,
        licenseKeyId: parseInt(licenseTypeId),
        validUntil,
        organizationId,
        status: "ACTIVE",
      },
    });
    return NextResponse.json(license, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
