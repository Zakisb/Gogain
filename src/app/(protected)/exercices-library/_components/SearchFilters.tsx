"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_OPTIONS, LEVEL_OPTIONS } from "@/constants/options.constant";
import { Checkbox } from "@/components/ui/checkbox";

export default function SearchFilters() {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("categories")?.split(",") || [];
  const levelParams = searchParams.get("levels")?.split(",") || [];

  return (
    <div className="space-y-8">
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
          Catégorie
        </h4>
        <div className="space-y-4">
          {Object.entries(CATEGORY_OPTIONS).map(([value, label]) => (
            <div key={value} className="items-top flex space-x-2">
              <Checkbox
                id={value}
                value={value}
                name={`category[]`}
                defaultChecked={categoryParams.includes(value)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={value}
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
          Niveau
        </h4>
        <div className="space-y-4">
          {Object.entries(LEVEL_OPTIONS).map(([value, label]) => (
            <div key={value} className="items-top flex space-x-2">
              <Checkbox
                id={`level-${value}`}
                value={value}
                name={`level[]`}
                defaultChecked={levelParams.includes(value)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={`level-${value}`}
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
