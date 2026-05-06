import { IN_PROCESS_API } from "@/lib/consts";
import { ArweaveLogsResponse } from "@/types/arweave";

interface GetArweaveLogsParams {
  authHeaders: HeadersInit;
  page?: number;
  limit?: number;
}

export async function getArweaveLogs({
  authHeaders,
  page = 1,
  limit = 10,
}: GetArweaveLogsParams): Promise<ArweaveLogsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`${IN_PROCESS_API}/arweave/logs?${params.toString()}`, {
    headers: authHeaders,
  });

  if (!res.ok) throw new Error("Failed to fetch arweave logs");
  return res.json();
}
