import { Address } from "viem";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const useArtistEditable = (artistAddress: Address | undefined) => {
  const { primaryWallet } = useWalletsProvider();
  const address = artistAddress?.toLowerCase() || "";

  const isEditable = Boolean(address) && address === primaryWallet?.toLowerCase();

  return {
    isEditable,
  };
};

export default useArtistEditable;
