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
import { apiDeleteOrganization } from "@/services/OrganizationServices";
import { Pencil, Trash2, ShoppingCart } from "lucide-react";
import { AlertModal } from "@/components/shared/AlertModal";
import { type OrganizationsColumn } from "@/lib/validators";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OrganizationsForm from "./OrganizationsForm";
import LicensePurchaseForm from "./LicensePurchaseForm";

interface CellActionProps {
  data: OrganizationsColumn;
}

export default function CellActions({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const deleteOrganization = async (id: string) => {
    toast.promise(apiDeleteOrganization(id), {
      loading: "Loading",
      success: (data) => {
        setAlertModalOpen(false);
        router.refresh();
        return `Success! Organization has been deleted`;
      },
      error: (data) => {
        return "error";
      },
    });
    router.refresh();
  };

  return (
    <div className="flex justify-center space-x-2">
      {!data.mainOrg && (
        <>
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary"
                    >
                      <ShoppingCart className="h-4 w-4 text-foreground" />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Acheter une licence</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SheetContent onCloseAutoFocus={(event) => event.preventDefault()}>
              <SheetHeader>
                <SheetTitle>Acheter une licence</SheetTitle>
              </SheetHeader>
              <LicensePurchaseForm organizationId={data.id} />
            </SheetContent>
          </Sheet>
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary"
                    >
                      <Pencil className="h-4 w-4 text-foreground" />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Modifier l&apos;organisation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SheetContent onCloseAutoFocus={(event) => event.preventDefault()}>
              <SheetHeader>
                <SheetTitle>Modifier l&apos;organisation</SheetTitle>
                <SheetDescription>
                  <OrganizationsForm initialData={data} type="update" />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
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
                <p>Supprimer l&apos;organisation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}

      <AlertModal
        title="Vous êtes sur de vouloir supprimer cette organisation ?"
        description="Cette action est irréversible."
        name={data.name}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteOrganization(data.id.toString())}
      />
    </div>
  );
}
