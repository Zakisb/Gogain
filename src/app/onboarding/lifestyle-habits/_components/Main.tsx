"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

import HealthHabits from "./HealthHabits";
import LifestyleHabits from "./LifestyleHabits";
import HealthHistory from "./HealthHistory";

import prisma from "@/prisma/client";
import { type User } from "@prisma/client";

interface NutritionFormProps {
  initialData?: Pick<User, "nutrition"> | null | undefined;
}

export default function Main({ initialData }: NutritionFormProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const onNext = (value: string) => {
    if (value == "next") {
      setProgress((prev) => prev + 33.33);
      setStep((prev) => prev + 1);
    } else {
      setProgress((prev) => prev + -33.33);
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col  container max-w-[800px] mx-auto mt-16 relative">
      {/* <div className="mb-7 space-y-1">
        <h2>Informations Diètitique </h2>
        <p className="text-gray-700 text-sm">
          Partagez vos préférences diététiques pour un suivi personnalisé
        </p>
      </div> */}
      {step === 0 && (
        <HealthHabits handleProgress={onNext} data={initialData} />
      )}
      {step === 1 && (
        <LifestyleHabits handleProgress={onNext} data={initialData} />
      )}
      {step === 2 && (
        <HealthHistory handleProgress={onNext} data={initialData} />
      )}
      <Progress
        value={progress}
        className="fixed w-1/2 inset-x-0  bottom-0  h-2 mt-8"
      />
    </div>
  );
}
