"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type UsersColumn } from "@/lib/validators";
import { type User } from "@prisma/client";
import { type Account } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import CellActions from "./CellActions";
import { Badge } from "@/components/ui/badge";
import { userRolesMapping } from "@/constants/roles.constant";
import { cn } from "@/lib/utils";
// import { roles } from "@/lib/constants";

interface UserWithMainAccount extends User {
  accounts: Account[];
}

export interface TableProps {
  users: UserWithMainAccount[];
}

const columns: ColumnDef<UsersColumn>[] = [
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
    accessorKey: "firstName",
    header: "Nom",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.firstName || "-"}</span>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Prénom",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.lastName || "-"}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className=""
        onClick={() => console.log(row.original)}
      >
        {row.original.email}
      </Badge>
    ),
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const mainAccount = row.original.accounts.find(
        (account) => account.isMainAccount
      );

      return (
        <div className="flex flex-row items-center gap-2">
          <span
            className={cn(
              "capitalize h-3 w-3 rounded-full",
              `${userRolesMapping[mainAccount.role].bg} ${
                userRolesMapping[mainAccount.role].text
              }`
            )}
          ></span>
          {userRolesMapping[mainAccount.role].label}
        </div>
      );
    },
  },
  {
    accessorKey: "isActif",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={cn(
          "capitalize border rounded-md px-2 text-sm py-1",
          row.original.isActive
            ? "text-green-500 bg-green-50 border-green-500"
            : "text-red-500 bg-red-50 border-red-500"
        )}
      >
        {row.original.isActive ? "Actif" : "Inactif"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Crée le",
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

export default function UsersTable({ users }: TableProps) {
  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
