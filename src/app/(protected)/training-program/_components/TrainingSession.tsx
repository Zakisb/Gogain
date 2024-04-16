"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";
import {
  DumbbellIcon,
  TagIcon,
  TrendingUpIcon,
  ClockIcon,
} from "@/components/ui/icons";
import clsx from "clsx";
import formatTime from "@/lib/formatTime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";

const TrainingSession = ({ session }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedExercice, setSelectedExercice] = React.useState(null);

  if (!session) {
    return <div>Aucune séance trouvé</div>;
  }

  return (
    <div className="border rounded-md p-4 mt-4">
      <div className="space-y-4 ">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-xl font-semibold mt-2">
            Jour {session.day} - {session.title}
          </h4>
          <span className="text-xs">{format(session.date, "dd/MM/yyyy")}</span>
        </div>

        {session.exercises.map((exercise) => (
          <Card
            className={clsx(
              "cursor-pointer hover:shadow-lg transition-shadow duration-200"
            )}
            onClick={() => {
              setOpen(true);
              setSelectedExercice(exercise);
            }}
            key={exercise.id}
          >
            <div className="flex flex-row justify-between gap-6 items-center p-3">
              <div className="flex flex-row gap-6 items-center">
                <div className="font-semibold h-20 w-28 flex flex-col items-center rounded-md">
                  <img
                    alt="Video thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 rounded-md transition-transform"
                    src={exercise.posterUrl}
                  />
                </div>

                <div className="flex flex-col  gap-1">
                  <h3 className="text-lg font-semibold">{exercise.title}</h3>
                  <CardDescription className="mb-0 line-clamp-1">
                    {exercise.description}
                  </CardDescription>
                  <div className="flex flex-row gap-4 text-xs mt-2">
                    <div className="flex items-center gap-1.5">
                      <DumbbellIcon className="w-4 h-4 opacity-50" />
                      <span className="truncate">
                        {CATEGORY_OPTIONS[exercise.category]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4 opacity-50" />
                      <span>{formatTime(exercise.duration)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <TrendingUpIcon className="w-4 h-4 opacity-50" />
                      <span>{LEVEL_OPTIONS[exercise.level]}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[725px]">
          {selectedExercice && (
            <div
              className="rounded-sm"
              dangerouslySetInnerHTML={{
                __html: selectedExercice.embedCode,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingSession;
