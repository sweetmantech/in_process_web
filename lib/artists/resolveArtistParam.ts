import { cache } from "react";
import { Address } from "viem";
import { ADDRESS_REGEX, HANDLE_REGEX } from "@/lib/consts";
import getArtistByHandle from "@/lib/artists/getArtistByHandle";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import safeDecodeURIComponent from "@/lib/utils/safeDecodeURIComponent";
import { ResolvedArtistParam } from "@/types/artist";

const resolveArtistParam = cache(async (param: string): Promise<ResolvedArtistParam | null> => {
  const value = safeDecodeURIComponent(param)?.trim();
  if (!value) return null;

  if (ADDRESS_REGEX.test(value)) {
    return { address: value.toLowerCase() as Address, handle: null };
  }

  const handle = value.toLowerCase();
  if (!HANDLE_REGEX.test(handle) || handle.startsWith("0x")) return null;

  const artist = await getArtistByHandle(handle);
  const address = getPrimaryWalletAddress(artist?.wallets);
  if (!address) return null;

  return { address: address.toLowerCase() as Address, handle };
});

export default resolveArtistParam;
