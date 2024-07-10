// generate post request for apiUpdateUser for the user route in my api route handlers

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import generatePassword from "generate-password";
import { mailOptions, transporter } from "@/config/nodemailer";
import userAccountEmail from "@/lib/userAccountEmail";

export async function POST(request: NextRequest) {
  const { email, firstName, lastName, role } = await request.json();
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "Un utilisateur avec cette adresse mail existe déjà. Veuillez choisir une autre.",
        },
        { status: 409 }
      );
    }

    const password = generatePassword.generate({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });

    const clerkAccount = await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress: [email],
      password,
      publicMetadata: {
        actifRole: role,
        roles: [role],
      },
    });

    const user = await prisma.user.create({
      data: {
        clerkUserId: clerkAccount.id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      },
    });

    const account = await prisma.account.create({
      data: {
        userId: user.id,
        role: role,
      },
    });

    const { subject, text, html } = userAccountEmail(email, password);

    const msg = {
      to: email,
      from: mailOptions.from,
      subject,
      html,
    };

    const sendEmail = await transporter.sendMail(msg);

    return NextResponse.json("user", { status: 201 });
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
  const user = await prisma.user.update({
    where: { id: 1 },
    data: { ...body },
  });
  return NextResponse.json(user, { status: 201 });
}

export async function GET(request: NextRequest) {
  const body = await request.json();
  const user = await prisma.user.update({
    where: { id: 1 },
    data: { ...body },
  });
  return NextResponse.json(user, { status: 201 });
}
