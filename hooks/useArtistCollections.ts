import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/lib/collections/fetchCollections";

export const useArtistCollections = (artist: string | undefined) =>
  useQuery({
    queryKey: ["collections", artist],
    queryFn: () => fetchCollections(1, 100, artist),
    enabled: Boolean(artist),
    staleTime: 60_000,
  });
