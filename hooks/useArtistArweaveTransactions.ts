import { getArtistArweaveUploads } from "@/lib/admin/getArtistArweaveUploads";
import { useUserProvider } from "@/providers/UserProvider";
import { AnalyticsPeriod } from "@/types/timeline";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseArtistArweaveTransactionsParams {
  artist: string;
  period: AnalyticsPeriod | undefined;
  limit?: number;
}

export function useArtistArweaveTransactions({
  artist,
  period,
  limit = 10,
}: UseArtistArweaveTransactionsParams) {
  const [currentPage, setCurrentPage] = useState(1);
  const { artistWallet, getAuthHeaders } = useUserProvider();

  useEffect(() => {
    setCurrentPage(1);
  }, [artist, period]);

  const query = useQuery({
    queryKey: ["admin-arweave-uploads-artist", artist, period, limit, currentPage],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      return getArtistArweaveUploads({
        authHeaders,
        artist,
        period,
        limit,
        page: currentPage,
      });
    },
    enabled: Boolean(artistWallet && artist),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    placeholderData: keepPreviousData,
  });

  const transactions = useMemo(() => query.data?.uploads ?? [], [query.data?.uploads]);

  const totalPages = Math.max(1, Math.ceil((query.data?.count ?? 0) / limit));
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const goPrevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const goNextPage = useCallback(() => {
    setCurrentPage((p) => p + 1);
  }, []);

  return {
    ...query,
    transactions,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    limit,
  };
}
