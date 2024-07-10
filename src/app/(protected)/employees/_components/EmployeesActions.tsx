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
        title="Employés"
        description="Gestion des comptes des employés"
      />
      <Sheet>
        <SheetTrigger asChild>
          <Button>Ajouter un employé</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-5">Ajouter un employé</SheetTitle>
            <EmployeesForm />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
