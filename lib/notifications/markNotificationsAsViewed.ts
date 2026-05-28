import { IN_PROCESS_API } from "@/lib/consts";

interface MarkNotificationsAsViewedResponse {
  status: "success" | "error";
  updated: number;
  message?: string;
}

export async function markNotificationsAsViewed(
  artistId?: string
): Promise<MarkNotificationsAsViewedResponse> {
  const params = new URLSearchParams();
  if (artistId) params.append("artist_id", artistId);

  const res = await fetch(`${IN_PROCESS_API}/notifications?${params.toString()}`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to mark notifications as viewed");
  }

  return res.json();
}
