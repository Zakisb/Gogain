import React from "react";

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { currentUser } from "@clerk/nextjs";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  UserRoundPlus,
  TrendingUp,
  Dumbbell,
  TrendingDown,
  Monitor,
  DollarSign,
  Users,
  Building2,
} from "lucide-react";
import ChartRedSvg from "@/assets/images/dashboard/chart-4.svg";
import ChartGreenSvg from "@/assets/images/dashboard/chart-3.svg";
import Image from "next/image";

// import { Overview } from "@/components/dashboard/overview";
// import { RecentSales } from "@/components/dashboard/recent-sales";

export default async function Page() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return <div className="flex h-full flex-col "></div>;
}
