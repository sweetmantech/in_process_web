import { getAddress } from "viem";
import { useMemo } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const useIsCollectionOwner = () => {
  const { data: collection } = useCollectionProvider();
  const { primaryWallet } = useWalletsProvider();

  const isOwner = useMemo(() => {
    if (!collection || !primaryWallet) return false;
    const defaultAdminAddress = collection.creator?.address;
    if (!defaultAdminAddress) return false;
    return getAddress(primaryWallet) === getAddress(defaultAdminAddress);
  }, [collection, primaryWallet]);

  return isOwner;
};

export default useIsCollectionOwner;
