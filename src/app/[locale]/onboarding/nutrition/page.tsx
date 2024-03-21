"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

import NutritionBasics from "./_components/NutritionBasics";
import NutritionPreferences from "./_components/NutritionPreferences";
import FoodPreferences from "./_components/FoodPreferences";

export default function Nutrition() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const t = useTranslations("Onboarding.HealthHistory");

  const onNext = (value: string) => {
    console.log(value);
    if (value == "next") {
      console.log(progress);
      setProgress((prev) => prev + 33.33);
      setStep((prev) => prev + 1);
    } else {
      setProgress((prev) => prev + -33.33);
      setStep((prev) => prev - 1);
      console.log("here");
    }
  };

  return (
    <div className="flex flex-col  container max-w-[800px] mx-auto mt-16 relative">
      <div className="mb-7 space-y-1">
        <h2>Informations Diètitique </h2>
        <p className="text-gray-700 text-sm">
          Partagez vos préférences diététiques pour un suivi personnalisé
        </p>
      </div>
      {step === 0 && <NutritionBasics handleProgress={onNext} />}
      {step === 1 && <NutritionPreferences handleProgress={onNext} />}
      {step === 2 && <FoodPreferences handleProgress={onNext} />}
      <Progress
        value={progress}
        className="fixed w-1/2 inset-x-0  bottom-0  h-2 mt-8"
      />
    </div>
  );
}
