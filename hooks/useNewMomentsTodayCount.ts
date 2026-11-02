import { useTimelineProvider } from "@/providers/TimelineProvider";
import { getTodayMomentsCount } from "@/lib/moment/getTodayMomentsCount";
import { useHasMounted } from "@/hooks/useHasMounted";

export const useNewMomentsTodayCount = () => {
  const { moments } = useTimelineProvider();
  const mounted = useHasMounted();
  return mounted ? getTodayMomentsCount(moments) : 0;
};
