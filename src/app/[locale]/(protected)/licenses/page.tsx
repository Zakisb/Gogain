import { Separator } from "@/components/ui/separator";
import { apiGetLicenses } from "@/services/LicenseServices";
import Link from "next/link";
import LicensesPurchasedTable from "./_components/LicensesPurchasedTable";
import LicensesManagementTable from "./_components/LicensesManagementTable";
import { LicensesTableActions } from "./_components/LicensesTableActions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

async function getLicenses() {
  try {
    const res = await apiGetLicenses({});
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPurchasedLicenses() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/licenses/purchased`
  );
  return res.json();
}

export default async function Page() {
  const managementLicensesData = getLicenses();
  const purchasedLicensesData = getPurchasedLicenses();
  // Wait for the promises to resolve
  const [managementLicenses, purchasedLicenses] = await Promise.all([
    managementLicensesData,
    purchasedLicensesData,
  ]);

  return (
    <>
      <LicensesTableActions />

      <Tabs defaultValue="purchased" className="space-y-4">
        <TabsList>
          <TabsTrigger value="purchased">Purchased</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
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

export const runtime = "edge";
