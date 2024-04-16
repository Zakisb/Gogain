import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTrainingProgram } from "@/services/TrainingProgramServices";
import { auth } from "@clerk/nextjs";
import { Train } from "lucide-react";
import TrainingProgram from "./_components/TrainingProgram";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import clsx from "clsx";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";
import {
  DumbbellIcon,
  TagIcon,
  TrendingUpIcon,
  ClockIcon,
} from "@/components/ui/icons";
import formatTime from "@/lib/formatTime";
import TrainingSession from "./_components/TrainingSession";
import { redirect } from "next/navigation";
import TrainingStats from "./_components/TrainingStats";

export default async function Page({
  searchParams,
}: {
  searchParams: { session: string };
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    redirect("/login");
  }

  const trainingProgram = await getTrainingProgram({
    userId,
  });

  const isFirstUpcomingSession = (training, trainingSessions) => {
    // Filter the training sessions to get only the upcoming sessions
    const firstUpcomingSessionIndex = trainingSessions.findIndex(
      (session) => session.status === "UPCOMING"
    );

    return (
      firstUpcomingSessionIndex !== -1 &&
      trainingSessions[firstUpcomingSessionIndex].id == training.id
    );
  };

  const sessionId = searchParams.session;

  const activeSession = trainingProgram?.days.find((training) =>
    isFirstUpcomingSession(training, trainingProgram.days)
  );

  const selectedSession = sessionId
    ? trainingProgram?.days.find(
        (training) => training.id === parseInt(sessionId)
      )
    : activeSession;

  return (
    <div className="h-full overflow-hidden">
      <TrainingStats />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Tabs defaultValue="all" className="mt-4 ">
            <TabsList className="grid w-full grid-cols-4 mb-6 TabsList">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="completed">Completé</TabsTrigger>
              <TabsTrigger value="missed">Manqués</TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="h-lvh overflow-y-auto custom-scrollbar"
            >
              <div className="space-y-5">
                {/* <TrainingProgram trainingProgram={trainingProgram} /> */}
                {trainingProgram?.days.map((training, index) => {
                  return (
                    <TrainingProgram
                      key={training.id}
                      training={training}
                      isActif={isFirstUpcomingSession(
                        training,
                        trainingProgram.days
                      )}
                    />
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="password"></TabsContent>
          </Tabs>
        </div>
        <div className="h-dvh pb-32  custom-scrollbar overflow-y-auto">
          <TrainingSession session={selectedSession} />
        </div>
      </div>
    </div>
  );
}
