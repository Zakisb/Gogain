import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTrainingProgram } from "@/services/TrainingProgramServices";
import { auth } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle } from "lucide-react";
import { weekdayNames } from "@/constants/week-days.constant";
import { format, getDate } from "date-fns";
import { fr } from "date-fns/locale";

function renderBadge(status) {
  switch (status) {
    case "missed":
      return (
        <Badge variant="destructive" className="capitalize">
          Manqué
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="success" className="capitalize">
          Terminé
        </Badge>
      );
    case "incoming":
    default:
      return (
        <Badge variant="default" className="capitalize">
          À venir
        </Badge>
      );
  }
}

export default async function Page() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const trainingProgram = await getTrainingProgram({
    userId,
  });

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Mon Programme
          </h3>
          <Tabs defaultValue="all" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="completed">Completé</TabsTrigger>
              <TabsTrigger value="missed">Manqués</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-5">
                {trainingProgram?.days.map((training, index) => {
                  // const date = parse(
                  //   training.date,
                  //   "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
                  //   new Date()
                  // );
                  return (
                    <Card key={training.id}>
                      <div className="flex flex-row justify-between gap-6 items-center p-3">
                        <div className="flex flex-row gap-6 items-center">
                          <div className="bg-orange-100 text-orange-600 font-semibold h-20 w-20 flex flex-col items-center py-4 px-5 rounded-md">
                            <span className="text-xl">
                              {getDate(training.date)}
                            </span>
                            <span className="text-sm capitalize">
                              {format(training.date, "EE", {
                                locale: fr,
                              }).replace(".", "")}
                            </span>
                          </div>
                          <div className="flex flex-col justify-between gap-3">
                            <div className="flex flex-row items-center gap-4">
                              <h3 className="text-lg font-semibold">
                                Upper Body Strength
                              </h3>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                              <div className="flex flex-row items-center gap-1">
                                <ClockIcon className="w-4 h-4 opacity-50" />
                                <p className="text-sm text-gray-500">
                                  1h 30min
                                </p>
                              </div>
                              <p className="text-sm text-gray-500">
                                • 4 exercices
                              </p>
                              {renderBadge("completed")}
                            </div>
                          </div>
                        </div>
                        <div>
                          <XCircle className="fill-red-600 h-8 w-8 text-white mr-4" />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="password"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center gap-1.5">
  <ClockIcon className="w-4 h-4 opacity-50" />
  <span>{formatTime(video.duration)}</span>
</div>; */
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
