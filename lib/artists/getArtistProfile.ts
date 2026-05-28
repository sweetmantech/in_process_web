import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";
import { ArtistProfile } from "@/types/artist";

export const getArtistProfile = async (artistAddress: Address): Promise<ArtistProfile | null> => {
  const response = await fetch(`${IN_PROCESS_API}/profile?address=${artistAddress}`);
  if (!response.ok) {
    throw new Error("Failed to fetch artist profile");
  }

  return response.json();
};
