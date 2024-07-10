import { SectionHeading } from "../../_components/SectionHeading";
import LicensesForm from "../_components/LicensesForm";
import { Separator } from "@/components/ui/separator";
import { LicenseType } from "@prisma/client";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Créer une license"
          description="Créer une nouvelle license"
        />
      </div>
      <Separator />
      <LicensesForm />
    </>
  );
}
