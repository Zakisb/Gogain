import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const session = await prisma.coachingSession.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        sessionType: true,
        time: true,
        duration: true,
        organizationId: true,
        coachAccountId: true,
        coachAccount: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        organization: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Échec de la récupération de la session de coaching" },
      { status: 500 }
    );
  }
}
