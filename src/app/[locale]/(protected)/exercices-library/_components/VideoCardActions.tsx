"use client";
import { useState, useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleEllipsisIcon } from "lucide-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { AlertModal } from "@/components/shared/AlertModal";
import { type Video } from "@prisma/client";
import { deleteVideo } from "@/actions/videos";
import { useRouter } from "next/navigation";
interface VideoCardProps {
  video: Video;
}

export default function VideoCardActions({ video }: VideoCardProps) {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* <CircleEllipsisIcon className="cursor-pointer" /> */}
          <DotsVerticalIcon className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/exercices-library/${video.id}`)}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setAlertModalOpen(true)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        title="Êtes-vous sûr de vouloir supprimer cette vidéo ?"
        description={`cette action est irréversible`}
        name={video.title}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => {
          startTransition(async () => {
            await deleteVideo(video.id);
            setAlertModalOpen(false);
          });
        }}
        confirmText="Continuer"
        closeText="Annuler"
        loading={isPending}
      />
    </>
  );
}
