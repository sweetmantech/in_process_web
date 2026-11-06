import { IN_PROCESS_API } from "@/lib/consts";
import { ArtistByHandle } from "@/types/artist";

const getArtistByHandle = async (handle: string): Promise<ArtistByHandle | null> => {
  const response = await fetch(
    `${IN_PROCESS_API}/artists/search?handle=${encodeURIComponent(handle)}`
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch artist by handle");

  const { artist } = await response.json();
  return artist ?? null;
};

export default getArtistByHandle;
