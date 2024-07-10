"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type OrganizationsColumn } from "@/lib/validators";
import { type Organization } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CellActions from "./CellActions";
import { Badge } from "@/components/ui/badge";
import { industryOptions } from "@/constants/industries.constant";

interface TableProps {
  organizations: Organization[];
}

const columns: ColumnDef<OrganizationsColumn>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => {
      const industry = industryOptions.find(
        (i) => i.value === row.original.industry
      );
      return (
        <Badge variant="outline" className="capitalize">
          {industry?.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "numberOfEmployees",
    header: "Nombre d'employés",
  },
  {
    accessorKey: "createdAt",
    header: "Rejoins le",
    cell: ({ row }) => (
      <span className="capitalize">
        {format(new Date(row.original.createdAt), "MMM d, yyyy", {
          locale: fr,
        })}
      </span>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];

export default function OrganizationsTable({ organizations }: TableProps) {
  return (
    <div>
      <DataTable columns={columns} data={organizations} />
    </div>
  );
}
