import { getArweaveUploads } from "@/lib/admin/getArweaveUploads";
import formatUsdcAmount from "@/lib/formatUsdcAmount";
import { ArweaveUploadsSortBy } from "@/types/arweave";
import { AnalyticsPeriod } from "@/types/timeline";
import { useUserProvider } from "@/providers/UserProvider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

const DEFAULT_SORT: SortingState = [{ id: "created_at", desc: true }];

interface UseArweaveUploadsParams {
  initialPage?: number;
  limit?: number;
}

export function useArweaveUploads({ initialPage = 1, limit = 10 }: UseArweaveUploadsParams = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [period, setPeriod] = useState<AnalyticsPeriod | undefined>(undefined);
  const [artistDraft, setArtistDraft] = useState("");
  const [appliedArtist, setAppliedArtist] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORT);
  const { artistWallet, getAuthHeaders } = useUserProvider();

  const activeSort = sorting[0] ?? DEFAULT_SORT[0];
  const sortBy = activeSort.id as ArweaveUploadsSortBy;
  const sortOrder = activeSort.desc ? "desc" : "asc";

  const applyPeriod = useCallback((next: AnalyticsPeriod | undefined) => {
    setPeriod(next);
    setCurrentPage(1);
  }, []);

  const commitArtist = useCallback(() => {
    setAppliedArtist(artistDraft || undefined);
    setCurrentPage(1);
  }, [artistDraft]);

  const onSortingChange: OnChangeFn<SortingState> = useCallback((updater) => {
    setSorting((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next.length === 0 ? DEFAULT_SORT : next;
    });
    setCurrentPage(1);
  }, []);

  const query = useQuery({
    queryKey: [
      "admin-arweave-uploads",
      currentPage,
      limit,
      period,
      appliedArtist,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      return getArweaveUploads({
        authHeaders,
        page: currentPage,
        limit,
        period,
        artist: appliedArtist,
        sortBy,
        sortOrder,
      });
    },
    enabled: Boolean(artistWallet),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    placeholderData: keepPreviousData,
  });

  const uploads = useMemo(() => query.data?.uploads ?? [], [query.data?.uploads]);

  const totalUsdcLabel = useMemo(
    () =>
      query.data !== undefined
        ? formatUsdcAmount(query.data.total_usdc_cost)
        : null,
    [query.data]
  );

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
    uploads,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    limit,
    period,
    applyPeriod,
    artistDraft,
    setArtistDraft,
    commitArtist,
    sorting,
    onSortingChange,
    totalUsdcLabel,
  };
}
