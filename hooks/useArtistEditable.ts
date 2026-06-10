import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useParams } from "next/navigation";

const useArtistEditable = () => {
  const { primaryWallet } = useWalletsProvider();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  const isEditable = address?.toLowerCase() === primaryWallet?.toLowerCase() && Boolean(address);

  return {
    isEditable,
  };
};

export default useArtistEditable;
