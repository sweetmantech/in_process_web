import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { artistProfileKey } from "@/lib/react-query/queryKeys";
import { PROFILE_READ_STALE_MS } from "@/lib/react-query/staleTimes";

export function useArtistProfile(address?: Address) {
  return useQuery({
    queryKey: artistProfileKey(address),
    queryFn: () => getArtistProfile(address as Address),
    staleTime: PROFILE_READ_STALE_MS,
    enabled: Boolean(address),
  });
}
