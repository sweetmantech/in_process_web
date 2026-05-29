import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import getArtistWallets from "@/lib/wallets/getArtistWallets";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";

const useWallets = () => {
  const { userId, userReady, signedAddress } = useUserProvider();
  const { isMiniApp } = useMiniAppProvider();

  const {
    data: wallets = [],
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["artist_wallets", userId],
    queryFn: () => getArtistWallets(userId as string),
    enabled: Boolean(userId) && userReady,
    staleTime: 0,
  });

  const walletsReady = userReady && (!userId || isSuccess);

  const { primaryWallet, hasEOA } = useMemo(() => {
    const eoa = wallets.find((w) => w.type === "external");
    return {
      hasEOA: Boolean(eoa),
      primaryWallet: (isMiniApp
        ? signedAddress
        : (eoa?.address ?? signedAddress)) as typeof signedAddress,
    };
  }, [wallets, signedAddress, isMiniApp]);

  return {
    wallets,
    walletsReady,
    primaryWallet,
    hasEOA,
    refetchWallets: refetch,
  };
};

export default useWallets;
