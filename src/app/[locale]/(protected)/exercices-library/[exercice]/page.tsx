import { SectionHeading } from "../../_components/SectionHeading";
import VideoForm from "../_components/VideoForm";
import { Separator } from "@/components/ui/separator";
import { getVideo } from "@/services/VideoServices";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: { exercice: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);

  const video = await getVideo(params.exercice);

  if (!video) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Modifier les données de la vidéo"
          description="mettez à jour les informations de la vidéo."
        />
      </div>
      <Separator />

      <VideoForm initialData={video} type="edit" />
    </>
  );
}
