import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import crypto from "crypto";
import { mailOptions, transporter } from "@/config/nodemailer";
import welcomeEmail from "@/lib/welcomeEmail";
import { clerkClient } from "@clerk/nextjs";
import generatePassword from "generate-password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      hrEmail,
      licenseTypeId,
      organizationData,
      sessionNumber,
      numberOfUsers,
      numberOfEmployees,
    } = body;

    const result = await prisma.$transaction(async (prisma) => {
      // 1. Create the organization with the user email for the user HR
      const organization = await prisma.organization.create({
        data: {
          name: body.name,
          industry: body.industry,
          numberOfEmployees: parseInt(numberOfEmployees),
        },
      });

      let license;
      if (licenseTypeId) {
        // 4. Create the license using the organizationId and licenseTypeId
        license = await prisma.license.create({
          data: {
            organizationId: organization.id,
            licenseKeyId: parseInt(body.licenseTypeId),
            validUntil: new Date(),
            sessionNumber: parseInt(sessionNumber),
            numberOfUsers: parseInt(numberOfUsers),
          },
        });
      }

      return { organization, license };
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message === "User with the email already exists"
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      // Handle unexpected server errors
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const organizations = await prisma.organization.findMany({
      where: {
        deleted: false,
        mainOrg: false,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(organizations, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// generate PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const organization = await prisma.organization.update({
    where: { id: body.id },
    data: { ...body },
  });
  console.log({ organization });

  return NextResponse.json(organization, { status: 201 });
}
