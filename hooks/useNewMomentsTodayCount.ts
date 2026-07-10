import { useTimelineProvider } from "@/providers/TimelineProvider";
import { getTodayMomentsCount } from "@/lib/moment/getTodayMomentsCount";

export const useNewMomentsTodayCount = () => {
  const { moments } = useTimelineProvider();
  return getTodayMomentsCount(moments);
};
