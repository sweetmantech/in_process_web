import { TimelineMoment } from "@/types/moment";

export const getTodayMomentsCount = (moments: TimelineMoment[]): number => {
  const today = new Date().toDateString();
  return moments.filter((m) => new Date(m.created_at).toDateString() === today).length;
};
