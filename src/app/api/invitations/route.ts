// generate post request for apiUpdateUser for the user route in my api route handlers

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(process.env.CLERK_BACKEND_API_KEY);
  try {
    const invitation = await clerkClient.invitations.createInvitation({
      emailAddress: "zakisb97@gmail.com",
      redirectUrl: "https://localhost:3000/create-account",
      ignoreExisting: true,
      publicMetadata: {
        example: "metadata",
        example_nested: {
          nested: "metadata",
        },
      },
    });
    return NextResponse.json("", { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
