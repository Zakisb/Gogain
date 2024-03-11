"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
const CloseModal = () => {
  const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.back()}>
      Close
    </Button>
  );
};

export default CloseModal;
