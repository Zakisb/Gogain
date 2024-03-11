import { SectionHeading } from "../_components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { type EmployeeColumn } from "@/lib/validators";
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
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
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
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Employees"
          description="Manage employees's accounts"
        />
        <Button>Add New</Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={[]} />
      </div>
    </>
  );
}
