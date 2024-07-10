import { Separator } from "@/components/ui/separator";
import { apiGetLicenses } from "@/services/LicenseServices";
import Link from "next/link";
import LicensesPurchasedTable from "./_components/LicensesPurchasedTable";
import LicensesManagementTable from "./_components/LicensesManagementTable";
import { LicensesTableActions } from "./_components/LicensesTableActions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import prisma from "@prisma/client";
import { getLicenses, getPurchasedLicenses } from "@/services/LicenseServices";

export default async function Page() {
  const managementLicenses = await getLicenses();
  const purchasedLicenses = await getPurchasedLicenses();

  return (
    <>
      <LicensesTableActions />
      <Tabs defaultValue="purchased" className="space-y-4">
        <TabsList>
          <TabsTrigger value="purchased">Achetée(s)</TabsTrigger>
          <TabsTrigger value="management">Gestion</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="purchased" className="space-y-4">
          <LicensesPurchasedTable data={purchasedLicenses} />
        </TabsContent>
        <TabsContent value="management" className="space-y-4">
          <LicensesManagementTable data={managementLicenses} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export const dynamic = "force-dynamic";
