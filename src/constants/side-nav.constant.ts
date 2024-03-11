import {
  BookOpenCheck,
  LayoutDashboard,
  Building,
  Users,
  Library,
  Dumbbell,
  Utensils,
} from "lucide-react";
import { type NavItem } from "@/types/nav-item";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Organizations",
    icon: Building,
    href: "/organizations",
    color: "text-orange-500",
    isChidren: false,
  },
  {
    title: "Licenses",
    icon: Building,
    href: "/licenses",
    color: "text-indigo-500",
    isChidren: false,
  },
  {
    title: "Employees",
    icon: Users,
    href: "/employees",
    color: "text-red-500",
    isChidren: false,
  },
  {
    title: "Exercices library",
    icon: Library,
    href: "/settings",
    color: "text-purple-500",
    isChidren: false,
  },
  {
    title: "Training program",
    icon: Dumbbell,
    href: "/settings",
    color: "text-yellow-500",
    isChidren: false,
  },
  {
    title: "Diet",
    icon: Utensils,
    href: "/settings",
    color: "text-green-500",
    isChidren: false,
  },
];
