import { useTimelineProvider } from "@/providers/TimelineProvider";
import { type TimelineMoment } from "@/types/moment";
import MomentsSkeleton from "./MomentsSkeleton";
import NoMomentsFound from "./NoMomentsFound";
import MomentItem from "./MomentItem";

const Moments = () => {
  const { moments, isLoading } = useTimelineProvider();

  if (isLoading) return <MomentsSkeleton />;
  if (moments.length === 0) return <NoMomentsFound />;

  return (
    <div className="grid w-full grow grid-cols-1 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {moments.map((m: TimelineMoment) => (
        <MomentItem m={m} key={m.id} />
      ))}
    </div>
  );
};

export default Moments;
