import {
  BookOpenCheck,
  LayoutDashboard,
  Building,
  Users,
  Library,
  Dumbbell,
  Utensils,
  Calendar,
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
    title: "Dashboard HR",
    icon: LayoutDashboard,
    href: "/dashboard-hr",
    color: "text-sky-500",
  },
  {
    title: "Dashboard - Employée",
    icon: LayoutDashboard,
    href: "/dashboard-employee",
    color: "text-sky-500",
  },
  {
    title: "Calendrier",
    icon: Calendar,
    href: "/calendar",
    color: "text-indigo-500",
  },
  {
    title: "Entreprises",
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
    title: "Employés",
    icon: Users,
    href: "/employees",
    color: "text-red-500",
    isChidren: false,
  },
  {
    title: "Utilisateurs",
    icon: Users,
    href: "/users",
    color: "text-red-500",
    isChidren: false,
  },
  {
    title: "Exercices library",
    icon: Library,
    href: "/exercices-library",
    color: "text-purple-500",
    isChidren: false,
  },
  {
    title: "Training program",
    icon: Dumbbell,
    href: "/training-program",
    color: "text-yellow-500",
    isChidren: false,
  },
  {
    title: "Diet",
    icon: Utensils,
    href: "/diet",
    color: "text-green-500",
    isChidren: false,
  },
];
