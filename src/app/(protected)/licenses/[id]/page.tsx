import { SectionHeading } from "../../_components/SectionHeading";
import LicensesForm from "../_components/LicensesForm";
import { Separator } from "@/components/ui/separator";
import { LicenseType } from "@prisma/client";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const license = await prisma.licenseType.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!license) {
    return notFound();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Modifier la licence"
          description="Modifier une licence existante"
        />
      </div>
      <Separator />
      <LicensesForm initialData={license} />
    </>
  );
}
