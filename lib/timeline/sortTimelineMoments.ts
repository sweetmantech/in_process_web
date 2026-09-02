import { TimelineMoment } from "@/types/moment";
import type { TimelineSortOrder } from "@/types/timeline";

export function sortTimelineMoments(
  moments: TimelineMoment[],
  sortOrder: TimelineSortOrder = "created_at_desc"
): TimelineMoment[] {
  if (sortOrder === "token_id_asc") {
    return [...moments].sort((a, b) => Number(a.token_id) - Number(b.token_id));
  }

  return [...moments].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
