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
import { Pencil, Trash2, Ban, ShieldCheck } from "lucide-react";
import { AlertModal } from "@/components/shared/AlertModal";
import { type UsersColumn } from "@/lib/validators";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UsersForm from "./UsersForm";
import { deleteUser } from "@/actions/users";

interface CellActionProps {
  data: UsersColumn;
}

export default function CellActions({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteOrganization = async (id: string) => {
    toast.promise(apiDeleteOrganization(id), {
      loading: "Chargement...",
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

  const updateUser = async (id: string, values: { isActive: boolean }) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
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

  const deactivateAccount = async (id: string) => {
    try {
      toast.promise(updateUser(id, { isActive: false }), {
        loading: "Chargement...",
        success: (data) => {
          setDeactivateModalOpen(false);
          router.refresh();
          return `Compte désactivé avec succès !`;
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

  const activateAccount = async (id: string) => {
    try {
      toast.promise(updateUser(id, { isActive: true }), {
        loading: "Chargement...",
        success: (data) => {
          router.refresh();
          return `Compte activé avec succès !`;
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
    <div className="flex justify-center space-x-2">
      {data.isActive ? (
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
              <p>Désactiver le compte utilisateur</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary"
                onClick={() => activateAccount(data.id.toString())}
              >
                <ShieldCheck className="h-5 w-5 text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Activer le compte utilisateur</p>
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
              <p>Modifier l'utilisateur</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SheetContent onCloseAutoFocus={(event) => event.preventDefault()}>
          <SheetHeader>
            <SheetTitle>Modifier l'utilisateur</SheetTitle>
            <SheetDescription>
              <UsersForm initialData={data} type="update" />
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
            <p>Supprimer l'utilisateur</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertModal
        title="Êtes-vous sur ?"
        description="cette action est irréversible."
        name={data.firstName}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => {
          startTransition(async () => {
            toast.promise(deleteUser(data.id), {
              loading: "Loading",
              success: (data) => {
                setAlertModalOpen(false);
                router.refresh();
                return `L'utilisateur a été supprimé avec succès!`;
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
        description="Vous allez désactiver le compte de cet utilisateur. Cette action est irréversible."
        name={data.firstName}
        isOpen={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        onConfirm={() => deactivateAccount(data.id.toString())}
        closeText="Annuler"
        confirmText="Désactiver"
      />
    </div>
  );
}
