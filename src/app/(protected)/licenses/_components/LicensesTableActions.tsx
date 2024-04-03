import React from "react";
import Link from "next/link";
import { SectionHeading } from "../../_components/SectionHeading";

import { Button } from "@/components/ui/button";
export const LicensesTableActions = () => {
  return (
    <div className="flex items-center justify-between">
      <SectionHeading title="Licenses" description="Manage licenses" />
      {/* <Button onClick={() => router.push("/licenses/new")}>Create New</Button> */}
      <Link href="/licenses/new">
        <Button>Create New</Button>
      </Link>
    </div>
  );
};