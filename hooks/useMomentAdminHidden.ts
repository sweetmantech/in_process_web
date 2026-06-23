import { useMemo } from "react";
import { type TimelineMoment } from "@/types/moment";
import { useUserProvider } from "@/providers/UserProvider";

export const useMomentAdminHidden = (moment: TimelineMoment): boolean => {
  const { userId } = useUserProvider();

  return useMemo(() => {
    if (!userId) return false;
    return moment.hidden.includes(userId);
  }, [moment.hidden, userId]);
};
