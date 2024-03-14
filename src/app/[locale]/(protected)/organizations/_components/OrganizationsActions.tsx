import React from "react";
import Link from "next/link";
import { SectionHeading } from "../../_components/SectionHeading";
import { Button } from "@/components/ui/button";
import { type LicenseType } from "@prisma/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OrganizationsForm from "./OrganizationsForm";
import { apiGetLicenses } from "@/services/LicenseServices";

async function getLicenses() {
  try {
    const res = await apiGetLicenses({});
    return res.data;
  } catch (error) {
    console.log(error);
    // throw error;
  }
}

export default async function OrganizationsActions() {
  const licenses = await getLicenses();
  return (
    <div className="flex items-center justify-between">
      <SectionHeading
        title="Organizations"
        description="Manage organizations"
      />
      <Sheet>
        <SheetTrigger asChild>
          <Button>Add Organization</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-5">Add an organization</SheetTitle>
            <OrganizationsForm licenses={licenses as LicenseType[]} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
