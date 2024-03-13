import Modal from "@/components/shared/Modal";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LicensesForm from "../../_components/LicensesForm";
import { useRouter } from "next/navigation";
import CloseModal from "@/components/shared/CloseModal";
import { Slot } from "@radix-ui/react-slot";

interface LicenseNewModalProps {
  params: {
    id: string;
  };
}

const LicenseNewModal = async ({ params }: LicenseNewModalProps) => {
  return (
    <>
      <Dialog open>
        <DialogContent onCloseBack className="sm:max-w-[670px]">
          <DialogHeader>
            <DialogTitle className="mb-4">New License</DialogTitle>
            <DialogDescription>
              <LicensesForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LicenseNewModal;
