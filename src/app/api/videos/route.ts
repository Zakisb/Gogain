// generate post request for apiUpdateUser for the user route in my api route handlers
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  try {
    const uploadToSproutVideo = await fetch(
      "https://api.sproutvideo.com/v1/videos",
      {
        headers: {
          "SproutVideo-Api-Key": process.env.SPROUTVIDEO_API_KEY,
        },
        method: "POST",
        body: formData,
      }
    );

    if (!uploadToSproutVideo.ok) {
      throw new Error(`HTTP error! status: ${uploadToSproutVideo.status}`);
    }

    const response = await uploadToSproutVideo.json();
    console.log("Response from Sprout Video API:", response);
    // console.log(response);
    const exercice = await prisma.exercice.create({
      data: {
        title: response.title,
        description: response.description,
        videoExternalId: response.id,
        thumbnailUrl: response.assets.thumbnails[1],
        posterUrl: response.assets.poster_frames[1],
        createdAt: response.created_at,
        embedCode: response.embed_code,
        videoSize: response.source_video_file_size,
        category: formData.get("category") as string,
        level: formData.get("level") as string,
        tags: JSON.parse(formData.get("tags")),
        state: response.state,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(error, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const where: any = {};
  console.log(searchParams);
  // Add conditions based on query parameters
  if (searchParams.has("category") && searchParams.get("category") !== "tous") {
    where.category = searchParams.get("category");
  }
  if (searchParams.has("level")) {
    where.level = searchParams.get("level");
  }
  if (searchParams.has("tags")) {
    where.tags = {
      has: searchParams.get("tags"),
    };
  }

  // Add more conditions as needed

  const videos = await prisma.exercice.findMany({
    where,
    orderBy: {
      title: "asc", // Sort by title in ascending order
    },
  });

  // console.log(videos);

  return NextResponse.json(videos);
}
