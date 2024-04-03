import React from "react";
import Link from "next/link";
import { SectionHeading } from "../../_components/SectionHeading";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { filterVideos } from "@/actions/videos";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SearchFilters from "./SearchFilters";

export const ExercicesLibraryActions = () => {
  return (
    <div className="flex items-center justify-between">
      <SectionHeading
        title="Bibliothèque d'exercices"
        description="Découvrez et explorez une variété d'exercices pour tous les niveaux et
        objectifs de fitness."
      />
      <div className="flex flex-row gap-4 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <Filter className="mr-2 h-4 w-4" /> Filtres
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full">
            <form action={filterVideos} className="flex flex-col flex-grow">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>
                  Filtrez les exercices par catégorie, durée, difficulté et plus
                  encore.
                </SheetDescription>
                <Separator />
              </SheetHeader>

              <div className="mt-6 flex-grow overflow-y-auto">
                <SearchFilters />
              </div>

              <div className="mt-6">
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Appliquer les filtres
                  </Button>
                </SheetClose>
              </div>
            </form>
          </SheetContent>
        </Sheet>
        <Link href="/exercices-library/new">
          <Button>Ajouter une vidéo</Button>
        </Link>
      </div>
    </div>
  );
};
