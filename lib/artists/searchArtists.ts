import { IN_PROCESS_API } from "@/lib/consts";

export type SearchedArtist = {
  address: string;
  username: string | null;
};

export type SearchArtistsResponse = {
  artists: SearchedArtist[];
};

const searchArtists = async (query: string, limit = 10): Promise<SearchArtistsResponse> => {
  if (!query) return { artists: [] };
  try {
    const url = `${IN_PROCESS_API}/artists/search?query=${encodeURIComponent(query)}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) return { artists: [] };
    return res.json();
  } catch (error) {
    console.error("Error searching artists:", error);
    return { artists: [] };
  }
};

export default searchArtists;
