import Image from "next/image";
import FlameSvg from "@/assets/images/icons/session-flames.svg";
import SuccessSvg from "@/assets/images/icons/session-success.svg";
import DeclineSvg from "@/assets/images/icons/session-decline.svg";

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Check,
  Users,
  Flame,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TrainingStats() {
  return (
    <main className="flex flex-1 flex-col gap-4 mb-4 md:gap-8 md:mb-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Plus Longue série
            </CardTitle>
            <Flame className="h-6 w-6 text-white  rounded-full pb-1 p-0.5 bg-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 Séances</div>
            <p className="text-xs text-muted-foreground">
              +20% du dernier mois
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Séances faites
            </CardTitle>
            <Check className="h-6 w-6 text-white rounded-full p-1  bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Faites</div>
            <p className="text-xs text-muted-foreground">
              +180.1% du dernier mois
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Session ratée(s)
            </CardTitle>
            <X className="h-6 w-6 text-white rounded-full p-1  bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Sessions</div>
            <p className="text-xs text-muted-foreground">
              -10% du dernier mois
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Progrés programme
            </CardTitle>
            <Activity className="h-6 w-6 text-white rounded-full p-1  bg-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">
              +10% vis à vis du dernier mois
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
