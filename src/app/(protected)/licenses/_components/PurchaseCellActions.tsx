"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiDeleteOrganization } from "@/services/OrganizationServices";
import { Pencil, Trash2, ShoppingCart, Ban, ShieldCheck } from "lucide-react";
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
import LicensePurchaseForm from "./PurchaseLicenseForm";
import { deletePurchasedLicense } from "@/actions/licenses";

interface CellActionProps {
  data: OrganizationsColumn;
}

export default function PurchaseCellActions({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  const updateLicense = async (id: string, values: { status: string }) => {
    try {
      const response = await fetch(`/api/organizations/licenses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const deactivateLicense = async (id: string) => {
    try {
      toast.promise(updateLicense(id, { status: "INACTIVE" }), {
        loading: "Chargement",
        success: (data) => {
          router.refresh();
          setDeactivateModalOpen(false);
          return `License désactivé avec succès !`;
        },
        error: (data) => {
          return "error";
        },
      });
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const activateLicense = async (id: string) => {
    try {
      toast.promise(updateLicense(id, { status: "ACTIVE" }), {
        loading: "Chargement",
        success: (data) => {
          router.refresh();
          setDeactivateModalOpen(false);
          return `License activée avec succès !`;
        },
        error: (data) => {
          return "error";
        },
      });
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="flex justify-start space-x-2">
      {data.status === "ACTIVE" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary"
                onClick={() => {
                  setDeactivateModalOpen(true);
                }}
              >
                <Ban className="h-4 w-4 text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Désactiver la licence achetée</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {data.status === "INACTIVE" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary"
                onClick={() => activateLicense(data.id.toString())}
              >
                <ShieldCheck className="h-5 w-5 text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Activer la licence</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
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
              <p>Modifier la licence achetée</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SheetContent onCloseAutoFocus={(event) => event.preventDefault()}>
          <SheetHeader>
            <SheetTitle>Modifier la licence achetée</SheetTitle>
            <SheetDescription>
              <LicensePurchaseForm initialData={data} type="update" />
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
            <p>Supprimer la licence achetée</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertModal
        title="Êtes-vous sur ?"
        description="Vous êtes sur de vouloir supprimer cette licence ? Cette action est irréversible."
        name={data.name}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => {
          startTransition(async () => {
            // await deletePurchasedLicense(data.id);
            toast.promise(deletePurchasedLicense(data.id), {
              loading: "Loading",
              success: (data) => {
                setAlertModalOpen(false);
                router.refresh();
                return `La licence a été supprimée avec succès!`;
              },
              error: (data) => {
                return "error";
              },
            });
            setAlertModalOpen(false);
          });
        }}
        closeText="Annuler"
        confirmText="Supprimer"
      />
      <AlertModal
        title="Êtes-vous sur ?"
        description="Vous êtes sur le point de désactiver la licence. Ainsi l'ensemble des utilisateurs liés à cette licence perdront leur accès."
        name={data.name}
        isOpen={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        onConfirm={() => deactivateLicense(data.id.toString())}
        closeText="Annuler"
        confirmText="Désactiver"
      />
    </div>
  );
}
