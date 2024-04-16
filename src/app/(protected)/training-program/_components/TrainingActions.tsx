"use client";
import { useState, useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { TrainingProgram, type TrainingDay } from "@prisma/client";
import { deleteVideo } from "@/actions/videos";
import { useRouter } from "next/navigation";
import { updateSessionStatus } from "@/actions/trainings";
import { TrainingDayStatus } from "@prisma/client";
import { toast } from "sonner";

interface TrainingDayProps {
  training: TrainingDay;
}

export default function TrainingActions({ training }: TrainingDayProps) {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const updateTraining = async (status: TrainingDayStatus) => {
    startTransition(async () => {
      await updateSessionStatus(training.id, status);
      toast.success("Programme mise à jour avec succès.");
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsVerticalIcon className="cursor-pointer mr-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => updateTraining("COMPLETED")}
            >
              Marquer comme complétée
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => updateTraining("SKIPPED")}
            >
              Marquer comme manquée
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
