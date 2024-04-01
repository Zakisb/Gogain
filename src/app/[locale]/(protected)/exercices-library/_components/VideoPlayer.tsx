import React from "react";
import Image from "next/image";
import { type Video } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";
import VideoCardActions from "./VideoCardActions";
import Link from "next/link";

interface VideoCardProps {
  embedCode: Video["embedCode"];
}
export default function VideoPlayer({ embedCode }: VideoCardProps) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: embedCode }} />
    </div>
  );
}
