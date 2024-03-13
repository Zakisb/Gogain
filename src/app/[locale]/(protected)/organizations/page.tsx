import { SectionHeading } from "../_components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { type EmployeeColumn } from "@/lib/validators";
import OrganizationsActions from "./_components/OrganizationsActions";
import OrganizationsTable from "./_components/OrganizationsTable";
import { Organization } from "@prisma/client";
// import { CellAction } from "./cell-action";

async function getOrganizations() {
  const res = await fetch(`http://localhost:3000/api/organizations`);
  return res.json();
}

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
