import { getArweaveUploads } from "@/lib/admin/getArweaveUploads";
import formatUsdcAmount from "@/lib/formatUsdcAmount";
import type {
  ArtistArweaveTransaction,
  ArweaveUpload,
  ArweaveUploadsSortBy,
} from "@/types/arweave";
import { AnalyticsPeriod } from "@/types/timeline";
import { useUserProvider } from "@/providers/UserProvider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_SORT: SortingState = [{ id: "usdc_cost", desc: true }];

export interface UseArweaveUploadsParams {
  initialPage?: number;
  limit?: number;
  /**
   * When set, loads per-upload rows for this artist (expanded sub-table).
   * Use `detailPeriod` for the same window as the parent table.
   */
  detailArtist?: string;
  detailPeriod?: AnalyticsPeriod | undefined;
}

export function useArweaveUploads({
  initialPage = 1,
  limit = 10,
  detailArtist,
  detailPeriod,
}: UseArweaveUploadsParams = {}) {
  const isDetail = Boolean(detailArtist?.length);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [period, setPeriod] = useState<AnalyticsPeriod | undefined>(undefined);
  const [artistDraft, setArtistDraft] = useState("");
  const [appliedArtist, setAppliedArtist] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORT);
  const { artistWallet, getAuthHeaders } = useUserProvider();

  const activeSort = sorting[0] ?? DEFAULT_SORT[0];
  const sortBy = activeSort.id as ArweaveUploadsSortBy;
  const sortOrder: "asc" | "desc" = activeSort.desc ? "desc" : "asc";

  const effectivePeriod = isDetail ? detailPeriod : period;

  useEffect(() => {
    if (!isDetail) return;
    setCurrentPage(1);
  }, [detailArtist, detailPeriod, isDetail]);

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
    queryKey: isDetail
      ? ["admin-arweave-uploads", "detail", detailArtist, detailPeriod, limit, currentPage]
      : ["admin-arweave-uploads", currentPage, limit, period, appliedArtist, sortBy, sortOrder],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      if (isDetail) {
        return getArweaveUploads({
          authHeaders,
          page: currentPage,
          limit,
          period: effectivePeriod,
          sortBy: "usdc_cost",
          sortOrder: "desc",
          artist: detailArtist!,
        });
      }
      const common = {
        authHeaders,
        page: currentPage,
        limit,
        period: effectivePeriod,
        sortBy,
        sortOrder,
      };
      if (appliedArtist !== undefined) {
        return getArweaveUploads({ ...common, artist: appliedArtist });
      }
      return getArweaveUploads(common);
    },
    enabled: Boolean(artistWallet && (!isDetail || detailArtist)),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    placeholderData: keepPreviousData,
  });

  const uploads = useMemo((): ArweaveUpload[] => {
    if (isDetail) return [];
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
  }, [isDetail, query.data]);

  const transactions = useMemo((): ArtistArweaveTransaction[] => {
    if (!isDetail || !query.data?.uploads?.length) return [];
    const first = query.data.uploads[0];
    if (first && typeof first === "object" && "arweave_uri" in first) {
      return query.data.uploads as ArtistArweaveTransaction[];
    }
    return [];
  }, [isDetail, query.data]);

  const totalUsdcLabel = useMemo(() => {
    if (isDetail || query.data === undefined) return null;
    if ("total_usdc_cost" in query.data) {
      return formatUsdcAmount(query.data.total_usdc_cost);
    }
    return null;
  }, [isDetail, query.data]);

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
    artistDraft,
    setArtistDraft,
    commitArtist,
    sorting,
    onSortingChange,
    totalUsdcLabel,
  };
}
