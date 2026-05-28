import { IN_PROCESS_API } from "@/lib/consts";
import { ArtistWallet } from "@/types/artist";

const getArtistWallets = async (artistId: string): Promise<ArtistWallet[]> => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/artists/wallets?artistId=${artistId}`);
    if (!response.ok) return [];

    const data = (await response.json()) as { wallets?: ArtistWallet[] };
    return data.wallets ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getArtistWallets;
