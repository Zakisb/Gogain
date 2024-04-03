"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiDeleteLicense } from "@/services/LicenseServices";
import { Pencil, Trash2 } from "lucide-react";
import { AlertModal } from "@/components/shared/AlertModal";
import { type LicenseColumn } from "@/lib/validators";
import { toast } from "sonner";

interface CellActionProps {
  data: LicenseColumn;
}

export default function CellActions({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const deleteEmployee = async (id: string) => {
    toast.promise(apiDeleteLicense(id), {
      loading: "Loading",
      success: (data) => {
        setAlertModalOpen(false);
        router.refresh();
        return `Success! License has been updated.`;
      },
      error: (data) => {
        return "error";
      },
    });
    router.refresh();
  };

  return (
    <div className="flex justify-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                router.push(`/licenses/${data.id}`);
              }}
            >
              <Pencil className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit license</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                setAlertModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete license</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={data.name}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteEmployee(data.id.toString())}
      />
    </div>
  );
}