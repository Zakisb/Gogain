import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parseISO } from "date-fns";

export async function POST(request: Request) {
  const { organization, period, schedule, debutDate } = await request.json();

  try {
    const sessions = [];

    const debutDateObj = new Date(debutDate);
    const dayOfWeek = debutDateObj.getDay();

    const daysToSubtract = (dayOfWeek + 1) % 7; // Calculate days to subtract to get to Saturday
    debutDateObj.setDate(debutDateObj.getDate() - daysToSubtract);

    for (let week = 0; week < period; week++) {
      for (let session = 0; session < schedule.length; session++) {
        const {
          dayOfWeek,
          startTime: sessionStartTime,
          sessionType,
          sessionDuration,
          coachId,
        } = schedule[session];

        const sessionDate = new Date(debutDateObj);
        sessionDate.setDate(sessionDate.getDate() + week * 7);

        // Adjust the session date based on the day of the week
        const dayOfWeekIndex = parseInt(dayOfWeek);
        sessionDate.setDate(sessionDate.getDate() + dayOfWeekIndex);

        // Extract hours and minutes from the sessionStartTime
        const startTime = new Date(sessionStartTime);
        const hours = startTime.getUTCHours();
        const minutes = startTime.getUTCMinutes();

        // Set the start time of the session
        sessionDate.setUTCHours(hours);
        sessionDate.setUTCMinutes(minutes);
        sessionDate.setUTCSeconds(0);
        sessionDate.setUTCMilliseconds(0);

        sessions.push({
          organizationId: parseInt(organization),
          day: dayOfWeek,
          time: sessionDate,
          coachAccountId: parseInt(coachId),
          duration: parseInt(sessionDuration, 10),
          sessionType,
        });
      }
    }
    const saveSessions = await prisma.coachingSession.createMany({
      data: sessions,
    });

    return NextResponse.json(saveSessions, { status: 201 });
  } catch (error) {
    console.error("Failed to create coaching session", error);
    return NextResponse.json(
      { error: "Failed to create coaching session" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const startDate = request.nextUrl.searchParams.get("startDate");
  const endDate = request.nextUrl.searchParams.get("endDate");

  try {
    const sessions = await prisma.coachingSession.findMany({
      where: {
        time: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
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
            name: true, // Adjust this to select the fields you need from the organization table
          },
        },
      },
    });
    return NextResponse.json(sessions, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create coaching session" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, start, end } = await request.json();

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationInMilliseconds = endDate.getTime() - startDate.getTime();

    // Convert the duration to minutes
    const durationInMinutes = durationInMilliseconds / (1000 * 60);
    const session = await prisma.coachingSession.update({
      where: { id: parseInt(id) },
      data: { time: startDate, duration: durationInMinutes },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error("Failed to create coaching session", error);
    return NextResponse.json(
      { error: "Failed to create coaching session" },
      { status: 500 }
    );
  }
}
