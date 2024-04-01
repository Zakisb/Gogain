import { ExercicesLibraryActions } from "./_components/ExercicesLibraryActions";
import VideoCard from "./_components/VideoCard";
import { getVideos } from "@/services/VideoServices";

export default async function Page() {
  const videos = await getVideos();

  return (
    <>
      <ExercicesLibraryActions />
      <div className="grid lg:grid-cols-3 my-12 gap-5">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
