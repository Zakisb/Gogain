import { SectionHeading } from "../../_components/SectionHeading";
import VideoForm from "../_components/VideoForm";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Ajouter une vidéo"
          description="Télécargez une vidéo pour l'ajouter à la bibliothèque d'exercices."
        />
      </div>
      <Separator />
      <VideoForm />
    </>
  );
}
