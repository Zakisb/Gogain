import { Option } from "@/components/ui/multiple-selector";

export const userRoleOptions: Option[] = [
  { value: "ADMIN", label: "Administrateur" },
  { value: "COACH", label: "Coach" },
];

export const userRolesMapping = {
  ADMIN: {
    label: "Administrateur",
    bg: "bg-indigo-500 hover:bg-indigo-400",
    text: "text-indigo-900 hover:text-indigo-900",
  },
  COACH: {
    label: "Coach",
    bg: "bg-orange-500 hover:bg-orange-400",
    text: "text-orange-900 hover:text-orange-900",
  },
};
