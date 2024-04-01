import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getVideo } from "@/services/VideoServices";
import VideoPlayer from "../../../_components/VideoPlayer";
import { Badge } from "@/components/ui/badge";
import { LEVEL_OPTIONS, CATEGORY_OPTIONS } from "@/constants/options.constant";

export default async function VideoModal({
  params,
}: {
  params: { id: string };
}) {
  const video = await getVideo(params.id);

  if (!video) return null;

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[725px]" onCloseBack>
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          {/* <DialogDescription>{video.description}</DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 pt-4 pb-2">
          <VideoPlayer embedCode={video.embedCode} />
          <DialogDescription>{video.description}</DialogDescription>
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
      </DialogContent>
    </Dialog>
  );
}
