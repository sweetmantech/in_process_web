import Loading from "../Loading";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import FetchMoreInspector from "../FetchMoreInspector";
import Moments from "../MomentsGrid/Moments";

const MomentsTimeline = () => {
  const { moments, isLoading, fetchMore } = useTimelineProvider();

  if (!moments.length)
    return (
      <div className="flex w-full items-center justify-center">
        {isLoading ? (
          <Loading className="aspect-[1/1] w-[100px] md:w-[200px]" />
        ) : (
          <p className="font-archivo text-lg md:text-5xl">No moments yet!</p>
        )}
      </div>
    );

  return (
    <>
      <Moments />
      <FetchMoreInspector fetchMore={fetchMore} />
    </>
  );
};

export default MomentsTimeline;
