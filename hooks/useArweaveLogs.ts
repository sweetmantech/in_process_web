import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { getArweaveLogs } from "@/lib/admin/getArweaveLogs";

interface UseArweaveLogsParams {
  initialPage?: number;
  limit?: number;
  period?: "day" | "week" | "month" | "all";
  artist?: string;
}

export function useArweaveLogs({
  initialPage = 1,
  limit = 10,
  period,
  artist,
}: UseArweaveLogsParams = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { artistWallet, getAuthHeaders } = useUserProvider();

  const query = useQuery({
    queryKey: ["admin-arweave-logs", currentPage, limit, period, artist],
    queryFn: async () => {
      const authHeaders = await getAuthHeaders();
      return getArweaveLogs({ authHeaders, page: currentPage, limit, period, artist });
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
