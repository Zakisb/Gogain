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
} from "lucide-react";
import ChartRedSvg from "@/assets/images/dashboard/chart-1.svg";
import ChartGreenSvg from "@/assets/images/dashboard/chart-2.svg";
import Image from "next/image";
import EmployeesPerformance from "./_components/EmployeesPerformance";
import MostAskedQuestions from "./_components/MostAskedQuestions";
import SessionsNotes from "./_components/SessionsNotes";
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
            title={`Bon retour parmi nous, ${user.firstName} !`}
            description="Vue d'ensemble complète sur l'engagement, la performance et le bien-être des employés."
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
                <span>Nombre d&apos;employés</span>
              </CardTitle>
              <UserRoundPlus className="text-sky-800 border  rounded-md p-1.5 h-8  w-8" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-start justify-between ">
                <div className="self-end ">
                  <div className="flex flex-row gap-x-2">
                    <div className="text-2xl font-bold">2,420</div>
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
                <span>Séances d’entraînements</span>
              </CardTitle>
              <Dumbbell className="text-sky-800 border  rounded-md p-1.5 h-8  w-8" />
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
                <span>Total Heures Visionnées</span>
              </CardTitle>
              <Monitor className="text-sky-800 border  rounded-md p-1.5 h-8  w-8" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-start justify-between ">
                <div className="self-end ">
                  <div className="flex flex-row gap-x-2">
                    <div className="text-2xl font-bold">316h</div>
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
              <CardTitle className="text-lg">
                Classement des Meilleurs Employés
              </CardTitle>
              <CardDescription>
                Visualisez les performances en fonction du nombre de de séances
                d’entraînement complétées.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 mt-8 pb-12">
              <EmployeesPerformance />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">
                Questions Fréquemment Posées
              </CardTitle>
              <CardDescription>
                Répartitions des questions les plus posées par les employés.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 mt-8 pb-12">
              <MostAskedQuestions />
            </CardContent>
          </Card>
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle className="text-lg">
                Retours sur les Séances d&apos;Entraînement{" "}
              </CardTitle>
              <CardDescription>
                Analyse des impressions et suggestions des utilisateurs pour
                optimiser nos programmes d&apos;entraînement.{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 mt-8 pb-12">
              <SessionsNotes />
            </CardContent>
          </Card>
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
