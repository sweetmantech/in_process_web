import { getArweaveUploads } from "@/lib/admin/getArweaveUploads";
import formatUsdcAmount from "@/lib/formatUsdcAmount";
import type {
  ArtistArweaveTransaction,
  ArweaveUpload,
  ArweaveUploadsSortBy,
} from "@/types/arweave";
import { AnalyticsPeriod } from "@/types/timeline";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface UseArweaveUploadsParams {
  aggregation: boolean;
}

export function useArweaveUploads({ aggregation }: UseArweaveUploadsParams) {
  const limit = 10;
  const defaultSort = useMemo<SortingState>(
    () =>
      aggregation
        ? [{ id: "usdc_cost", desc: true }]
        : [{ id: "created_at", desc: true }],
    [aggregation]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState<AnalyticsPeriod | undefined>(undefined);
  const [artist, setArtist] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>(defaultSort);
  const activeSort = sorting[0] ?? defaultSort[0];
  const sortBy = activeSort.id as ArweaveUploadsSortBy;
  const sortOrder: "asc" | "desc" = activeSort.desc ? "desc" : "asc";

  useEffect(() => {
    setCurrentPage(1);
  }, [artist, period]);

  const applyPeriod = useCallback((next: AnalyticsPeriod | undefined) => {
    setPeriod(next);
    setCurrentPage(1);
  }, []);

  const onSortingChange: OnChangeFn<SortingState> = useCallback((updater) => {
    setSorting((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next.length === 0 ? defaultSort : next;
    });
    setCurrentPage(1);
  }, [defaultSort]);

  const query = useQuery({
    queryKey: aggregation
      ? ["arweave-uploads", artist, period, sortBy, sortOrder, currentPage]
      : ["artist-arweave-uploads", artist, currentPage, period, sortBy, sortOrder],
    queryFn: () =>
      getArweaveUploads({
        page: currentPage,
        limit,
        artist,
        period,
        sortBy,
        sortOrder,
        aggregation,
      }),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    placeholderData: keepPreviousData,
  });

  const uploads = useMemo((): ArweaveUpload[] => {
    const data = query.data;
    if (!data?.uploads?.length) return [];
    const first = data.uploads[0];
    if (
      first &&
      typeof first === "object" &&
      "artist_address" in first &&
      !("arweave_uri" in first)
    ) {
      return data.uploads as ArweaveUpload[];
    }
    return [];
  }, [aggregation, query.data]);

  const transactions = useMemo((): ArtistArweaveTransaction[] => {
    if (aggregation || !query.data?.uploads?.length) return [];
    const first = query.data.uploads[0];
    if (first && typeof first === "object" && "arweave_uri" in first) {
      return query.data.uploads as ArtistArweaveTransaction[];
    }
    return [];
  }, [aggregation, query.data]);

  const totalUsdcLabel = useMemo(() => {
    if (aggregation || query.data === undefined) return null;
    if ("total_usdc_cost" in query.data) {
      return formatUsdcAmount(query.data.total_usdc_cost);
    }
    return null;
  }, [aggregation, query.data]);

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
    transactions,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    goPrevPage,
    goNextPage,
    limit,
    period,
    applyPeriod,
    artist,
    setArtist,
    sorting,
    onSortingChange,
    totalUsdcLabel,
  };
}
