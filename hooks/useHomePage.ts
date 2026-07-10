"use client";

import { useRouter } from "next/navigation";
import { useTotalMomentsCount } from "@/hooks/useTotalMomentsCount";
import { useNewMomentsTodayCount } from "@/hooks/useNewMomentsTodayCount";

export const useHomePage = () => {
  const { push } = useRouter();
  const { data: totalCount } = useTotalMomentsCount();
  const todayCount = useNewMomentsTodayCount();

  return {
    totalCount,
    todayCount,
    onCreateClick: () => push("/create"),
  };
};
