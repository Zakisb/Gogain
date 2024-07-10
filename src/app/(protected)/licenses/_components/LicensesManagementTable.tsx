"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type LicenseColumn } from "@/lib/validators";
import { type LicenseType } from "@prisma/client";
import ManagementCellActions from "./ManagementCellActions";

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
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <ManagementCellActions data={row.original} />,
  },
];

export default function LicensesManagementTable({ data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
