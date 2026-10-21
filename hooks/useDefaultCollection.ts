import { useQuery } from "@tanstack/react-query";
import { createDefaultCollection } from "@/lib/collections/createDefaultCollection";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";

export function useDefaultCollection(artist: string | undefined) {
  const { getAuthHeaders } = useAuthorizationProvider();

  return useQuery({
    queryKey: ["default-collection", artist],
    queryFn: async () => createDefaultCollection(await getAuthHeaders()),
    enabled: Boolean(artist),
    staleTime: 60_000,
    retry: 1,
  });
}
