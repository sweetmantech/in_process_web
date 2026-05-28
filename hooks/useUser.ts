import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useConnection, useConnect } from "wagmi";
import { config } from "@/providers/WagmiProvider";
import useProfile from "./useProfile";
import { Address } from "viem";

const useUser = () => {
  const { login } = usePrivy();
  const { privyWallet, isPrivyReady } = useConnectedWallet();
  const { isMiniApp } = useMiniAppProvider();
  const { isConnected, address: farcasterAddress } = useConnection();
  const { mutate: connect } = useConnect();

  const signedAddress = (isMiniApp ? farcasterAddress : privyWallet?.address) as
    | Address
    | undefined;

  const authReady = isMiniApp ? Boolean(farcasterAddress) : isPrivyReady;

  const profile = useProfile(signedAddress);
  const userReady = authReady && !profile.isLoading;
  const isPrepared = () => {
    if (isMiniApp) {
      if (!isConnected) connect({ connector: config.connectors[0] });
      return isConnected;
    }
    if (!privyWallet) {
      login();
      return false;
    }
    return true;
  };

  return {
    ...profile,
    isPrepared,
    signedAddress,
    userReady,
    refetchUser: profile.refetch,
  };
};

export default useUser;
