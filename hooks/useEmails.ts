import { useInfiniteQuery } from "@tanstack/react-query";
import { usePrivy } from "@privy-io/react-auth";
import { fetchEmails } from "@/lib/admin/fetchEmails";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const LIMIT = 20;

export function useEmails() {
  const { getAccessToken } = usePrivy();
  const { primaryWallet } = useWalletsProvider();

  return useInfiniteQuery({
    queryKey: ["admin-emails"],
    queryFn: async ({ pageParam }) => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token");
      return fetchEmails(accessToken, pageParam, LIMIT);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
    enabled: Boolean(primaryWallet),
    staleTime: 1000 * 60 * 5,
  });
}
