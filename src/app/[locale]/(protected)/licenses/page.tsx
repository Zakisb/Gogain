import { Separator } from "@/components/ui/separator";
import { apiGetLicenses } from "@/services/LicenseServices";
import Link from "next/link";
import LicensesTable from "./_components/LicensesTable";
import { LicensesTableActions } from "./_components/LicensesTableActions";

async function getLicenses() {
  try {
    const res = await apiGetLicenses({});
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default async function Page() {
  const licenses = await getLicenses();

  return (
    <>
      <LicensesTableActions />
      <Separator />
      <LicensesTable data={licenses} />
    </>
  );
}
