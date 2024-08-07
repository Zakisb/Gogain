import { SectionHeading } from "../_components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { type EmployeeColumn } from "@/lib/validators";
import EmployeesActions from "./_components/EmployeesActions";
// import { CellAction } from "./cell-action";

const columns: ColumnDef<EmployeeColumn>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "firstName",
    header: "Prénom",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  // {
  //   accessorKey: "gender",
  //   header: "Gender",
  // },
  {
    accessorKey: "createAt",
    header: "Create Time",
  },
  {
    accessorKey: "updateAt",
    header: "Update Time",
  },
  //   {
  //     id: "actions",
  //     enableSorting: false,
  //     cell: ({ row }) => <CellAction data={row.original} />,
  //   },
];

export default function Page() {
  return (
    <>
      <EmployeesActions />
      <Separator />
      <div>
        <DataTable columns={columns} data={[]} />
      </div>
    </>
  );
}
