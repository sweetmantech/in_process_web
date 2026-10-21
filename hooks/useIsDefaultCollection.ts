import { useDefaultCollection } from "@/hooks/useDefaultCollection";
import { useWalletsProvider } from "@/providers/WalletsProvider";

export function useIsDefaultCollection(address: string | undefined) {
  const { primaryWallet } = useWalletsProvider();
  const { data: defaultCollection } = useDefaultCollection(primaryWallet);

  return Boolean(address && defaultCollection?.address.toLowerCase() === address.toLowerCase());
}
