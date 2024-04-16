"use client";
import React from "react";
import { useEffect, useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { XCircle, CheckIcon, InfoIcon, ClockIcon } from "lucide-react";
import { weekdayNames } from "@/constants/week-days.constant";
import { format, getDate } from "date-fns";
import { fr } from "date-fns/locale";
import { GoCheckCircleFill, GoClockFill, GoXCircleFill } from "react-icons/go";
import clsx from "clsx";
import TrainingActions from "./TrainingActions";
import { type TrainingDay } from "@prisma/client";
import { useRouter } from "next/navigation";

interface TrainingProgramProps {
  training: TrainingDay;
  isActif: boolean;
}

function renderActionButton(status) {
  switch (status) {
    case "MISSED":
      return (
        <div>
          <XCircle className="fill-red-200 h-6 w-6 bg-red-600 rounded-full mr-4" />
        </div>
      );
    case "SKIPPED":
      return (
        <div>
          <GoXCircleFill className="fill-red-200 h-6 w-6 bg-red-600 rounded-full mr-4" />
        </div>
      );
    case "COMPLETED":
      return (
        <div>
          <GoCheckCircleFill className="fill-green-200 h-6 w-6 bg-green-600 rounded-full mr-4" />
        </div>
      );
    case "UPCOMING":
    default:
      return (
        <div>
          <GoClockFill className="fill-gray-200 h-6 w-6 bg-gray-600 rounded-full mr-4" />
        </div>
      );
  }
}

function renderBadge(status) {
  switch (status) {
    case "MISSED":
      return (
        <Badge
          variant="destructive"
          className="capitalize bg-red-100 text-red-500"
        >
          Manqué
        </Badge>
      );
    case "SKIPPED":
      return (
        <Badge
          variant="destructive"
          className="capitalize bg-red-100 text-red-500"
        >
          Manqué
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge
          variant="success"
          className="capitalize bg-green-100 text-green-500"
        >
          Terminé
        </Badge>
      );
    case "UPCOMING":
    default:
      return (
        <Badge
          variant="default"
          className="capitalize bg-indigo-100 text-indigo-500"
        >
          À venir
        </Badge>
      );
  }
}

export default function TrainingProgram({
  training,
  isActif = false,
}: TrainingProgramProps) {
  const activeTrainingRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isActif && activeTrainingRef.current) {
      const leftColumn = activeTrainingRef.current.closest(".custom-scrollbar");
      if (leftColumn) {
        const tabsHeight = document.querySelector(".TabsList").offsetHeight;
        const scrollOffset =
          activeTrainingRef.current.offsetTop - tabsHeight - 450;
        leftColumn.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
          inline: "nearest",
        });
      }
    }
  }, [isActif]);

  return (
    <Card
      onClick={() => router.push(`/training-program?session=${training.id}`)}
      key={training.id}
      ref={activeTrainingRef}
      className={clsx(
        "cursor-pointer hover:shadow-lg transition-shadow duration-200",
        isActif == true ? " " : "  opacity-50"
      )}
    >
      <div className="flex flex-row justify-between gap-6 items-center p-3">
        <div className="flex flex-row gap-6 items-center">
          <div className="bg-orange-100 text-orange-600 font-semibold h-20 w-20 flex flex-col items-center py-4 px-5 rounded-md">
            <span className="text-xl">{getDate(training.date)}</span>
            <span className="text-sm capitalize">
              {format(training.date, "EE", {
                locale: fr,
              }).replace(".", "")}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-3">
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-lg font-semibold">{training.title}</h3>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1">
                <ClockIcon className="w-4 h-4 opacity-50" />
                <p className="text-sm text-gray-500">1h 30min</p>
              </div>
              <p className="text-sm text-gray-500">• 4 exercices</p>
              {renderBadge(training.status)}
            </div>
          </div>
        </div>
        <div>
          {isActif === true ? (
            <>
              <TrainingActions training={training} />
            </>
          ) : (
            <>{renderActionButton(training.status)}</>
          )}
        </div>
      </div>
    </Card>
  );
}
