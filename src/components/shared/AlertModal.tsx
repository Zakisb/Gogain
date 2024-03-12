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
  loading,
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
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-x-2">
          <span>Are you sure want to delete</span>
          <span className="text-lg font-bold text-red-500">{name}</span>?
        </div>
        <div className="flex w-full items-center justify-end space-x-2 pt-6">
          <Button variant="outline" onClick={onClose}>
            {closeText}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
