// generate post request for apiUpdateUser for the user route in my api route handlers

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const role = url.searchParams.get("role");
  const userId = url.searchParams.get("userId");
  // Build the query object dynamically
  const query = {
    where: {},
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  };

  if (role) {
    query.where.role = role.toUpperCase();
  }

  if (userId) {
    query.where.userId = parseInt(userId, 10);
  }
  const accounts = await prisma.account.findMany(query);

  return NextResponse.json(accounts, { status: 200 });
}
