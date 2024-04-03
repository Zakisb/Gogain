import { ExercicesLibraryActions } from "./_components/ExercicesLibraryActions";
import VideoCard from "./_components/VideoCard";
import VideoCard2 from "./_components/VideoCard2";
import { getVideos, getTotalVideosCount } from "@/services/VideoServices";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; categories: string; levels: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const limit = 10; // Number of videos per page
  const categories = searchParams.categories
    ? searchParams.categories.split(",")
    : [];
  const levels = searchParams.levels ? searchParams.levels.split(",") : [];

  const [videos, totalCount] = await Promise.all([
    getVideos({ page, limit, categories, levels }),
    getTotalVideosCount({ categories, levels }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="relative pb-16">
      <ExercicesLibraryActions />
      <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-12 gap-5">
        {videos.map((video) => (
          <VideoCard2 key={video.id} video={video} />
        ))}
      </div>
      <div className="bg-white fixed border-t border-gray-200 w-full -bottom-1 py-2  -mx-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? `/exercices-library?page=${page - 1}` : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/exercices-library?page=${index + 1}`}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={
                  page < totalPages ? `/exercices-library?page=${page + 1}` : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
