"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type LicenseColumn } from "@/lib/validators";
import { type LicenseType } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CellActions from "./CellActions";

interface TableProps<TData> {
  data: TData[];
}

const columns: ColumnDef<LicenseColumn>[] = [
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
    header: "Organization",
  },
  {
    accessorKey: "licenseType.name",
    header: "License purchased",
  },
  {
    accessorKey: "licenseType.numberOfUsers",
    header: "Number of users",
  },
  {
    accessorKey: "licenseType.price",
    header: "Price",
    cell: ({ row }) => <span>{row.original.licenseType.price} €</span>,
  },
  {
    accessorKey: "validUntil",
    header: "Valid until",
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
    cell: ({ row }) => (
      <span className="capitalize">{row.original.status}</span>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];

export default function LicensesPurchasedTable({ data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
