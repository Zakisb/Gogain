import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
  try {
    // Get the body
    const payload = await req.json();
    const video = await prisma.exercice.findFirst({
      where: {
        videoExternalId: payload.id,
      },
    });

    if (!video) {
      return new Response("Video not found", { status: 404 });
    }

    const updateVideo = await prisma.exercice.update({
      where: {
        videoExternalId: payload.id,
      },
      data: {
        duration: payload.duration,
        state: payload.state,
      },
    });
    return NextResponse.json(updateVideo, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
