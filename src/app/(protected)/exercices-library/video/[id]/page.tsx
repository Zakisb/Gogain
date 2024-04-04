import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getVideo } from "@/services/VideoServices";
import VideoPlayer from "../../_components/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";
import { SectionHeading } from "../../../_components/SectionHeading";
import { Separator } from "@/components/ui/separator";

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const video = await getVideo(params.id);

  if (!video) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeading
          title={video.title}
          description="Télécargez une vidéo pour l'ajouter à la bibliothèque d'exercices."
        />
      </div>
      <Separator />
      <div className="grid gap-4 pt-4 pb-2">
        <VideoPlayer embedCode={video.embedCode} />
        <p className="text-sm text-muted-foreground max-w-xl">
          {video.description}
        </p>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <div className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">Niveau:</span>
          <span className="text-gray-800 text-sm">
            {LEVEL_OPTIONS[video.level]}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 text-sm mr-2">Catégorie:</span>
          <span className="text-gray-800 text-sm">
            {CATEGORY_OPTIONS[video.category]}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        <span className="text-gray-500 text-sm mr-2">Tags:</span>
        <div className="flex flex-wrap">
          {video.tags.map((tag) => (
            <Badge key={tag} variant="default" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
