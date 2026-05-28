import { useUserProvider } from "@/providers/UserProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useParams } from "next/navigation";

const useArtistEditable = () => {
  const { signedAddress } = useUserProvider();
  const { primaryWallet } = useWalletsProvider();
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() || "";

  const isEditable = address?.toLowerCase() === primaryWallet?.toLowerCase() || Boolean(address);

  return {
    isEditable,
  };
};

export default useArtistEditable;
