import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const license = await prisma.licenseType.create({
      data: {
        name: body.name,
        numberOfUsers: body.numberOfUsers,
        price: body.price,
      },
    });
    return NextResponse.json(license, { status: 201 });
  } catch (error) {
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
