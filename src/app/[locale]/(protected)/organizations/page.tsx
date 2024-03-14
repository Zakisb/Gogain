import { Separator } from "@/components/ui/separator";
import { getOrganizations } from "@/services/OrganizationServices";
import OrganizationsActions from "./_components/OrganizationsActions";
import OrganizationsTable from "./_components/OrganizationsTable";

export default async function Page() {
  const organizations = await getOrganizations();

  return (
    <>
      <OrganizationsActions />
      <Separator />
      <OrganizationsTable organizations={organizations} />
    </>
  );
}
