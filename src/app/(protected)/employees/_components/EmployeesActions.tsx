"use client";
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
import EmployeesForm from "./EmployeesForm";
import { apiGetLicenses } from "@/services/LicenseServices";

export default function EmployeesActions() {
  return (
    <div className="flex items-center justify-between">
      <SectionHeading
        title="Employees"
        description="Manage employees's accounts"
      />
      <Sheet>
        <SheetTrigger asChild>
          {/* <Button>Add Employee</Button> */}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-5">Add an employee</SheetTitle>
            <EmployeesForm />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
