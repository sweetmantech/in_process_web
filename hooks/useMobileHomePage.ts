"use client";

import { useRouter } from "next/navigation";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { useTotalMomentsCount } from "@/hooks/useTotalMomentsCount";
import { getTodayMomentsCount } from "@/lib/moment/getTodayMomentsCount";

export const useMobileHomePage = () => {
  const { moments, isLoading } = useTimelineProvider();
  const { data: totalCount } = useTotalMomentsCount();
  const todayCount = getTodayMomentsCount(moments);
  const { push } = useRouter();

  return {
    moments,
    totalCount,
    todayCount,
    isLoading,
    onCreateClick: () => push("/create"),
  };
};
