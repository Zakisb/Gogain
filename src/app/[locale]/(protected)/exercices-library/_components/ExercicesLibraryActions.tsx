import React from "react";
import Link from "next/link";
import { SectionHeading } from "../../_components/SectionHeading";

import { Button } from "@/components/ui/button";
export const ExercicesLibraryActions = () => {
  return (
    <div className="flex items-center justify-between">
      <SectionHeading
        title="Bibliothèque d'exercices"
        description="Découvrez et explorez une variété d'exercices pour tous les niveaux et
        objectifs de fitness."
      />
      <Link href="/exercices-library/new">
        <Button>Ajouter une vidéo</Button>
      </Link>
    </div>
  );
};
