import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { getActiveArtists } from "@/lib/admin/getActiveArtists";
import { AnalyticsPeriod } from "@/types/timeline";

interface UseActiveArtistsParams {
  initialPage?: number;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
}

export function useActiveArtists({
  initialPage = 1,
  limit = 10,
  period,
  artist,
}: UseActiveArtistsParams = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { artistWallet, getAuthHeaders } = useUserProvider();

  const query = useQuery({
    queryKey: ["admin-active-artists", currentPage, limit, period, artist],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      return getActiveArtists({ authHeaders, page: currentPage, limit, period, artist });
    },
    enabled: Boolean(artistWallet),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    currentPage,
    setCurrentPage,
  };
}
