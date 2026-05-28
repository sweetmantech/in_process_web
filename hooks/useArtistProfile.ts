import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useArtistProfile(address?: Address) {
  return useQuery({
    queryKey: ["artist_profile", address],
    queryFn: () => getArtistProfile(address as Address),
    staleTime: 0,
    enabled: Boolean(address),
    refetchOnMount: true,
  });
}
