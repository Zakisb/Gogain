// generate post request for apiUpdateUser for the user route in my api route handlers

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import generatePassword from "generate-password";
import { mailOptions, transporter } from "@/config/nodemailer";
import userAccountEmail from "@/lib/userAccountEmail";

// generate PUT request
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const user = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: {
      ...body,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
