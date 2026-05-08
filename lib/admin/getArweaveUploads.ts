import { IN_PROCESS_API } from "@/lib/consts";
import { ArweaveUploadsResponse } from "@/types/arweave";

interface GetArweaveUploadsParams {
  authHeaders: HeadersInit;
  page?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  artist?: string;
}

export async function getArweaveUploads({
  authHeaders,
  page = 1,
  limit = 10,
  period,
  artist,
}: GetArweaveUploadsParams): Promise<ArweaveUploadsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (period) params.set("period", period);
  if (artist) params.set("artist", artist);

  const res = await fetch(`${IN_PROCESS_API}/uploads?${params.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch arweave uploads");
  return res.json();
}
