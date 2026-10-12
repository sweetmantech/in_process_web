import { useUserProvider } from "@/providers/UserProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { AdminGroup } from "@/types/admins";

const useIsOwnAdminGroup = (group: AdminGroup): boolean => {
  const { userId } = useUserProvider();
  const { primaryWallet } = useWalletsProvider();
  const { smartWallet } = useSmartAccountProvider();

  if (userId && group.artistId === userId) return true;

  const ownAddresses = [primaryWallet, smartWallet]
    .filter(Boolean)
    .map((address) => (address as string).toLowerCase());
  return group.addresses.some((address) => ownAddresses.includes(address.toLowerCase()));
};

export default useIsOwnAdminGroup;
