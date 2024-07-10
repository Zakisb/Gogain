"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type LicensePurchasedColumn } from "@/lib/validators";
import { type LicenseType } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import PurchaseCellActions from "./PurchaseCellActions";
import { licenseStatusMapping } from "@/constants/status.constant";
import { cn } from "@/lib/utils";

interface TableProps<TData> {
  data: TData[];
}

const columns: ColumnDef<LicensePurchasedColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "organization.name",
    header: "Entreprise",
  },
  {
    accessorKey: "licenseType.name",
    header: "License achetée",
  },
  {
    accessorKey: "licenseType.price",
    header: "Prix",
    cell: ({ row }) => <span>{row.original.licenseType.price} €</span>,
  },
  {
    accessorKey: "numberOfUsers",
    header: "Nombre d'utilisateurs",
  },
  {
    accessorKey: "validUntil",
    header: "Valide jusqu'au",
    cell: ({ row }) => (
      <span className="capitalize">
        {format(new Date(row.original.validUntil), "MMM d, yyyy", {
          locale: fr,
        })}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "inline-flex border flex-row items-center gap-2 px-2  py-1 rounded-md",
            licenseStatusMapping[status].border,
            licenseStatusMapping[status].text,
            licenseStatusMapping[status].bg
          )}
        >
          <span
            className={cn(
              "capitalize  h-2.5 w-2.5 rounded-full",
              `${licenseStatusMapping[status].dot}`
            )}
          ></span>
          {licenseStatusMapping[row.original.status].label}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <PurchaseCellActions data={row.original} />,
  },
];

export default function LicensesPurchasedTable({ data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
