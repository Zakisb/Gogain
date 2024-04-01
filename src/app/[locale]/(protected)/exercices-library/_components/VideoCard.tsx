import React from "react";
import Image from "next/image";
import { type Video } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";
import VideoCardActions from "./VideoCardActions";
import Link from "next/link";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div>
      <div className="relative h-56 group cursor-pointer">
        <Image
          src={video.posterUrl}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <Link href={`/exercices-library/video/${video.id}`}>
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="py-4 px-2">
        <div className="flex flex-row justify-between">
          <Link href={`/exercices-library/${video.id}`}>
            {" "}
            <h3 className="text-lg font-semibold mb-2 hover:text-primary">
              {video.title}
            </h3>
          </Link>
          <VideoCardActions video={video} />
        </div>

        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center mb-2">
          <span className="text-gray-500 text-sm mr-2">Catégorie:</span>
          <span className="text-gray-800 text-sm">
            {CATEGORY_OPTIONS[video.category]}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-500 text-sm mr-2">Niveau:</span>
          <span className="text-gray-800 text-sm">
            {LEVEL_OPTIONS[video.level]}
          </span>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <span className="text-gray-500 text-sm mr-2">Tags:</span>
          <div className="flex flex-wrap">
            {video.tags.map((tag) => (
              <Badge key={tag} variant="default" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
