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
import LicensesSold from "../_components/LicensesSold";
import MostWatchedContent from "../_components/MostWatchedContent";

// import { Overview } from "@/components/dashboard/overview";
// import { RecentSales } from "@/components/dashboard/recent-sales";

export default async function Page() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return (
    <div className="flex h-full flex-col ">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <SectionHeading
            title={`Soyez le bienvenu, ${user.firstName} !`}
            description="Suivez, gérez et prévoyez vos clients et commandes."
          />
          {/* <h2 className="text-3xl font-bold tracking-tight">
            Bon retour parmi nous, {user.firstName} !
          </h2> */}
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            {/* <Button size="sm">Download</Button> */}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
              <CardTitle className="text-sm font-medium flex flex-row items-center gap-4">
                <span>Revenus totaux</span>
              </CardTitle>
              <DollarSign className="text-sky-800 border  rounded-md p-1.5 h-8  w-8" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-start justify-between ">
                <div className="self-end ">
                  <div className="flex flex-row gap-x-2">
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <TrendingUp className=" text-green-500 h-5 w-5" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% du dernier mois
                  </p>
                </div>{" "}
                <Image src={ChartGreenSvg} alt="chart" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
              <CardTitle className="text-sm font-medium flex flex-row items-center gap-4">
                <span>Total utilisateurs</span>
              </CardTitle>
              <Users className="text-sky-800 border  rounded-md p-1.5 h-8  w-8" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-start justify-between ">
                <div className="self-end ">
                  <div className="flex flex-row gap-x-2">
                    <div className="text-2xl font-bold">150</div>
                    <TrendingDown className=" text-red-500 h-5 w-5" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% du dernier mois
                  </p>
                </div>{" "}
                <Image src={ChartRedSvg} alt="chart" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
              <CardTitle className="text-sm font-medium flex flex-row items-center gap-4">
                <span>Entreprises</span>
              </CardTitle>
              <Building2 className="text-sky-800 border  rounded-md p-1.5 h-8  w-8" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-start justify-between ">
                <div className="self-end ">
                  <div className="flex flex-row gap-x-2">
                    <div className="text-2xl font-bold">316</div>
                    <TrendingUp className=" text-green-500 h-5 w-5" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% du dernier mois
                  </p>
                </div>{" "}
                <Image src={ChartGreenSvg} alt="chart" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Licenses vendues</CardTitle>
              <CardDescription>
                Visualisez les ventes de licences par mois.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 mt-8 pb-12">
              <LicensesSold />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">
                Catégorie la plus visionné
              </CardTitle>
              <CardDescription>
                Visualisez les catégories les plus visionnées par les adhérants.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 mt-8 pb-12">
              <MostWatchedContent />
            </CardContent>
          </Card>
          {/* <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="text-lg">
              Retours sur les Séances d'Entraînement{" "}
            </CardTitle>
            <CardDescription>
              Analyse des impressions et suggestions des utilisateurs pour
              optimiser nos programmes d'entraînement.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2 mt-8 pb-12">
            <SessionsNotes />
          </CardContent>
        </Card> */}
          {/* <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
