import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the license details
    const body = await request.json();

    // Check if a license with the same name already exists
    const existingLicense = await prisma.licenseType.findFirst({
      where: {
        name: {
          equals: body.name.toLowerCase().trim(),
          mode: "insensitive",
        },
      },
    });

    // If a license with the same name exists, return a 409 status with an error message
    if (existingLicense) {
      return NextResponse.json(
        {
          message:
            "Ce nom de licence existe déjà. Veuillez en saisir un autre.",
        },
        { status: 409 }
      );
    }

    // Create a new license with the provided details
    const license = await prisma.licenseType.create({
      data: {
        name: body.name.toLowerCase().trim(),
        numberOfUsers: body.numberOfUsers,
        price: body.price,
        type: body.type,
      },
    });

    // Return the newly created license with a 201 status
    return NextResponse.json(license, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const licenses = await prisma.licenseType.findMany({
      where: {
        deleted: false,
      },
    });

    return NextResponse.json(licenses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const licenses = await prisma.licenseType.findMany();
    return NextResponse.json(licenses, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
