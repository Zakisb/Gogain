"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertModalProps {
  title: string;
  description: string;
  name?: string;
  closeText?: string;
  confirmText?: string;
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertModal = ({
  title,
  description,
  name,
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  closeText = "Cancel",
  confirmText = "Continue",
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button variant="outline" onClick={onClose}>
              {closeText}
            </Button>{" "}
            <Button variant="destructive" onClick={onConfirm} loading={loading}>
              {confirmText}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
