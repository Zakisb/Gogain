import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const hashedToken = crypto
    .createHash("sha256")
    .update(body.resetToken)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetToken: body.resetToken,
      resetTokenExpiry: { gte: Date.now() },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  return NextResponse.json("x", { status: 201 });
}
