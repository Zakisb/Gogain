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
      const errorResponse = await uploadToSproutVideo.json();
      console.error("Error response from Sprout Video API:", errorResponse);
      throw new Error(`HTTP error! status: ${uploadToSproutVideo.status}`);
    }

    const response = await uploadToSproutVideo.json();
    // console.log(response);
    const video = await prisma.video.create({
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
      },
    });
    console.log(response);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
