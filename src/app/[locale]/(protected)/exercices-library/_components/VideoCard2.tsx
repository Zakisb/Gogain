/**
 * v0 by Vercel.
 * @see https://v0.dev/t/79lQkUwpx6v
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { type Video } from "@prisma/client";
import Image from "next/image";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";
import PlaceholderImg from "@/assets/images/misc/placeholder.png";
import Link from "next/link";
import VideoCardActions from "./VideoCardActions";
import formatTime from "@/lib/formatTime";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard2({ video }: VideoCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-xl overflow-hidden">
      <div className="aspect-video overflow-hidden relative group">
        {video.state === "inspecting" ? (
          <>
            <Image
              src={PlaceholderImg}
              alt={video.title}
              className="rounded-md object-cover"
            />
          </>
        ) : (
          <>
            <Image
              alt="Video thumbnail"
              className="aspect-video absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
              height={169}
              src={video.posterUrl}
              width={300}
            />
            <div className="w-10 h-10 m-4 absolute inset-0 m-auto translate-x-2/4 group-hover:scale-0 transition-transform" />
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
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex flex-row justify-between">
          <CardTitle className="text-base  font-bold">
            <Link
              className="hover:text-primary"
              href={`/exercices-library/${video.id}`}
            >
              {video.title}
            </Link>
          </CardTitle>
          <VideoCardActions video={video} />
        </div>

        <CardDescription className="mb-0 line-clamp-2">
          {video.description}
        </CardDescription>
        <div className="grid gap-1.5 text-xs mt-2.5">
          <div className="flex items-center gap-1.5">
            <DumbbellIcon className="w-4 h-4 opacity-50" />
            <span className="truncate">{CATEGORY_OPTIONS[video.category]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 opacity-50" />
            <span>{formatTime(video.duration)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TagIcon className="w-4 h-4 opacity-50" />
            <span className="space-x-1">
              {video.tags.length > 0 ? (
                video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-sm bg-orange-200 text-xs px-2 py-px"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="inline-block rounded-sm bg-orange-200 text-xs px-2 py-px">
                  Aucun
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUpIcon className="w-4 h-4 opacity-50" />
            <span>{LEVEL_OPTIONS[video.level]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1" />
      <path d="m3 3 1 1" />
      <path d="m18 22 4-4" />
      <path d="m2 6 4-4" />
      <path d="m3 10 7-7" />
      <path d="m14 21 7-7" />
    </svg>
  );
}
