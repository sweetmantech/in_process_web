import { Artist } from "@/types/artist";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";

export const getArtistAddress = (artist: Artist): string | undefined =>
  getPrimaryWalletAddress(artist.wallets);
