import { getArtistArweaveUploads } from "@/lib/admin/getArtistArweaveUploads";
import { useUserProvider } from "@/providers/UserProvider";
import { AnalyticsPeriod } from "@/types/timeline";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseArtistArweaveTransactionsParams {
  artist: string;
  period: AnalyticsPeriod | undefined;
  limit?: number;
}

export function useArtistArweaveTransactions({
  artist,
  period,
  limit = 20,
}: UseArtistArweaveTransactionsParams) {
  const { artistWallet, getAuthHeaders } = useUserProvider();

  const query = useQuery({
    queryKey: ["admin-arweave-uploads-artist", artist, period, limit],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      return getArtistArweaveUploads({
        authHeaders,
        artist,
        period,
        limit,
      });
    },
    enabled: Boolean(artistWallet && artist),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  const transactions = useMemo(() => query.data?.uploads ?? [], [query.data?.uploads]);

  return {
    ...query,
    transactions,
  };
}
