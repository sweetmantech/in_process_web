import { IN_PROCESS_API } from "@/lib/consts";
import { ArweaveLogsResponse } from "@/types/arweave";

interface GetArweaveLogsParams {
  authHeaders: HeadersInit;
  page?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  artist?: string;
}

export async function getArweaveLogs({
  authHeaders,
  page = 1,
  limit = 10,
  period,
  artist,
}: GetArweaveLogsParams): Promise<ArweaveLogsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (period) params.set("period", period);
  if (artist) params.set("artist", artist);

  const res = await fetch(`${IN_PROCESS_API}/uploads?${params.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch arweave logs");
  return res.json();
}
