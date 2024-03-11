"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type LicenseColumn } from "@/lib/validators";
import { type LicenseType } from "@prisma/client";
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "numberOfUsers",
    header: "Number of users",
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];

export default function LicensesTable({ data }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
